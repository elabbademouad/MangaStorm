using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace Infrastructure.Entity
{
    public class Manga 
    {

        public ObjectId Id { get; set; }

        [BsonElement("Matricule")]
        public string Matricule { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("Date")]
        public string Date { get; set; }

        [BsonElement("Resume")]
        public string Resume { get; set; }

        [BsonElement("CoverExteranlUrl")]
        public string CoverExteranlUrl { get; set; }

        [BsonElement("CoverInternalUrl")]
        public string CoverInternalUrl { get; set; }

        [BsonElement("State")]
        public string State { get; set; }

        public List<Chapter> Chapters{get; set;}

        [BsonElement("Tags")]
        public string Tags {get; set;}
    }
}