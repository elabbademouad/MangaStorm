using Application.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DefaultPlugin.Interfaces
{
    public interface IPageRepository : IRepository<Page, Guid>
    {
    }
}
