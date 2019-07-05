using System;

namespace Application.Entities
{
    public class Chapter : BaseEntity
    {
        public int Number { get; set; }

        public string Title { get; set; }

        public string Url { get; set; }

        public object MangaId { get; set; }
        public int Views { get; set; }

    }
}
