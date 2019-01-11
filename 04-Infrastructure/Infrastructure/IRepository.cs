using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Infrastructure
{
    interface IRepository<T, K>
    {
        List<T> GetAll();
        T GetById(K id);
        void Create(T entity);
        void Update(T entity);
        bool Delete(T entity);
        bool Delete(K id);
        List<T> Query(Expression<Func<T, bool>> query);
    }
}
