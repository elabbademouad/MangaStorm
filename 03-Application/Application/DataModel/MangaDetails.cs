using Application.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.DataModel
{
    public class MangaDetails
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Date { get; set; }
        public string Resume { get; set; }
        public string Cover { get; set; }
        public string State { get; set; }
        public string Tags { get; set; }
        public long CountChapters { get; set; }
    }
}
