using Application.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Model
{
    public class SourceModel
    {
        public string Logo { get; set; }
        public int Rating { get; set; }
        public Source Source { get; set; }
        public string Language { get; set; }

    }
}
