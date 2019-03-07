﻿using Application.Entities;
using DataScraping.Config;
using DataScraping.Helpers;
using DataScraping.Model;
using HtmlAgilityPack;
using Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
namespace DataScraping
{
    static class Program
    {
        private static Configuration config;
        private static MangaRepository mangaRepository;
        private static ChapterRepository chapterRepository;
        private static PageRepository pageRepository;
        private static TagRepository tagRepository;
        static void Main(string[] args)
        {

            config = new Configuration(args[0]);
            Initialize();
            var manga = ScrapingManga(config["MangaUrl"]);
            CreateOrUpdateDataBase(manga);
            Console.ReadKey();
        }

        static void Initialize()
        {
            Console.WriteLine("Welcome To Manga Scraping :");
            Console.WriteLine(config["MangaUrl"]);
            Console.WriteLine("Press any key to start scraping !");
            Console.ReadKey();
            mangaRepository = new MangaRepository(config);
            chapterRepository = new ChapterRepository(config);
            pageRepository = new PageRepository(config);
            tagRepository = new TagRepository(config);
        }
        static void CreateOrUpdateDataBase(MangaScrapModel manga)
        {
            var created = false;
            created = mangaRepository.Query(m => m.Name == manga.Title).Count != 0;
            if (!created)
            {
                CreateMangaDb(manga, config["MediaPath"]);
            }
            else
            {
                //UpdateMangaDb(manga, config["BaseUrl"]);
            }
        }
        static MangaScrapModel ScrapingManga(string url)
        {
            MangaScrapModel manga = new MangaScrapModel();
            HtmlWeb htmlWeb = new HtmlWeb();
            HtmlDocument htmlDocument = htmlWeb.Load(url);
            // Manga Details
            var htmlExtract1 = htmlDocument.DocumentNode.SelectSingleNode("//img[@class='manga-cover']").Attributes;
            foreach (var item in htmlExtract1)
            {
                if (item.Name == "alt")
                    manga.Title = item.Value.Replace("manga", "").Trim();
                if (item.Name == "src")
                {
                    manga.CoverUrl = item.Value;
                }
            }
            Console.WriteLine("get cover (picture and title) done");
            var htmlNode = htmlDocument.DocumentNode.SelectSingleNode("//div[@class='manga-details-extended']");
            var detailNode = htmlNode.SelectNodes("//h4");
            manga.DateEdition = detailNode[0].InnerHtml;
            manga.State = detailNode[1].InnerHtml;
            manga.Resume = detailNode[2].InnerHtml;
            var texts = htmlNode.SelectNodes("//ul").First().InnerText.Split('\n');
            manga.Tags = new List<string>();
            foreach (var item in texts)
            {
                if (!string.IsNullOrEmpty(item) && !manga.Tags.Contains(item.Trim()))
                    manga.Tags.Add(item.Trim());
            }
            Console.WriteLine("get (date edition, state, resume, tags) done");
            manga.Chapters = new List<ChapterScrapModel>();
            var htmlExtract = htmlDocument.DocumentNode.SelectNodes("//a[@class='chapter']");
            int chNb = htmlExtract.Count;
            foreach (var item in htmlExtract)
            {
                ChapterScrapModel chapter = new ChapterScrapModel();
                chapter.Number = chNb;
                string urlch = "";
                var urlPart = item.Attributes["href"].Value.Split('/');
                for (int i = 0; i < urlPart.Length - 2; i++)
                {
                    urlch += urlPart[i] + '/';
                }
                urlch += "0/full";
                chapter.Url = urlch;
                chapter.Pages = GetPages(urlch);
                chapter.Title = item.InnerHtml;
                manga.Chapters.Add(chapter);
                Console.WriteLine("chapter number " + chNb + " done");
                chNb--;
            }
            manga.Chapters.Reverse();
            return manga;
        }
        static List<PageScrapModel> GetPages(string url)
        {
            List<PageScrapModel> pages = new List<PageScrapModel>();
            HtmlWeb htmlWeb = new HtmlWeb();
            HtmlDocument htmlDocument = htmlWeb.Load(url);
            var pagesNode = htmlDocument.DocumentNode.SelectNodes("//img");
            int pageNb = 1;
            foreach (var item in pagesNode)
            {
                if (item.Attributes["alt"].Value != "hiddenmangaimage")
                {
                    var page = new PageScrapModel();
                    page.Number = pageNb;
                    page.Url = item.Attributes["src"].Value;
                    pages.Add(page);
                    Console.WriteLine("get page number " + pageNb + " done");
                    pageNb++;
                }
            }
            return pages;
        }
        //static void RetryGetPendingPages(string rootPath)
        //{
        //    string connectionString = "Data Source=" + rootPath + "/Manga/ManagDb.db";
        //    using (var db = new MangaDataContext(connectionString))
        //    {
        //        var pendingPages = db.Pages.Where(p => p.Pending).ToList();
        //        foreach (var page in pendingPages)
        //        {
        //            page.Pending = string.IsNullOrEmpty(ImageHelper.SavaInternal(page.ExternalUrl, rootPath, page.InternalUrl, ""));
        //            if (!page.Pending)
        //            {
        //                Console.WriteLine("Done :" + page.Number);
        //            }
        //            else
        //            {
        //                Console.WriteLine("retry!");
        //                var process = Process.Start(db.Chapters.First(c => c.Id == page.ChapterId).Url);
        //                Thread.Sleep(5000);
        //                page.Pending = string.IsNullOrEmpty(ImageHelper.SavaInternal(page.ExternalUrl, rootPath, page.InternalUrl, ""));
        //                if (!page.Pending)
        //                {
        //                    Console.WriteLine("Done after retry :" + page.Number);
        //                    process.Close();
        //                }
        //                process.Close();
        //            }
        //        }
        //        db.SaveChanges();
        //    }
        //}
        static void CreateMangaDb(MangaScrapModel manga, string mediaPath)
        {
            if (manga != null)
            {
                var mangaGuid = Guid.NewGuid();
                Manga mangaDoc = new Manga();
                mangaDoc.Id = mangaGuid;
                mangaDoc.Name = manga.Title;
                mangaDoc.Resume = manga.Resume;
                mangaDoc.State = manga.State;
                mangaDoc.Date = manga.DateEdition;
                mangaDoc.CoverExteranlUrl = manga.CoverUrl;
                mangaDoc.CoverInternalUrl = ImageHelper.SavaPage(manga.CoverUrl, mediaPath, "Manga/" + mangaDoc.Name.Replace(" ", "_"), "cover." + manga.CoverUrl.Split(".").Last(), config);
                mangaDoc.Tags = string.Join(",", manga.Tags.ToArray());
                mangaRepository.Create(mangaDoc);
                foreach (var tag in manga.Tags)
                {
                    if (tagRepository.Query(t => t.Label == tag.Trim()).Count == 0)
                    {
                        var tagGuid = Guid.NewGuid();
                        tagRepository.Create(new Tag() { Id = tagGuid, Label = tag.Trim() });
                    }
                }
                foreach (var chapter in manga.Chapters)
                {
                    var chapterGuid = Guid.NewGuid();
                    var chapterDoc = new Chapter()
                    {
                        Id = chapterGuid,
                        Title = chapter.Title,
                        Url = chapter.Url,
                        Number = chapter.Number,
                        MangaId = mangaGuid,
                    };
                    chapterRepository.Create(chapterDoc);
                    var process = Process.Start(config["BrowserPath"], chapter.Url);
                    foreach (var page in chapter.Pages)
                    {
                        string internalUrl = ImageHelper.SavaPage(page.Url, mediaPath, "Manga/" + mangaDoc.Name.Replace(" ", "_") + "/chapter" + chapter.Number, page.Number.ToString() + "." + page.Url.Split(".").Last(), config);
                        var pageGuid = Guid.NewGuid();
                        var pageDoc = new Page()
                        {
                            Id = pageGuid,
                            Number = page.Number,
                            ExternalUrl = page.Url,
                            InternalUrl = "Manga/" + mangaDoc.Name.Replace(" ", "_") + "/chapter" + chapter.Number + "/" + page.Number.ToString() + "." + page.Url.Split(".").Last(),
                            Pending = string.IsNullOrEmpty(internalUrl),
                            ChapterId = chapterGuid
                        };
                        pageRepository.Create(pageDoc);

                    }
                    process.Close();
                }

            }
        }
        //static void UpdateMangaDb(MangaScrapModel manga, string rootPath)
        //{
        //    using (var dbContext = new MangaDataContext(Params.ConnectionString))
        //    {
        //        if (manga != null)
        //        {
        //            var mangaEnt = dbContext.Mangas.Include(m => m.Chapters).First(m => m.Name == manga.Title);
        //            var diff = manga.Chapters.Count - mangaEnt.Chapters.Count;
        //            if (diff > 0)
        //            {
        //                var newChapters = manga.Chapters.OrderBy(c => c.Number).TakeLast(diff);
        //                foreach (var chapter in newChapters)
        //                {
        //                    var chapterEnt = new Chapter()
        //                    {
        //                        Title = chapter.Title,
        //                        Url = chapter.Url,
        //                        Number = manga.Chapters.IndexOf(chapter) + 1,
        //                    };
        //                    chapterEnt.Pages = new List<Page>();
        //                    foreach (var page in chapter.Pages)
        //                    {
        //                        var internalUrl = ImageHelper.SavaInternal(page.Url, rootPath, "Manga/" + mangaEnt.Name.Replace(" ", "_") + "/chapter" + chapter.Number, page.Number.ToString());
        //                        chapterEnt.Pages.Add(new Page()
        //                        {
        //                            Number = page.Number,
        //                            ExternalUrl = page.Url,
        //                            InternalUrl = "Manga/" + mangaEnt.Name.Replace(" ", "_") + "/chapter" + chapter.Number + "/" + page.Number.ToString() + "." + page.Url.Split(".").Last(),
        //                            Pending = string.IsNullOrEmpty(internalUrl)
        //                        });
        //                        Console.WriteLine();
        //                    }
        //                    mangaEnt.Chapters.Add(chapterEnt);
        //                }
        //                dbContext.SaveChanges();
        //            }

        //        }
        //    }
        //}



    }
}
