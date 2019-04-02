using System;
using System.IO;

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
    }
}
