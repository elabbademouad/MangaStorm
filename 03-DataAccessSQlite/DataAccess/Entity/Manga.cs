using System;
using System.Collections.Generic;

namespace DataAccess.Entity
{
    public class Manga 
    {
        public int Id { get; set; } 
        public string Matricule { get; set; }
        public string Name { get; set; } 
        public string Date { get; set; } 
        public string Resume { get; set; }
        public string CoverExteranlUrl { get; set; }
        public string CoverInternalUrl { get; set; }
        public string State { get; set; }
        public List<Chapter> Chapters{get; set;}
        public string Tags {get; set;}
    }
}