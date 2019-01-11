using System.Collections.Generic;

namespace MangaScrap.ScrapingModel
{
    public class ChapterScrapModel
    {
        public string Title { get; set; }
        public string Url { get; set; }
        public int Number { get; set; }
        public List<PageScrapModel> Pages { get; set; }
    }
}