using Application.Entities;
using System;

namespace Api.Model
{
    public class MangaDetailsModel
    {
        public object Id { get; set; }
        public string Name { get; set; }
        public string Date { get; set; }
        public string Resume { get; set; }
        public string Cover { get; set; }
        public string State { get; set; }
        public string Tags { get; set; }
        public int CountChapters { get; set; }
        public int Views { get; set; }
        public string Rating { get; set; }
        public Source Source { get; set; }

    }
}
