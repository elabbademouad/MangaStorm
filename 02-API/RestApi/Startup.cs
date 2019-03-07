using Application.Interfaces;
using Application.Services;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using RestAPI.MapperConfig;
using System.IO;

namespace Api
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                    .SetBasePath(env.ContentRootPath)
                    .AddJsonFile($"appsettings.{ env.EnvironmentName}.json", true)
                    .AddEnvironmentVariables();
            Configuration = builder.Build();

        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddCors();
            services.AddDirectoryBrowser();
            ApplicationMapperConfig mapperConfig = new ApplicationMapperConfig(Configuration);
            mapperConfig.Initialize();
            services.AddSingleton(Configuration);
            //Repositories DI (Infrastrucure layer)
            services.AddScoped<IMangaRepository, MangaRepository>();
            services.AddScoped<IChapterRepository, ChapterRepository>();
            services.AddScoped<IPageRepository, PageRepository>();
            services.AddScoped<ITagRepository, TagRepository>();
            //Service DI (Application layer)
            services.AddScoped<MangaService>();
            services.AddScoped<ChapterService>();
            services.AddScoped<PageService>();
            services.AddScoped<TagService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), Configuration["ApiSettings:MediaPath"])),
            })
            .UseCors(builder =>
                    builder.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod()
            )
            .UseHttpsRedirection()
            .UseMvc();

        }
    }
}
