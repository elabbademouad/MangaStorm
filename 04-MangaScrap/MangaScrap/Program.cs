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

namespace MangaScrap
{
    class Program
    {

        static void Main(string[] args)
        {
            string connectionString="Data Source=C:/Users/Elabbade Mouad/Documents/VisualStudioProjects/MangaApp/03-DataAccess/DataAccess/ManagDb.db";
            Console.WriteLine("Scraping manga set manga Url :");
            string mangaUrl=Console.ReadLine();
            var manga=ScrapingManga(mangaUrl);
            Console.WriteLine("scraping done");
            using (var dbContext=new MangaDataContext(connectionString))
            {
                if(manga!=null)
                {
                    Manga mangaEnt=new Manga();
                    mangaEnt.Name=manga.Title;
                    mangaEnt.Resume=manga.Resume;
                    mangaEnt.State=manga.State;
                    mangaEnt.Date=manga.DateEdition;
                    mangaEnt.CoverUrl=manga.CoverUrl;
                    mangaEnt.CoverImage=manga.Cover;
                    mangaEnt.CoverType=manga.CoverType;
                    mangaEnt.MangaTags=new List<MangaTag>();
                    dbContext.Mangas.Add(mangaEnt);
                    foreach (var tag in manga.Tags)
                    {
                        if(dbContext.Tags.FirstOrDefault(t=>t.Label==tag.Trim())==null)
                        {
                            var tagent= new Tag(){Label=tag};
                            dbContext.Tags.Add(tagent);
                            mangaEnt.MangaTags.Add(new MangaTag(){
                                Manga=mangaEnt,
                                Tag=tagent
                            }) ;          
                        }else if (mangaEnt.MangaTags.Where(mt=>mt.Tag.Label==tag).FirstOrDefault()==null)
                        {
                            mangaEnt.MangaTags.Add(new MangaTag(){
                                Tag=dbContext.Tags.FirstOrDefault(t=>t.Label==tag.Trim()),
                                Manga=mangaEnt
                            });
                        }
                    }
                    mangaEnt.Chapter=new List<Chapter>();
                    foreach (var chapter in manga.Chapters)
                    {
                        var chapterEnt=new Chapter(){
                            Title=chapter.Title,
                            Url=chapter.Url,
                            Number=manga.Chapters.IndexOf(chapter)+1,
                            Seen=false
                        };
                        chapterEnt.Pages=new List<Page>();
                        foreach (var page in chapter.Pages)
                        {
                            chapterEnt.Pages.Add(new Page(){
                                Content=page.Content,
                                ContentType=page.ContentType,
                                Number=page.Number,
                                Url=page.Url
                            });
                        }
                        mangaEnt.Chapter.Add(chapterEnt);
                    }
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
                    manga.Cover=ImageHelper.ConvertImageURLToBase64(item.Value);
                    manga.CoverUrl=item.Value;
                    manga.CoverType=item.Value.Split('.').Last();
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
                if(item.InnerHtml.Contains(':'))
                    chapter.Title=item.InnerHtml.Split(':').Last().ToString();
                else
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
                    page.ContentType=item.Attributes["src"].Value.Split('.').Last();
                    page.Url=item.Attributes["src"].Value;
                    //page.Content=ImageHelper.ConvertImageURLToBase64(item.Attributes["src"].Value);
                    pages.Add(page);
                    Console.WriteLine("get page number "+pageNb+" done");
                    pageNb++;
                }  
            }
            return pages;
        }
    }
}
