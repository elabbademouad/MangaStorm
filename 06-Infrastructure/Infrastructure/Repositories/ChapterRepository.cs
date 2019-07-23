using Application.Entities;
using DefaultPlugin.Interfaces;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Repositories
{
    public class ChapterRepository : Repository<Chapter>, IChapterRepository
    {
        public ChapterRepository(IConfiguration config) : base(config)
        {
        }
    }
}
