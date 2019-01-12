using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces
{
    public interface IBaseEntity
    {
        Guid Id { get; set; }

        DateTime CreatedDate { get; set; }

        DateTime UpdatedDate { get; set; }
    }
}
