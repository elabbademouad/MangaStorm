using System;

namespace RestAPI.Model
{
    public class ChapterModel
    {
        public Guid Id { get; set; }
        public int Number { get; set; }
        public string Title { get; set; }
        public Guid MangaId { get; set; }
        public int Views { get; set; }

    }
}
