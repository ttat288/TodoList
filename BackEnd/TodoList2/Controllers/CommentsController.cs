using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAppAPI.Models;
using WebAppAPI.Services;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoListController : ControllerBase
    {
        private readonly ITodoService todoService;
        public TodoListController(ITodoService todoService)
        {
            this.todoService = todoService;
        }

        [HttpGet]
        public ActionResult<List<todo>> Get()
        {
            return todoService.Get();
        }


        [HttpPost]
        public ActionResult<todo> Create(string content)
        {
            todo td = todoService.Create(content);

            return CreatedAtAction(nameof(Get), new { id = td.Id }, td);
        }


        [HttpPut("{id}")]
        public ActionResult Update(string id, string content)
        {
            var existTodo = todoService.GetById(id);
            if (existTodo == null)
            {
                return NotFound($"todo with ID = {id} not found");
            }
            todoService.Update(id, content);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult Remove(string id)
        {
            var existTodo = todoService.GetById(id);
            if (existTodo == null)
            {
                return NotFound($"todo with ID = {id} not found");
            }
            todoService.Remove(id);
            return Ok($"todo with ID = {id} deleted");
        }
    }
}
