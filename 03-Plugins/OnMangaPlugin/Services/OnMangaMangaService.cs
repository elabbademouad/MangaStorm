﻿using Application.Entities;
using Application.Model;
using Application.Services;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DefaultPlugin.Services
{
    public class OnMangaMangaService : IMangaService
    {
        public List<Manga> GetAllManga()
        {

            return null;
        }

        public MangaDetails GetMangaDetailsById(object mangaId)
        {
            HtmlWeb htmlWeb = new HtmlWeb();
            HtmlDocument htmlDocument = htmlWeb.Load(mangaId.ToString());
            string rating = htmlDocument.DocumentNode.SelectSingleNode("//h2[@class='average']")?.InnerText;
            string state = htmlDocument.DocumentNode.SelectSingleNode("//span[@class='label label-success']")?.InnerText;
            if (string.IsNullOrEmpty(state))
            {
                state = htmlDocument.DocumentNode.SelectSingleNode("//span[@class='label label-danger']")?.InnerText;
            }

            string resume = htmlDocument.DocumentNode.SelectSingleNode("//div[@class='managa-summary']")?.SelectSingleNode(".//p")?.InnerText;
            string name = htmlDocument.DocumentNode.SelectSingleNode("//div[@class='panel-heading']")?.InnerText.Replace("&quot;", "");
            string cover = htmlDocument.DocumentNode.SelectSingleNode("//div[@class='boxed']")?.SelectSingleNode(".//img")?.Attributes["src"]?.Value;
            int? chapterCount = htmlDocument.DocumentNode.SelectSingleNode("//ul[@class='chapters']")?.SelectNodes(".//li")?.Count;
            string dateEdition = "";
            string tags = "";
            int views = 0;
            var htmlh1Extract = htmlDocument.DocumentNode.SelectNodes("//h3");
            foreach (var item in htmlh1Extract)
            {
                if (item.InnerText.Contains("تاريخ الإصدار"))
                {
                    dateEdition = item?.SelectSingleNode(".//div")?.InnerText;
                }
                if (item.InnerText.Contains("التصنيفات"))
                {
                    var tagshtml = item?.SelectNodes(".//a");
                    if (tagshtml != null)
                    {
                        foreach (var tag in tagshtml)
                        {
                            tags += tag.InnerText + ",";
                        }
                        tags = tags.Remove(tags.Length - 1);
                    }
                }
                if (item.InnerText.Contains("الزيارة"))
                {
                    views = int.Parse(item?.SelectSingleNode(".//div")?.InnerText);
                }
            }
            return new MangaDetails()
            {
                Id = mangaId,
                State = state,
                Resume = resume,
                Cover = cover,
                CountChapters = chapterCount.Value,
                Name = name,
                Tags = tags,
                Date = dateEdition,
                Rating = rating,
                Views = views
            };
        }
        public List<MangaDetails> GetMangaDetailsList(object page = null, object filtre = null, object tag = null)
        {
            if (page == null)
            {
                page = 1;
            }
            var list = new List<MangaDetails>();
            HtmlWeb htmlWeb = new HtmlWeb();
            HtmlDocument htmlDocument = htmlWeb.Load($"https://www.on-manga.me/filterList?page={page}&cat=&alpha=&sortBy=name&asc&author&artist=&tag=");
            var htmlExtract = htmlDocument.DocumentNode.SelectNodes("//div[@class='chapter-container']");
            foreach (var item in htmlExtract)
            {
                var mangaId = item.SelectSingleNode(".//div[@class='chapter-image']").SelectSingleNode(".//a").Attributes["href"].Value;
                var mangaCover = item.SelectSingleNode(".//div[@class='chapter-image']").SelectSingleNode(".//a").SelectSingleNode(".//img").Attributes["src"].Value;
                var mangaName = item.SelectSingleNode(".//div[@class='chapter-image']").SelectSingleNode(".//a").SelectSingleNode(".//img").Attributes["alt"].Value.Replace("&quot;", "");
                var manga = new MangaDetails()
                {
                    Id = mangaId,
                    Cover = mangaCover,
                    Name = mangaName,
                    Tags = ""
                };
                list.Add(manga);
            }
            return list;
        }

        public List<MangaDetails> GetMangaForYou(int count, List<string> tag)
        {
            var list = new List<MangaDetails>();
            HtmlWeb htmlWeb = new HtmlWeb();
            HtmlDocument htmlDocument = htmlWeb.Load("https://www.on-manga.me/");
            var htmlExtract = htmlDocument.DocumentNode.SelectNodes(".//li[@class='list-group-item']");
            Parallel.For(0, count, (i) =>
            {
                list.Add(this.GetMangaDetailsById(htmlExtract[i]?.SelectSingleNode(".//a").Attributes["href"].Value));
            });
            return list;
        }

        public List<MangaDetails> GetMangaListHasNewChapter(int count)
        {
            var list = new List<MangaDetails>();
            HtmlWeb htmlWeb = new HtmlWeb();
            HtmlDocument htmlDocument = htmlWeb.Load("https://www.on-manga.me/");
            var htmlExtract = htmlDocument.DocumentNode.SelectNodes("//div[@class='manga-item']");
            Parallel.For(0, count, (i) =>
            {
                list.Add(this.GetMangaDetailsById(htmlExtract[i]?.SelectSingleNode(".//h3")?.SelectSingleNode(".//a").Attributes["href"].Value));
            });
            return list;
        }

        public List<MangaDetails> GetMostViewed(int count)
        {
            var list = new List<MangaDetails>();
            HtmlWeb htmlWeb = new HtmlWeb();
            HtmlDocument htmlDocument = htmlWeb.Load("https://www.on-manga.me/");
            var htmlExtract = htmlDocument.DocumentNode.SelectNodes(".//li[@class='list-group-item']");

            Parallel.For(0, count, (i) =>
            {
                list.Add(this.GetMangaDetailsById(htmlExtract[i]?.SelectSingleNode(".//a").Attributes["href"].Value));
            });
            return list;
        }

        public List<MangaDetails> GetNewList(int count)
        {
            throw new NotImplementedException();
        }
    }
}