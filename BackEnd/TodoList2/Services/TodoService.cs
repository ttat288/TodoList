using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Xml.Linq;
using WebAppAPI.Models;

namespace WebAppAPI.Services
{
    public class TodoService : ITodoService
    {
        private readonly IMongoCollection<todo> _Todo;

        public TodoService(ICommentStoreDatabaseSettings settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _Todo = database.GetCollection<todo>(settings.CommentCollectionName);
        }
        public todo Create(string content)
        {
            todo td = new todo();
            td.Id = ObjectId.GenerateNewId().ToString();
            td.Content = content;
            _Todo.InsertOne(td);
            return td;
        }

        public List<todo> Get()
        {
            return _Todo.Find(td => true).ToList();
        }


        public todo GetById(string id)
        {
            return _Todo.Find(todo => todo.Id == id).SingleOrDefault();
        }

        public void Remove(string id)
        {
            _Todo.DeleteOne(todo => todo.Id == id);
        }

        public void Update(string id, string content)
        {
            todo td = new todo();
            td.Id = id;
            td.Content = content;
            _Todo.ReplaceOne(todo => todo.Id == id, td);
        }
    }
}
