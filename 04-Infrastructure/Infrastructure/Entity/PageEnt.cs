using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Infrastructure.Entity
{
    public class PageEnt : EntityBase
    {
        [BsonElement("Number")]
        public int Number { get; set; }

        [BsonElement("ExternalUrl")]
        public string ExternalUrl { get; set; }

        [BsonElement("InternalUrl")]
        public string InternalUrl { get; set; }

        [BsonElement("Pending")]
        public bool Pending { get; set; }

        [BsonElement("ChapterId")]
        public ObjectId ChapterId { get; set; }
    }
}