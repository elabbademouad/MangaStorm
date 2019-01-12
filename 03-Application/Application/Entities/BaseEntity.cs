using Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entities
{
    public class BaseEntity : IBaseEntity
    {
        public Guid Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
