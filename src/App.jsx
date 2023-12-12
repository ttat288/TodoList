import { useEffect, useState } from "react";
import { Button, Flex, Input, Text } from "@chakra-ui/react";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetch('https://localhost:7297/api/TodoList')
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleAddTodo = () => {
    // Kiểm tra xem newTodo có giá trị không rỗng
    if (newTodo.trim() !== '') {
      fetch(`https://localhost:7297/api/TodoList?content=${encodeURIComponent(newTodo)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((data) => {
        setTodos([...todos, data]);
        setNewTodo('');
      })
      .catch((error) => console.log(error));
    }
  };
  

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleDeleteTodo = (id) => {
    fetch(`https://localhost:7297/api/TodoList/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Text fontSize="100px">Todo List</Text>
      <Input
        placeholder='what would you do?'
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleAddTodo}>Add</Button>
      <Flex flexDirection="column" rowGap="10px">
        {todos.map(todo => (
          <Flex key={todo.id}>
            <Text onClick={() => handleDeleteTodo(todo.id)}>{todo.content}</Text>
          </Flex>
        ))}
      </Flex>
    </>
  );
}

export default App;
