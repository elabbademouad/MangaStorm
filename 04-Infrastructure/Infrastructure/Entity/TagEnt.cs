using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Entity
{
    public class TagEnt : EntityBase
    {
        [BsonElement("Label")]
        public string Label { get; set; }
    }
}
