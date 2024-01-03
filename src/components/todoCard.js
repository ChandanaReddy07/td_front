// TaskCard.js
import axios from "axios";
import React, { useState } from "react";
import { isAuthenticated } from "../helper/user";

const TaskCard = ({ todo, selectedTask }) => {
  const [expanded, setExpanded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(todo.name);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const { x1, setX1 } = props.xState1;
  const { x, setX } = props.xState2;
  const { user, token } = isAuthenticated();

  const toggleExpand = () => {
    setExpanded(!expanded);
    setEditMode(false); // Collapse the card when toggling expand/collapse
  };

  const toggleEditMode = (e) => {
    e.stopPropagation(); // Prevent event bubbling to the parent div
    setEditMode(!editMode);
  };
  const handleDelete = async (e) => {
    e.stopPropagation(); // Prevent event bubbling to the parent div
    try {
      const response = await axios.delete(
        `https://todo-backend-nkpr.onrender.com/todo/${todo._id}/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setX(!x)
      } else {
        // Handle error if the API request fails
        console.error("Failed to update task:", response.statusText);
     
      }
    } catch (error) {
      console.error("Error updating task:", error.message);
      
    }
  };
  const handleEdit = async () => {
    try {
      const response = await axios.put(
        `https://todo-backend-nkpr.onrender.com/todo/${todo._id}/${user._id}`,
        {
          name: editedName,
          description: editedDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // If the update is successful, exit edit mode
        setEditMode(false);
        // window.location.href = "/";
        setX1(!x1)
      } else {
        // Handle error if the API request fails
        console.error("Failed to update task:", response.statusText);
       
      }
    } catch (error) {
      console.error("Error updating task:", error.message);
      // Handle network errors or other exceptions here
    }
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value);
  };

  return (
    <div
      className={`todo-card ${expanded ? "expanded" : ""}`}
      onClick={toggleExpand}
    >
      {editMode ? (
        <div>
          <p>Name:</p>
          <input
            type="text"
            value={editedName}
            onChange={handleNameChange}
            onClick={(e) => e.stopPropagation()} // Prevent toggle on input click
          />
          <p>Description:</p>
          <input
            type="text"
            value={editedDescription}
            onChange={handleDescriptionChange}
            onClick={(e) => e.stopPropagation()} // Prevent toggle on textarea click
          />
          <div className="buttons">
            <button onClick={handleEdit}>Save</button>
          </div>
        </div>
      ) : (
        <div>
          <div className="navbar">
            <h3>{todo.name}</h3>
            <button
              onClick={handleDelete}
              className="login-button"
              style={{ backgroundColor: "red", width: "40%" }}
            >
              DELETE
            </button>
          </div>

          {expanded && (
            <div>
              <div style={{ padding: "10px", display: "flex" }}>
                <b>Description:</b> &nbsp; {todo.description}
              </div>
              <div className="buttons">
                <button onClick={toggleEditMode}>Edit</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
