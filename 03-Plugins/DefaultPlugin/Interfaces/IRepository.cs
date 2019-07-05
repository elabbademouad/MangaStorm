using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Application.Interfaces;

namespace DefaultPlugin.Interfaces
{
    public interface IRepository<T, K> where T : IBaseEntity
    {
        List<T> GetAll();
        T GetById(K id);
        void Create(T entity);
        void Create(IEnumerable<T> entities);
        void Update(T entity);
        bool Delete(T entity);
        bool Delete(K id);
        List<T> Query(Expression<Func<T, bool>> query);
        long Count(Expression<Func<T, bool>> filter);
    }
}
