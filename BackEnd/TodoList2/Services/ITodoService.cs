using System.Collections.Generic;
using WebAppAPI.Models;

namespace WebAppAPI.Services
{
    public interface ITodoService
    {
        List<todo> Get();
        todo GetById(string id);
        todo Create(string content);
        void Update(string id, string content);
        void Remove(string id);

    }
}
