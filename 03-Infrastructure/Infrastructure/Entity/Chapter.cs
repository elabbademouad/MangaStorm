using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Infrastructure.Entity
{
    public class Chapter
    {
        public ObjectId Id { get; set; }

        [BsonElement("Number")]
        public int Number { get; set; }

        [BsonElement("Title")]
        public string Title { get; set; }

        [BsonElement("Url")]
        public string Url { get; set; }

        [BsonElement("MangaId")]
        public int MangaId { get; set; }
    }
}