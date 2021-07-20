import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import "./App.scss";
import TodoForm from "./components/todoForm/TodoForm";
import TodoList from "./components/todoList/TodoList";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "I love Easy Frontend! 😍 " },
    { id: 2, title: "We love Easy Frontend! 🥰 " },
    { id: 3, title: "They love Easy Frontend! 🚀 " },
  ]);

  function deleteItemClick(item) {
    const newTodoList = [...todoList];
    if (todoList.findIndex((x) => x.id === item.id) >= 0) {
      newTodoList.splice(item, 1);
      setTodoList(newTodoList);
    }
  }

  function handleTodoSubmit(formValue) {
    const newTodoItem = {
      id: uuidv4(),
      title: formValue.title,
    };

    if (formValue.title.trim() !== '') {
      const newTodoList = [
        newTodoItem,
        ...todoList,
      ]
      setTodoList(newTodoList);

    }

  }

  return (
    <div className="App">
      <TodoForm onSubmit={handleTodoSubmit}/>
      <TodoList list={todoList} deleteItemClick={deleteItemClick} />
    </div>
  );
}

export default App;
