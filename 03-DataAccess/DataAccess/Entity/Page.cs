namespace DataAccess.Entity
{
    public class Page
    {
        public int Id { get; set; }
        public int Number { get; set; } 
        public string ExternalUrl { get; set; }
        public string InternalUrl { get; set; }
        public bool Pending { get; set; }
    }
}