using System.Collections.Generic;
namespace DataAccess.Entity
{
    public class MangaTag
    {
        public int Id { get; set; }
        public Tag Tag { get; set; }
        public Manga Manga { get; set; }
    }
}