﻿using Application.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DefaultPlugin.Interfaces
{
    public interface IChapterRepository : IRepository<Chapter, Guid>
    {
    }
}
