using Infrastructure.Entity;
using Infrastructure.Repositories.Interface;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Infrastructure.Repositories
{
    public class TagRepository : RepositoryBase<TagEnt>, ITagRepository
    {
        public TagRepository(IMongoDatabase dbContext) : base(dbContext)
        {

        }
    }
}
