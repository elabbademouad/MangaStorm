using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Xml;
using HtmlAgilityPack;
using System.Collections.Generic;
using MangaScrap.ScrapingModel;
using MangaScrap.ScrapParams;
using System.Diagnostics;
using System.Threading;
using entity = Application.Entities;
using repos = Infrastructure.Repositories;

namespace MangaScrap
{
    class Program
    {

        static void Main(string[] args)
        {
            Console.WriteLine("Welcome To Manga Scraping :");
            //foreach (var item in Params.MangaUrls)
            //{
            //    Console.WriteLine(item);
            //    var manga = ScrapingManga(item);
            //    CreateOrUpdateDataBase(manga, Params.RootPath);
            //}
            //RetryGetPendingPages(Params.RootPath);
            Console.ReadKey();
        }
        //static void CreateOrUpdateDataBase(MangaScrapModel manga, string rootPath)
        //{
        //    var create = true;
        //    using (var dbContext = new MangaDataContext(Params.ConnectionString))
        //    {
        //        create = dbContext.Mangas.FirstOrDefault(m => m.Name == manga.Title) == null;
        //    }
        //    if (create)
        //    {
        //        CreateMangaDb(manga, Params.RootPath);
        //    }
        //    else
        //    {
        //        UpdateMangaDb(manga, Params.RootPath);
        //    }
        //}
        //static MangaScrapModel ScrapingManga(string url)
        //{
        //    MangaScrapModel manga = new MangaScrapModel();
        //    HtmlWeb htmlWeb = new HtmlWeb();
        //    HtmlDocument htmlDocument = htmlWeb.Load(url);
        //    // Manga Details
        //    var htmlExtract1 = htmlDocument.DocumentNode.SelectSingleNode("//img[@class='manga-cover']").Attributes;
        //    foreach (var item in htmlExtract1)
        //    {
        //        if (item.Name == "alt")
        //            manga.Title = item.Value.Replace("manga", "").Trim();
        //        if (item.Name == "src")
        //        {
        //            manga.CoverUrl = item.Value;
        //        }
        //    }
        //    Console.WriteLine("get cover (picture and title) done");
        //    var htmlNode = htmlDocument.DocumentNode.SelectSingleNode("//div[@class='manga-details-extended']");
        //    var detailNode = htmlNode.SelectNodes("//h4");
        //    manga.DateEdition = detailNode[0].InnerHtml;
        //    manga.State = detailNode[1].InnerHtml;
        //    manga.Resume = detailNode[2].InnerHtml;
        //    var texts = htmlNode.SelectNodes("//ul").First().InnerText.Split('\n');
        //    manga.Tags = new List<string>();
        //    foreach (var item in texts)
        //    {
        //        if (!string.IsNullOrEmpty(item) && !manga.Tags.Contains(item.Trim()))
        //            manga.Tags.Add(item.Trim());
        //    }
        //    Console.WriteLine("get (date edition, state, resume, tags) done");
        //    manga.Chapters = new List<ChapterScrapModel>();
        //    var htmlExtract = htmlDocument.DocumentNode.SelectNodes("//a[@class='chapter']");
        //    int chNb = htmlExtract.Count;
        //    foreach (var item in htmlExtract)
        //    {
        //        ChapterScrapModel chapter = new ChapterScrapModel();
        //        chapter.Number = chNb;
        //        string urlch = "";
        //        var urlPart = item.Attributes["href"].Value.Split('/');
        //        for (int i = 0; i < urlPart.Length - 2; i++)
        //        {
        //            urlch += urlPart[i] + '/';
        //        }
        //        urlch += "0/full";
        //        chapter.Url = urlch;
        //        chapter.Pages = GetPages(urlch);
        //        chapter.Title = item.InnerHtml;
        //        manga.Chapters.Add(chapter);
        //        Console.WriteLine("chapter number " + chNb + " done");
        //        chNb--;
        //    }
        //    manga.Chapters.Reverse();
        //    return manga;
        //}
        //static List<PageScrapModel> GetPages(string url)
        //{
        //    List<PageScrapModel> pages = new List<PageScrapModel>();
        //    HtmlWeb htmlWeb = new HtmlWeb();
        //    HtmlDocument htmlDocument = htmlWeb.Load(url);
        //    var pagesNode = htmlDocument.DocumentNode.SelectNodes("//img");
        //    int pageNb = 1;
        //    foreach (var item in pagesNode)
        //    {
        //        if (item.Attributes["alt"].Value != "hiddenmangaimage")
        //        {
        //            var page = new PageScrapModel();
        //            page.Number = pageNb;
        //            page.Url = item.Attributes["src"].Value;
        //            pages.Add(page);
        //            Console.WriteLine("get page number " + pageNb + " done");
        //            pageNb++;
        //        }
        //    }
        //    return pages;
        //}
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
        //static void CreateMangaDb(MangaScrapModel manga, string rootPath)
        //{
        //    using (var dbContext = new MangaDataContext(Params.ConnectionString))
        //    {
        //        if (manga != null)
        //        {
        //            Manga mangaEnt = new Manga();
        //            mangaEnt.Name = manga.Title;
        //            mangaEnt.Resume = manga.Resume;
        //            mangaEnt.State = manga.State;
        //            mangaEnt.Date = manga.DateEdition;
        //            mangaEnt.CoverExteranlUrl = manga.CoverUrl;
        //            mangaEnt.CoverInternalUrl = ImageHelper.SavaInternal(manga.CoverUrl, rootPath, "Manga/" + mangaEnt.Name.Replace(" ", "_"), "cover." + manga.CoverUrl.Split(".").Last());
        //            mangaEnt.Tags = string.Join(",", manga.Tags.ToArray());
        //            mangaEnt.Chapters = new List<Chapter>();
        //            mangaEnt.Matricule = Guid.NewGuid().ToString();
        //            foreach (var tag in manga.Tags)
        //            {
        //                if (dbContext.Tags.FirstOrDefault(t => t.Label == tag.Trim()) == null)
        //                {
        //                    dbContext.Tags.Add(new Tag() { Label = tag.Trim() });
        //                }
        //            }
        //            foreach (var chapter in manga.Chapters)
        //            {
        //                var chapterEnt = new Chapter()
        //                {
        //                    Title = chapter.Title,
        //                    Url = chapter.Url,
        //                    Number = chapter.Number,
        //                };
        //                chapterEnt.Pages = new List<Page>();
        //                var process = Process.Start(@"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe", chapter.Url);
        //                var datenow = DateTime.Now;
        //                while (DateTime.Now < datenow.AddSeconds(5))
        //                {

