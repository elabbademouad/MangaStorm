using System.Collections.Generic;

namespace MangaScrap.ScrapingModel
{
    public class MangaScrapModel
    {
        public string Title { get; set; }
        public string CoverUrl { get; set; }
        public string DateEdition { get; set; }
        public string State { get; set; }
        public string Resume { get; set; }
        public List<ChapterScrapModel> Chapters { get; set;}
        public List<string> Tags { get; set; }
    }
}