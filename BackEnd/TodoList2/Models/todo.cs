using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace WebAppAPI.Models
{
    [BsonIgnoreExtraElements]
    public class todo
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("content")]
        public string Content { get; set; }
    }
}
