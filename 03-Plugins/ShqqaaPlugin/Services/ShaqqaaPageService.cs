using Application.Entities;
using Application.Services;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShqqaaPlugin.Services
{
    public class ShaqqaaPageService : IPageService
    {
        public List<Page> DownloadChapter(object chapterId)
        {
            throw new NotImplementedException();
        }

        public List<Page> GetPagesByChapterId(object id)
        {
            HtmlWeb htmlWeb = new HtmlWeb();
            HtmlDocument htmlDocument = htmlWeb.Load(id.ToString());
            var pagesHtml = htmlDocument.DocumentNode.SelectSingleNode(".//div[@class='img-manga']").SelectNodes(".//img");
            List<Page> pages = new List<Page>();
            int i = 1;
            foreach (var pageHtml in pagesHtml)
            {
                pages.Add(new Page()
                {
                    Id = pageHtml.Attributes["src"].Value,
                    ChapterId = id,
                    ExternalUrl = pageHtml.Attributes["src"].Value,
                    InternalUrl = pageHtml.Attributes["src"].Value,
                    Number = i,
                    Pending = false,
                });
                i++;
            }
            return pages;
        }
    }
}
