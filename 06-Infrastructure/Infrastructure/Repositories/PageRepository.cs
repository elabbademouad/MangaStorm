using Application.Entities;
using DefaultPlugin.Interfaces;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Repositories
{
    public class PageRepository : Repository<Page>, IPageRepository
    {
        public PageRepository(IConfiguration config) : base(config)
        {
        }
    }
}
