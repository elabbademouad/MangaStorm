using Infrastructure.Entity;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Infrastructure.Repository
{
    class MangaRepository : RepositoryBase, IRepository<Manga, ObjectId>
    {
        public MangaRepository(IMongoDatabase database) : base(database)
        {
        }

        public Manga CreateOrUpdate(Manga entity)
        {
            throw new NotImplementedException();
        }

        public bool Delete(Manga entity)
        {
            throw new NotImplementedException();
        }

        public bool Delete(ObjectId id)
        {
            throw new NotImplementedException();
        }

        public List<Manga> GetAll()
        {
            throw new NotImplementedException();
        }

        public Manga GetById(ObjectId id)
        {
            throw new NotImplementedException();
        }

        public List<Manga> Query(Func<Manga, bool> query)
        {
            throw new NotImplementedException();
        }
    }
}
