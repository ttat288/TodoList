import { useEffect, useState } from "react";
import { Button, Card, Flex, Image, Input, Text } from "@chakra-ui/react";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [updateTodo, setUpdateTodo] = useState(null);
  const [updateEffect, setUpdateEffect] = useState(0);

  useEffect(() => {
    fetch("https://localhost:7297/api/TodoList")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, [updateEffect]);

  const handleAddTodo = () => {
    // Kiểm tra xem newTodo có giá trị không rỗng
    if (newTodo.trim() !== "") {
      fetch(
        `https://localhost:7297/api/TodoList?content=${encodeURIComponent(
          newTodo
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setTodos([...todos, data]);
          setNewTodo("");
        })
        .catch((error) => console.log(error));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleDeleteTodo = (id) => {
    fetch(`https://localhost:7297/api/TodoList/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.log(error));
  };

  const handleEditTodo = (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    setUpdateTodo(todoToUpdate);
  };

  const handleUpdateTodo = () => {
    fetch(
      `https://localhost:7297/api/TodoList/${
        updateTodo.id
      }?content=${encodeURIComponent(updateTodo.content)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then(() => {
        setUpdateEffect((prev) => prev + 2);
        alert(updateEffect);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setUpdateTodo(null);
        setUpdateEffect((prev) => prev + 1);
      });
  };

  const handleCancelUpdate = () => {
    setUpdateTodo(null);
  };

  return (
    <Flex h="100vh" bg="#f8f8f8" alignItems="center" flexDirection="column">
      <Card paddingBottom="20px" top="100px" alignItems="center" w="70%" h="auto">
      <Text as="b" fontSize="100px">Todo List</Text>
      <Flex w="49%">
        <Input
          variant="flushed"
          w="100%"
          placeholder="what will you do?"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button left="1%" w="100px" onClick={handleAddTodo}>
          Add
        </Button>
      </Flex>

      <Flex paddingTop="20px" w="50%" flexDirection="column" rowGap="20px">
        {todos.map((todo) => (
          <Flex key={todo.id}>
            <Text
              _hover={{
                cursor: "pointer",
                bg:"#DDDDDD"
              }}
              w="100%"
              as="b"
              fontSize="3xl"
              borderRadius="7px"
              transition=".3s"
              paddingLeft="5px"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              {todo.content}
            </Text>
            <Image
            position="absolute"
            right="25%"
              w="10%"
              boxSize="40px"
              objectFit="cover"
              src="../edit.png"
              alt="Edit Icon"
              _hover={{
                cursor: "pointer",
              }}
              onClick={() => handleEditTodo(todo.id)}
            />
          </Flex>
        ))}
      </Flex>

      {updateTodo && (
        <Flex paddingTop="50px" flexDirection="column">
          <Input
            // Hiển thị nội dung todo cần cập nhật trong Input
            value={updateTodo.content}
            onChange={(e) =>
              setUpdateTodo({ ...updateTodo, content: e.target.value })
            }
          />
          <Flex>
          <Button colorScheme='blue' w="200px" onClick={handleUpdateTodo}>Update</Button>
          <Button colorScheme='red' w="200px" onClick={handleCancelUpdate}>Cancel</Button>
          </Flex>
        </Flex>
      )}
      </Card>
    </Flex>
  );
}

export default App;
