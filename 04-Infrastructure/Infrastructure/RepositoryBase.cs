using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure
{
    public class RepositoryBase<T> : IRepository<T, ObjectId> where T : Entity.EntityBase
    {
        string _collectionName;
        public IMongoDatabase DbContext { get; set; }
        public RepositoryBase(string connectionString, string dataBaseName)
        {
            var client = new MongoClient("mongodb://35.211.13.59:27017");
            DbContext = client.GetDatabase("testDatabase");
            _collectionName = typeof(T).Name;

        }

        public List<T> GetAll()
        {
            return DbContext.GetCollection<T>(_collectionName).Find(o => true).ToList();
        }

        public T GetById(ObjectId id)
        {
            return DbContext.GetCollection<T>(_collectionName).Find<T>(o => o.Id == id).FirstOrDefault();
        }

        public T Create(T entity)
        {
            throw new NotImplementedException();
        }

        public T Update(T entity)
        {
            throw new NotImplementedException();
        }

        public bool Delete(T entity)
        {
            throw new NotImplementedException();
        }

        public bool Delete(ObjectId id)
        {
            throw new NotImplementedException();
        }

        public List<T> Query(Func<T, bool> query)
        {
            throw new NotImplementedException();
        }
    }
}