        //                }
        //                foreach (var page in chapter.Pages)
        //                {
        //                    string internalUrl = ImageHelper.SavaInternal(page.Url, rootPath, "Manga/" + mangaEnt.Name.Replace(" ", "_") + "/chapter" + chapter.Number, page.Number.ToString() + "." + page.Url.Split(".").Last());
        //                    if (string.IsNullOrEmpty(internalUrl))
        //                    {
        //                        for (int i = 0; i < 10; i++)
        //                        {
        //                            Console.WriteLine("retry!");
        //                            if (string.IsNullOrEmpty(internalUrl))
        //                            {
        //                                internalUrl = ImageHelper.SavaInternal(page.Url, rootPath, "Manga/" + mangaEnt.Name.Replace(" ", "_") + "/chapter" + chapter.Number, page.Number.ToString() + "." + page.Url.Split(".").Last());
        //                            }
        //                        }
        //                    }
        //                    chapterEnt.Pages.Add(new Page()
        //                    {
        //                        Number = page.Number,
        //                        ExternalUrl = page.Url,
        //                        InternalUrl = "Manga/" + mangaEnt.Name.Replace(" ", "_") + "/chapter" + chapter.Number + "/" + page.Number.ToString() + "." + page.Url.Split(".").Last(),
        //                        Pending = string.IsNullOrEmpty(internalUrl)
        //                    });
        //                    Console.WriteLine();
        //                }
        //                process.Close();
        //                mangaEnt.Chapters.Add(chapterEnt);
        //            }
        //            dbContext.Mangas.Add(mangaEnt);
        //            dbContext.SaveChanges();

        //        }
        //    }
        //}
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
