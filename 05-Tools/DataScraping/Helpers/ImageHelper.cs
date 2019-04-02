using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Net;
namespace DataScraping.Helpers
{
    public static class ImageHelper
    {

        public static string SavaPage(string url, string mediaPath, string path, string fileName, IConfiguration config)
        {
            try
            {
                using (var client = new WebClient()) //WebClient  
                {
                    client.Headers.Add("Content-Type:application/json");
                    client.Headers.Add($"url:{url}");
                    client.Headers.Add($"mediaPath:{mediaPath}");
                    client.Headers.Add($"path:{path}");
                    client.Headers.Add($"fileName:{fileName}");
                    string result = client.DownloadString(config["UploadPageApi"]);
                    return result;
                }
            }
            catch (Exception)
            {
                Console.WriteLine("Error : the restApi project not started pleese set RestApi project as second startUp project");
                return "";
            }
        }
        public static string GetPagelocalPath(string url, string mediaPath, string path, string fileName)
        {
            try
            {
                using (WebClient webclient = new WebClient())
                {
                    Directory.CreateDirectory(mediaPath + path);
                    webclient.DownloadFile(url, mediaPath + path + "/" + fileName);
                    webclient.Dispose();
                    return path + "/" + fileName;
                }
            }
            catch (Exception ex)
            {
                return "";
            }
        }
    }
}
