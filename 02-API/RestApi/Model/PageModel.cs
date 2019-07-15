using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Model
{
    public class PageModel
    {
        public object Id { get; set; }
        public int Number { get; set; }
        public string Url { get; set; }
        public object ChapterId { get; set; }
        public string Base64 { get; set; }
    }
}
