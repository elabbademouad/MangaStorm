using Infrastructure.Entity;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Repositories
{
    public class PageRepository : RepositoryBase<PageEnt>
    {
        public PageRepository(IMongoDatabase dbContext) : base(dbContext)
        {
        }
    }
}
