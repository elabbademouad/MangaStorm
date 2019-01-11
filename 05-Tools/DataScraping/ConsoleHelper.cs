using System;

namespace MangaScrap
{
    public static class ConsoleHelper
    {
        public static void WriteLine(object item,ConsoleColor color)
        {
            Console.ForegroundColor=color;
            Console.WriteLine(item);
            Console.ForegroundColor=ConsoleColor.White;
        }
        public static void Write(object item,ConsoleColor color)
        {
            Console.ForegroundColor=color;
            Console.Write(item);
            Console.ForegroundColor=ConsoleColor.White;
        }
    }
}