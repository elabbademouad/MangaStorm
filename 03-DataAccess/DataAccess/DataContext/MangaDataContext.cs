using DataAccess.Entity;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.DataContext
{
    public class MangaDataContext : DbContext
    {
        private string connectionString;
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if(string.IsNullOrEmpty(connectionString))
                connectionString="Data Source=ManagDb.db";
            optionsBuilder.UseSqlite(connectionString);
        }

        public MangaDataContext():base()
        {
            
        }
        public MangaDataContext(string connectionString)
        {
            this.connectionString=connectionString;
        }
        public DbSet<Manga> Mangas { get; set;}
        public DbSet<Chapter> Chapters { get; set;}
        public DbSet<Page> Pages { get; set;}
    }
}