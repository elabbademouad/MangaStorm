using Application.Entities;
using DefaultPlugin.Interfaces;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Repositories
{
    public class TagRepository : Repository<Tag>, ITagRepository
    {
        public TagRepository(IConfiguration config) : base(config)
        {
        }
    }
}
