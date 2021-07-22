import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import queryString from "query-string";

import "./App.scss";
import Pagination from "./components/pagination/Pagination";
import PostList from "./components/postList/PostList";
import TodoForm from "./components/todoForm/TodoForm";
import TodoList from "./components/todoList/TodoList";
import SearchForm from "./components/searchForm/SearchForm";
import Clock from "./components/clock/Clock";

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

  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
  });

  useEffect(() => {
    async function fetchPostList() {
      try {
        const query = queryString.stringify(filters);
        const requestURL = `http://js-post-api.herokuapp.com/api/posts?${query}`;
        const response = await fetch(requestURL);
        const responseJSON = await response.json();
        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchPostList();
  }, [filters]);

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

  function onPageChange(newPage) {
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  function onSearchSubmit(searchValue) {
    setFilters({
      ...filters,
      _page: 1,
      title_like: searchValue.value,
    })
  }

  return (
    <div className="App">
      <Clock/>

      {/* <div className="currentPage">
        {filters._page}
      </div>
      <SearchForm onSearchSubmit={onSearchSubmit}/>
      <PostList postList={postList} />
      <Pagination pagination={pagination} onPageChange={onPageChange} /> */}
      {/* <TodoForm onSubmit={handleTodoSubmit} />
      <TodoList list={todoList} deleteItemClick={deleteItemClick} /> */}
    </div>
  );
}

export default App;
