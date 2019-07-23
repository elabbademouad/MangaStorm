using System;
using System.Collections.Generic;
using System.Text;

namespace OnMangaPlugin
{
    public static class Utility
    {
        public static string CleanText(this string text)
        {
            if (string.IsNullOrEmpty(text))
            {
                return text;
            }
            else
            {
                return text.Replace("&quot;", "")
                           .Replace("&#039;", "");
            }
        }
    }
}
