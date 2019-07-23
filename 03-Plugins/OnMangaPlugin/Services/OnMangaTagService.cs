using Application.Services;
using HtmlAgilityPack;
using System.Collections.Generic;
using System.Linq;

namespace DefaultPlugin.Services
{
    public class OnMangaTagService : ITagService
    {
        public List<string> GetAllTagsLabel()
        {
            var list = new List<string>();
            HtmlWeb htmlWeb = new HtmlWeb();
            HtmlDocument htmlDocument = htmlWeb.Load("https://www.on-manga.me/manga-list");
            var htmlExtract = htmlDocument.DocumentNode.SelectSingleNode(".//ul[@class='list-category']").SelectNodes(".//li");
            foreach (var item in htmlExtract)
            {
                list.Add(item.SelectSingleNode(".//a").InnerText);
            }
            return list;
        }
    }
}
