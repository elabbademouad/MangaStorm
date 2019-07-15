﻿using Application.Entities;
using Application.Model;
using Application.Services;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DefaultPlugin.Services
{
    public class OnMangaChapterService : IChapterService
    {

        public List<Chapter> GetChaptersByMangaId(object id)
        {
            HtmlWeb htmlWeb = new HtmlWeb();
            HtmlDocument htmlDocument = htmlWeb.Load(id.ToString());
            var list = new List<Chapter>();
            var htmlExtract = htmlDocument.DocumentNode.SelectSingleNode("//ul[@class='chapters']")?.SelectNodes(".//li");
            foreach (var item in htmlExtract)
            {
                list.Add(new Chapter()
                {
                    Id = item.SelectSingleNode(".//h5[@class='chapter-title-rtl']").SelectSingleNode(".//a").Attributes["href"].Value,
                    Number = 0,
                    MangaId = id,
                    Title = item.SelectSingleNode(".//h5[@class='chapter-title-rtl']").SelectSingleNode(".//a").InnerText,
                    Url = "",
                    Source = new Source()
                    {
                        Id = 1,
                        Label = "On-Manga"
                    }
                });
            }
            return list;
        }

        public Chapter GetNextChapter(object mangaId, object currentChapterNumber)
        {
            return null;
        }

        public Chapter GetPreviousChapter(object mangaId, object currentChapterNumber)
        {
            return null;
        }
    }
}
