using Application.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DefaultPlugin.Interfaces
{
    public interface ITagRepository : IRepository<Tag, Guid>
    {
    }
}
