using Application.Entities;
using DefaultPlugin.Interfaces;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Repositories
{
    public class MangaRepository : Repository<Manga>, IMangaRepository
    {
        public MangaRepository(IConfiguration config) : base(config)
        {
        }
    }
}
