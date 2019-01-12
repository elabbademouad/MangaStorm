using Application.Entities;
using Application.Interfaces;
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
