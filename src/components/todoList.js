// TodoList.js
import React, { useState, useEffect } from "react";
import TodoForm from "./todoForm";
import TaskCard from "./todoCard";
import { isAuthenticated } from "../helper/user";
import axios from "axios";
import MainPage from "./mainpage";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const { user, token } = isAuthenticated();
  useEffect(() => {
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
      } catch (error) {
        // console.error('Error fetching todos:', error.message);
        // Handle errors if any during API call
      }
    };

    fetchTodos();
  }, []);

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
            <TaskCard key={index} todo={todo} showDetails={showTaskDetails} />
          ))}
        </div>
      </div>
    </MainPage>
  );
};

export default TodoList;
