namespace Application.Entities
{
    public class Manga : BaseEntity
    {
        public string Name { get; set; }

        public string Date { get; set; }

        public string Resume { get; set; }

        public string CoverExteranlUrl { get; set; }

        public string CoverInternalUrl { get; set; }

        public string State { get; set; }

        public string Tags { get; set; }

        public int Views { get; set; }

        public string Rating { get; set; }
        public Source Source { get; set; }
    }
}
