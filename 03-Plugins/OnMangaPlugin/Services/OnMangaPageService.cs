using Application.Entities;
using Application.Services;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace DefaultPlugin.Services
{
    public class OnMangaPageService : IPageService
    {
        public List<Page> DownloadChapter(object chapterId)
        {
            throw new NotImplementedException();
        }

        public List<Page> GetPagesByChapterId(object id)
        {
            HtmlWeb htmlWebPageCount = new HtmlWeb();
            var list = new List<Page>();
            var pageCount = htmlWebPageCount.Load(string.Format("{0}/{1}", id, "1"))
                                         ?.DocumentNode
                                         ?.SelectSingleNode("//select[@class='selectpicker']")
                                         ?.SelectNodes(".//option")?.Count;
            Parallel.For(1, pageCount.Value + 1, (i) =>
              {
                  HtmlWeb htmlWeb = new HtmlWeb();
                  var htmlExtract = htmlWeb.Load(string.Format("{0}/{1}", id, i))
                                      ?.DocumentNode
                                      ?.SelectSingleNode("//img[@class='img-responsive scan-page']");
                  list.Add(new Page()
                  {
                      Id = string.Format("{0}/{1}", id, i),
                      ChapterId = id,
                      ExternalUrl = htmlExtract.Attributes["src"].Value,
                      InternalUrl = htmlExtract.Attributes["src"].Value,
                      Number = i,
                      Pending = false,
                  });
              });
            return list.OrderBy(p => p.Number).ToList();
        }
    }
}
