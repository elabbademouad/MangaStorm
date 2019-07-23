using System;
using System.IO;
using System.Net;
using System.Text;

namespace Api.Helpers
{
    public static class ImageHelper
    {

        public static string SavaFile(byte[] buf, string mediaPath, string path, string fileName)
        {
            try
            {
                if (buf != null)
                {
                    Directory.CreateDirectory(mediaPath + "" + path);
                    var finalPath = mediaPath + "" + path + "/" + fileName;
                    if (finalPath[finalPath.Length - 1] == '/')
                    {
                        finalPath = finalPath.Remove(finalPath.Length - 1);
                    }
                    File.WriteAllBytes(finalPath, buf);
                    return path + "/" + fileName;
                }
                else
                {
                    return "";
                }

            }
            catch (Exception)
            {
                return "";
            }
        }

        public static string ConvertImageURLToBase64(String url)
        {
            StringBuilder _sb = new StringBuilder();

            Byte[] _byte = GetImage(url);

            _sb.Append(Convert.ToBase64String(_byte, 0, _byte.Length));

            return _sb.ToString();
        }

        private static byte[] GetImage(string url)
        {
            Stream stream = null;
            byte[] buf;

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
            catch (Exception)
            {
                buf = null;
            }

            return (buf);
        }
    }
}
