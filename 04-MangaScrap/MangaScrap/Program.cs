using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Xml;
using HtmlAgilityPack;
using DataAccess.DataContext;
using DataAccess.Entity;
using System.Collections.Generic;
using MangaScrap.ScrapingModel;
using MangaScrap.ScrapParams;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;

namespace MangaScrap
{
    class Program
    {

        static void Main(string[] args)
        {
            Console.WriteLine("Welcome To Manga Scraping :");
            foreach (var item in Params.MangaUrls)
            {
                Console.WriteLine(item);
                var manga = ScrapingManga(item);
                SaveOrUpdateDataBase(manga, Params.RootPath);

            }
            //RetryGetPendingPages(Params.RootPath);
            Console.ReadKey();     
        }
        static void SaveOrUpdateDataBase(MangaScrapModel manga,string rootPath)
        {
            string connectionString = "Data Source="+rootPath+"/Manga/ManagDb.db";
            using (var dbContext = new MangaDataContext(connectionString))
            {
                if (manga != null)
                {
                    Manga mangaEnt = new Manga();
                    mangaEnt.Name = manga.Title.Replace("manga", "").Trim();
                    mangaEnt.Resume = manga.Resume;
                    mangaEnt.State = manga.State;
                    mangaEnt.Date = manga.DateEdition;
                    mangaEnt.CoverExteranlUrl = manga.CoverUrl;
                    mangaEnt.CoverInternalUrl = ImageHelper.SavaInternal(manga.CoverUrl, rootPath, "Manga/" + mangaEnt.Name.Replace(" ","_"), "cover");
                    mangaEnt.Tags = string.Join(" ", manga.Tags.ToArray());
                    mangaEnt.Chapter = new List<Chapter>();
                    foreach (var chapter in manga.Chapters)
                    {
                        var chapterEnt = new Chapter()
                        {
                            Title = chapter.Title,
                            Url = chapter.Url,
                            Number = manga.Chapters.IndexOf(chapter) + 1,
                        };
                        chapterEnt.Pages = new List<Page>();
                        foreach (var page in chapter.Pages)
                        {
                            var internalUrl = ImageHelper.SavaInternal(page.Url, rootPath, "Manga/" + mangaEnt.Name.Replace(" ", "_") + "/chapter" + chapter.Number, page.Number.ToString());
                            chapterEnt.Pages.Add(new Page()
                            {
                                Number = page.Number,
                                ExternalUrl = page.Url,
                                InternalUrl = "Manga/" + mangaEnt.Name.Replace(" ", "_") + "/chapter" + chapter.Number+"/"+ page.Number.ToString(),
                                Pending=string.IsNullOrEmpty(internalUrl)
                            });
                            Console.WriteLine();
                        }
                        mangaEnt.Chapter.Add(chapterEnt);
                    }
                    dbContext.Mangas.Add(mangaEnt);
                    dbContext.SaveChanges();

                }
            }
        }
        static MangaScrapModel ScrapingManga(string url)
        {
            MangaScrapModel manga=new MangaScrapModel();
            HtmlWeb htmlWeb=new HtmlWeb();
            HtmlDocument htmlDocument= htmlWeb.Load(url);
            // Manga Details
            var htmlExtract1=htmlDocument.DocumentNode.SelectSingleNode("//img[@class='manga-cover']").Attributes;
            foreach (var item in htmlExtract1)
            {
                if(item.Name=="alt")
                    manga.Title=item.Value;
                if(item.Name=="src")
                {
                    manga.CoverUrl=item.Value;
                }
            } 
            Console.WriteLine("get cover (picture and title) done");   
            var htmlNode=htmlDocument.DocumentNode.SelectSingleNode("//div[@class='manga-details-extended']");
            var detailNode=htmlNode.SelectNodes("//h4");
            manga.DateEdition=detailNode[0].InnerHtml;
            manga.State=detailNode[1].InnerHtml;
            manga.Resume=detailNode[2].InnerHtml;
            var texts=htmlNode.SelectNodes("//ul").First().InnerText.Split('\n');
            manga.Tags=new List<string>();
            foreach (var item in texts)
            {
                if(!string.IsNullOrEmpty(item) && !manga.Tags.Contains(item.Trim()))
                    manga.Tags.Add(item.Trim());
            }
            Console.WriteLine("get (date edition, state, resume, tags) done");
            manga.Chapters=new List<ChapterScrapModel>();
            var htmlExtract=htmlDocument.DocumentNode.SelectNodes("//a[@class='chapter']");
            int chNb=1;
            foreach (var item in htmlExtract)
            {
                Console.WriteLine("get chapter number "+chNb+" Start");
                ChapterScrapModel chapter=new ChapterScrapModel();
                chapter.Number=chNb;
                
                string urlch="";
                var urlPart=item.Attributes["href"].Value.Split('/');
                for (int i = 0; i < urlPart.Length-2; i++)
                {
                    urlch+=urlPart[i]+'/';
                }
                urlch+="0/full";
                chapter.Url=urlch;
                chapter.Pages=GetPages(urlch);
                chapter.Title=item.InnerHtml;
                manga.Chapters.Add(chapter);
                Console.WriteLine("get chapter number "+chNb+" done");
                chNb++;
            }
            manga.Chapters.Reverse();
            return manga;
        }
        static List<PageScrapModel> GetPages(string url)
        {
            List<PageScrapModel> pages=new List<PageScrapModel>();
            HtmlWeb htmlWeb=new HtmlWeb();
            HtmlDocument htmlDocument= htmlWeb.Load(url);
            var pagesNode=htmlDocument.DocumentNode.SelectNodes("//img");
            int pageNb=1;
            foreach (var item in pagesNode)
            {
                if(item.Attributes["alt"].Value != "hiddenmangaimage")
                {
                    var page=new PageScrapModel();
                    page.Number=pageNb; 
                    page.Url=item.Attributes["src"].Value;
                    pages.Add(page);
                    Console.WriteLine("get page number "+pageNb+" done");
                    pageNb++;
                }  
            }
            return pages;
        }

        static void RetryGetPendingPages(string rootPath)
        {
            string connectionString = "Data Source=" + rootPath + "/Manga/ManagDb.db";
            using (var db=new MangaDataContext(connectionString))
            {
                var pendingPages = db.Pages.Where(p => p.Pending).ToList();
                foreach (var page in pendingPages)
                {
                    page.Pending = string.IsNullOrEmpty(ImageHelper.SavaInternal(page.ExternalUrl, rootPath, page.InternalUrl,""));
                    if(!page.Pending)
                    {
                        Console.WriteLine("Done :" + page.Number);
                    }
                }
                db.SaveChanges();
            }
        }
    }
}
