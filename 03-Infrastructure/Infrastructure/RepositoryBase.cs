using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure
{
    public class RepositoryBase
    {
        public readonly IMongoDatabase DbContext;
        public RepositoryBase(IMongoDatabase dbContext)
        {
            DbContext = dbContext;
        }
    }
}
