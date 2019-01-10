using System;
using System.IO;
using System.Net;
using System.Text;

namespace MangaScrap
{
    public static class ImageHelper
    {
        public static String ConvertImageURLToBase64(String url)
        {
            StringBuilder _sb = new StringBuilder();
            Byte[] _byte = GetImage(url);
            if(_byte==null)
                return "";
            _sb.Append(Convert.ToBase64String(_byte, 0, _byte.Length));
            return _sb.ToString();
        }
        private static byte[] GetImage(string url)
        {
            Stream stream = null;
            byte[] buf=null;
            try
            {
                WebProxy myProxy = new WebProxy();
                HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
                HttpWebResponse response = (HttpWebResponse)req.GetResponse();
                stream = response.GetResponseStream();
                using (BinaryReader br = new BinaryReader(stream))
                {
                    int len = (int)(response.ContentLength);
                    buf = br.ReadBytes(len);
                    br.Close();
                }
                stream.Close();
                response.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error :"+ex.Message);
            }
            return (buf);
        }

        public static string SavaInternal(string url,string rootPath,string path,string fileName)
        {
            Stream stream = null;
            byte[] buf = null;
            try
            {
                WebProxy myProxy = new WebProxy();
                HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
                HttpWebResponse response = (HttpWebResponse)req.GetResponse();
                stream = response.GetResponseStream();
                using (BinaryReader br = new BinaryReader(stream))
                {
                    int len = (int)(response.ContentLength);
                    buf = br.ReadBytes(len);
                    br.Close();
                }
                stream.Close();
                response.Close();
                Directory.CreateDirectory(rootPath+ "/"+path);
                var finalPath = rootPath + "/" + path + "/" + fileName;
                if (finalPath[finalPath.Length-1]=='/')
                {
                    finalPath=finalPath.Remove(finalPath.Length - 1);
                }
                File.WriteAllBytes(finalPath, buf);
                Console.WriteLine("Success :"+path + "/" + fileName);
                return path + "/" + fileName;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error :" + ex.Message);
                return "";
            }
        }
    }
}