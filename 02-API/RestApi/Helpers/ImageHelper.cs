using System;
using System.IO;
using System.Net;

namespace Api.Helpers
{
    public static class ImageHelper
    {

        public static string SavaFile(string url, string mediaPath, string path, string fileName)
        {
            Stream stream = null;
            byte[] buf = null;
            try
            {
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
                Directory.CreateDirectory(mediaPath + "" + path);
                var finalPath = mediaPath + "" + path + "/" + fileName;
                if (finalPath[finalPath.Length - 1] == '/')
                {
                    finalPath = finalPath.Remove(finalPath.Length - 1);
                }
                File.WriteAllBytes(finalPath, buf);
                return path + "/" + fileName;
            }
            catch (Exception)
            {
                return "";
            }
        }
    }
}
