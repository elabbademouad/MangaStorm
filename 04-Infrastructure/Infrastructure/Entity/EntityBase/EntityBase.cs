using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Entity
{
    public class EntityBase
    {
        public ObjectId Id { get; set; }

        [BsonElement("CreatedDate")]
        public DateTime CreatedDate { get; set; }

        [BsonElement("UpdatedDate")]
        public DateTime UpdatedDate { get; set; }
    }
}
