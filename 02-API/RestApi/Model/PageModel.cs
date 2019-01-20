using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Model
{
    public class PageModel
    {
        public Guid Id { get; set; }
        public int Number { get; set; }
        public string Url { get; set; }
        public Guid ChapterId { get; set; }
    }
}
