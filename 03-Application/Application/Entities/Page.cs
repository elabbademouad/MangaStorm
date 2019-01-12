
using System;

namespace Application.Entities
{
    public class Page : BaseEntity
    {
        public int Number { get; set; }

        public string ExternalUrl { get; set; }

        public string InternalUrl { get; set; }

        public bool Pending { get; set; }

        public Guid ChapterId { get; set; }
    }
}