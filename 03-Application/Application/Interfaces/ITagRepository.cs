using Application.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces
{
    public interface ITagRepository : IRepository<Tag, Guid>
    {
    }
}
