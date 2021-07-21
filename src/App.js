import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.scss";
import PostList from "./components/postList/PostList";
import TodoForm from "./components/todoForm/TodoForm";
import TodoList from "./components/todoList/TodoList";

function App() {
  const list = localStorage["todoList"];

  const [todoList, setTodoList] = useState(() => {
    if (JSON.parse(list).length > 0) return JSON.parse(list);
    return [
      { id: 1, title: "I love Easy Frontend! 😍 " },
      { id: 2, title: "We love Easy Frontend! 🥰 " },
      { id: 3, title: "They love Easy Frontend! 🚀 " },
    ];
  });

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    
    async function fetchPostList() {
      try {
        const requestURL = 'http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1';
        const response = await fetch(requestURL);
        const responseJSON = await response.json();
        const {data} = responseJSON;
        setPostList(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchPostList();
  }, [])

  function deleteItemClick(item) {
    const newTodoList = [...todoList];
    if (todoList.findIndex((x) => x.id === item.id) >= 0) {
      newTodoList.splice(item, 1);
      setTodoList(newTodoList);
      localStorage["todoList"] = JSON.stringify(newTodoList);
    }
  }

  function handleTodoSubmit(formValue) {
    const newTodoItem = {
      id: uuidv4(),
      title: formValue.title,
    };

    if (formValue.title.trim() !== "") {
      const newTodoList = [newTodoItem, ...todoList];
      setTodoList(newTodoList);

      localStorage["todoList"] = JSON.stringify(newTodoList);
    }
  }

  return (
    <div className="App">
      <PostList postList={postList}/>
      {/* <TodoForm onSubmit={handleTodoSubmit} />
      <TodoList list={todoList} deleteItemClick={deleteItemClick} /> */}
    </div>
  );
}

export default App;
