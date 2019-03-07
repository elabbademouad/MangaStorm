using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
namespace DataScraping.Config
{
    public class Configuration : IConfiguration
    {
        public string this[string key] { get => this.keyValues[key]; set => this.keyValues[key] = value; }

        private Dictionary<string, string> keyValues;

        public Configuration()
        {
            FillKeyValues("Development");
        }

        public Configuration(string environmentName)
        {
            FillKeyValues(environmentName);
        }

        public IEnumerable<IConfigurationSection> GetChildren()
        {
            throw new NotImplementedException();
        }

        public IChangeToken GetReloadToken()
        {
            throw new NotImplementedException();
        }

        public IConfigurationSection GetSection(string key)
        {
            throw new NotImplementedException();
        }

        private void FillKeyValues(string environmentName)
        {
            using (StreamReader sr = new StreamReader($"../../../Config/ScrapingConfig.{environmentName}.json", System.Text.Encoding.UTF8))
            {
                string configJson = sr.ReadToEnd();
                keyValues = JsonConvert.DeserializeObject<Dictionary<string, string>>(configJson);
            }
        }
    }
}
