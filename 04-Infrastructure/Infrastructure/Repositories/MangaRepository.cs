using Infrastructure.Entity;
using Infrastructure.Repositories.Interface;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Repositories
{
    public class MangaRepository : RepositoryBase<MangaEnt>, IMangaRepository
    {
        public MangaRepository(string connectionString, string dataBaseName) : base(connectionString, dataBaseName)
        {
        }
    }
}
