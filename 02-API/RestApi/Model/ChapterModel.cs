using System;

namespace RestAPI.Model
{
    public class ChapterModel
    {
        public object Id { get; set; }
        public int Number { get; set; }
        public string Title { get; set; }
        public object MangaId { get; set; }
        public int Views { get; set; }

    }
}
