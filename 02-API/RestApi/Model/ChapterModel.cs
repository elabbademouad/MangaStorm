using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Model
{
    public class ChapterModel
    {
        public Guid Id { get; set; }
        public int Number { get; set; }
        public string Title { get; set; }
        public Guid MangaId { get; set; }
    }
}
