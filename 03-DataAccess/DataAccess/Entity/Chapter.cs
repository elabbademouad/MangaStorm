using System.Collections.Generic;

namespace DataAccess.Entity
{
    public class Chapter
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public List<Page> Pages{get; set; }
    }
}