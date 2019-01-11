using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Infrastructure
{
    public class RepositoryBase<T> : IRepository<T, ObjectId> where T : Entity.EntityBase
    {
        readonly IMongoCollection<T> _collection;

        protected IMongoDatabase _dbContext { get; set; }

        public RepositoryBase(IMongoDatabase dbContext)
        {
            _dbContext = dbContext;
            var collectionName = typeof(T).Name.Substring(0, typeof(T).Name.Length - 3);
            _collection = _dbContext.GetCollection<T>(collectionName);
        }

        public List<T> GetAll()
        {
            return _collection.Find(o => true).ToList(); ;
        }

        public T GetById(ObjectId id)
        {
            return _collection.Find<T>(o => o.Id == id).FirstOrDefault();
        }

        public void Create(T entity)
        {
            entity.CreatedDate = DateTime.Now;
            entity.UpdatedDate = DateTime.Now;
            _collection.InsertOne(entity);
        }

        public void Update(T entity)
        {
            entity.UpdatedDate = DateTime.Now;
            _collection.ReplaceOne(o => o.Id == entity.Id, entity);
        }

        public bool Delete(T entity)
        {
            return Delete(entity.Id);
        }

        public bool Delete(ObjectId id)
        {
            return _collection.DeleteOne(o => o.Id == id).DeletedCount == 1;
        }

        public List<T> Query(Expression<Func<T, bool>> query)
        {
            return _collection.Find(query).ToList();
        }
    }
}
