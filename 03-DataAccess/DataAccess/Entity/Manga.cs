using System;
using System.Collections.Generic;

namespace DataAccess.Entity
{
    public class Manga 
    {
        public int Id { get; set; } 
        public string Name { get; set; } 
        public string Date { get; set; } 
        public string Resume { get; set; }
        public string CoverImage { get; set; }
        public string CoverUrl { get; set; }
        public string CoverType { get; set; }
        public string State { get; set; }
        public List<Chapter> Chapter{get; set;}
        public List<MangaTag> MangaTags {get; set;}
    }
}