using Application.Entities;
using Application.Model;
using Application.Services;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
namespace ShqqaaPlugin.Services
{
    public class ShaqqaaChapterService : IChapterService
    {
        public List<Chapter> GetChaptersByMangaId(object id)
        {
            HtmlWeb htmlWeb = new HtmlWeb();
            HtmlDocument htmlDocument = htmlWeb.Load(id.ToString());
            var chaptersHtml = htmlDocument.DocumentNode.SelectNodes(".//a[@class='btn btn-light m-1']");
            var chapters = new List<Chapter>();
            int number = 0;
            foreach (var item in chaptersHtml)
            {
                number++;
                chapters.Add(new Chapter()
                {
                    Id = item.Attributes["href"].Value,
                    Number = number,
                    MangaId = id,
                    Title = item.Attributes["title"].Value,
                    Url = "",
                    Source = new Source()
                    {
                        Id = 2,
                        Label = "shqqaa.com"
                    }
                });
            }
            return chapters;
        }

        public Chapter GetNextChapter(object mangaId, object currentChapterNumber)
        {
            throw new NotImplementedException();
        }

        public Chapter GetPreviousChapter(object mangaId, object currentChapterNumber)
        {
            throw new NotImplementedException();
        }
    }
}
