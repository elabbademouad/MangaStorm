using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces
{
    public interface IBaseEntity
    {
        object Id { get; set; }

        DateTime CreatedDate { get; set; }

        DateTime UpdatedDate { get; set; }
    }
}
