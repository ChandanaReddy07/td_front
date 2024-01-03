// TodoList.js
import React, { useState, useEffect } from "react";
import TodoForm from "./todoForm";
import TaskCard from "./todoCard";
import { isAuthenticated } from "../helper/user";
import axios from "axios";
import MainPage from "./mainpage";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [x, setX] = useState(false);
  const [x1, setX1] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { user, token } = isAuthenticated();

  useEffect(() => {
    fetchTodos();
  }, [todos, x, x1]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `https://todo-backend-nkpr.onrender.com/todos/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data)

      if (response.data) {
        setTodos(response.data); // Assuming response.data is an array of todos
      }
    } catch (error) {}
  };

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const showTaskDetails = (task) => {
    setSelectedTask(task);
  };

  return (
    <MainPage>
      {" "}
      <div className="mainpage">
        <h1>Add New Task</h1>
        <TodoForm addTodo={addTodo} />
        <div
          className="todo-cards"
          style={{ width: "100%", background: "white" }}
        >
          {todos.map((todo, index) => (
            <TaskCard
              key={index}
              todo={todo}
              xState1={{ x1, setX1 }}
              xState2={{ x, setX }}
              showDetails={showTaskDetails}
            />
          ))}
        </div>
      </div>
    </MainPage>
  );
};

export default TodoList;
