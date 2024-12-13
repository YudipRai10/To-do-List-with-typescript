import { useEffect, useRef, useState } from "react";
import todo_icon from "../asset/todo_icon.png";
import TodoList from "./TodoList";

interface NewTodoProps {
  id: number;
  text: string;
  isComplete: boolean;
}
function Todo() {
  const [todoList, setTodoList] = useState<NewTodoProps[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddList = () => {
    const inputText = inputRef.current?.value.trim();
    if (!inputText) return;

    const newTodo: NewTodoProps = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prevTodo) => [...prevTodo, newTodo]);

    if (inputRef.current) {
      return (inputRef.current.value = "");
    }
  };

  const handleDelete = (id: number) => {
    setTodoList((prevTodo) => {
      return prevTodo.filter((todo) => todo.id !== id);
    });
  };

  const handleToggle = (id: number) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todoItem) => {
        if (todoItem.id === id) {
          return { ...todoItem, isComplete: !todoItem.isComplete };
        }
        return todoItem;
      });
    });
  };

  const handleEdit = (id: number, newText: string) => {
    setTodoList((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddList(); // Trigger the add function on Enter key press
    }
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="container">
      <div className="header">
        <img src={todo_icon} alt="to-do-icon" />
        <h1>To-do List</h1>
      </div>

      {/* Input */}
      <div className="input-container">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add your task"
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAddList}>ADD +</button>
      </div>

      {/* Todo List */}
      <div>
        {todoList.map((item) => {
          return (
            <TodoList
              key={item.id}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              handleDelete={handleDelete}
              handleToggle={handleToggle}
              handleEdit={handleEdit}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Todo;
