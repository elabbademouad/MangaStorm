using Infrastructure.Entity;
using Infrastructure.Repositories.Interface;
using MongoDB.Driver;

namespace Infrastructure.Repositories
{
    public class ChapterRepository : RepositoryBase<ChapterEnt>, IChapterRepository
    {
        public ChapterRepository(IMongoDatabase dbContext) : base(dbContext)
        {
        }
    }
}
