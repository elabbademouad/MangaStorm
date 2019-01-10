using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure
{
    interface IRepository<T,K>
    {
        List<T> GetAll();
        T GetById(K id);
        T Create(T entity);
        T Update(T entity);
        bool Delete(T entity);
        bool Delete(K id);
        List<T> Query(Func<T,bool> query);
    }
}
