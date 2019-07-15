using Application.Services;
using DefaultPlugin.Interfaces;
using DefaultPlugin.Services;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using RestAPI.Enums;
using RestAPI.MapperConfig;
using System;
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
            services.AddMemoryCache();
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
            services.AddScoped<DefaultMangaService>();
            services.AddScoped<DefaultChapterService>();
            services.AddScoped<DefaultPageService>();
            services.AddScoped<DefaultTagService>();
            services.AddScoped<OnMangaMangaService>();
            services.AddScoped<OnMangaChapterService>();
            services.AddScoped<OnMangaPageService>();
            services.AddScoped<OnMangaTagService>();
            services.AddTransient<Func<PluginEnum, IMangaService>>(serviceProvider => key =>
            {
                switch (key)
                {
                    case PluginEnum.Default:
                        return serviceProvider.GetService<DefaultMangaService>();
                    case PluginEnum.OnManga:
                        return serviceProvider.GetService<OnMangaMangaService>();
                    default:
                        return serviceProvider.GetService<DefaultMangaService>();
                }
            });
            services.AddTransient<Func<PluginEnum, IChapterService>>(serviceProvider => key =>
            {
                switch (key)
                {
                    case PluginEnum.Default:
                        return serviceProvider.GetService<DefaultChapterService>();
                    case PluginEnum.OnManga:
                        return serviceProvider.GetService<OnMangaChapterService>();
                    default:
                        return serviceProvider.GetService<DefaultChapterService>();
                }
            });
            services.AddTransient<Func<PluginEnum, IPageService>>(serviceProvider => key =>
            {
                switch (key)
                {
                    case PluginEnum.Default:
                        return serviceProvider.GetService<DefaultPageService>();
                    case PluginEnum.OnManga:
                        return serviceProvider.GetService<OnMangaPageService>();
                    default:
                        return serviceProvider.GetService<DefaultPageService>();
                }
            });
            services.AddTransient<Func<PluginEnum, ITagService>>(serviceProvider => key =>
            {
                switch (key)
                {
                    case PluginEnum.Default:
                        return serviceProvider.GetService<DefaultTagService>();
                    case PluginEnum.OnManga:
                        return serviceProvider.GetService<OnMangaTagService>();
                    default:
                        return serviceProvider.GetService<DefaultTagService>();
                }
            });
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
            //.UseDirectoryBrowser(new DirectoryBrowserOptions
            //{
            //    FileProvider = new PhysicalFileProvider(
            //        Path.Combine(Directory.GetCurrentDirectory(), Configuration["ApiSettings:MediaPath"])),
            //})
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
