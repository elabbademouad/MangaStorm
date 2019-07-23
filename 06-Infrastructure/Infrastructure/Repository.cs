using Application.Interfaces;
using DefaultPlugin.Interfaces;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Infrastructure
{
    public class Repository<T> : IRepository<T, Guid> where T : IBaseEntity
    {
        readonly IMongoCollection<T> _collection;

        protected IMongoDatabase _dbContext { get; set; }

        public Repository(IConfiguration config)
        {
            string url = config["DataBaseSettings:ConnectionsString"];
            var client = new MongoClient(url);
            client.GetDatabase(MongoUrl.Create(url).DatabaseName);
            _dbContext = client.GetDatabase(MongoUrl.Create(url).DatabaseName);
            var collectionName = typeof(T).Name;
            _collection = _dbContext.GetCollection<T>(collectionName);
        }

        public List<T> GetAll()
        {
            return _collection.Find(o => true).ToList();
        }

        public T GetById(Guid id)
        {
            return _collection.Find<T>(o => (Guid)o.Id == id).FirstOrDefault();
        }

        public void Create(T entity)
        {
            entity.CreatedDate = DateTime.Now;
            entity.UpdatedDate = DateTime.Now;
            var dr = new InsertOneOptions();
            _collection.InsertOne(entity);
        }

        public void Update(T entity)
        {
            entity.UpdatedDate = DateTime.Now;
            _collection.ReplaceOne(o => o.Id == entity.Id, entity);
        }

        public bool Delete(T entity)
        {
            return Delete((Guid)entity.Id);
        }

        public bool Delete(Guid id)
        {
            return _collection.DeleteOne(o => (Guid)o.Id == id).DeletedCount == 1;
        }

        public List<T> Query(Expression<Func<T, bool>> query)
        {
            return _collection.Find(query).ToList();
        }

        public long Count(Expression<Func<T, bool>> filter)
        {
            return _collection.CountDocuments(filter);
        }

        public void Create(IEnumerable<T> entities)
        {
            _collection.InsertMany(entities);
        }
    }
}
