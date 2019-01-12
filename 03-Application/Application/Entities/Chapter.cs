using System;
using System.Collections.Generic;

namespace Application.Entities
{
    public class Chapter : BaseEntity
    {
        public int Number { get; set; }

        public string Title { get; set; }

        public string Url { get; set; }

        public Guid MangaId { get; set; }
    }
}