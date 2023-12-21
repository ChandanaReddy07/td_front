// TaskCard.js
import axios from 'axios';
import React, { useState } from 'react';
import { isAuthenticated } from '../helper/user';

const TaskCard = ({ todo,selectedTask }) => {
  const [expanded, setExpanded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(todo.name);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const { user, token } = isAuthenticated();


  const toggleExpand = () => {
    setExpanded(!expanded);
    setEditMode(false); // Collapse the card when toggling expand/collapse
  };

  const toggleEditMode = (e) => {
    e.stopPropagation(); // Prevent event bubbling to the parent div
    setEditMode(!editMode);
  };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8081/todo/${todo._id}/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
       
        window.location.href = "/";
  
       
      } else {
        // Handle error if the API request fails
        console.error('Failed to update task:', response.statusText);
        // You can display an error message or take other actions here
      }
    } catch (error) {
      console.error('Error updating task:', error.message);
      // Handle network errors or other exceptions here
    }
  };
  const handleEdit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8081/todo/${todo._id}/${user._id}`,
        {
          name: editedName,
          description: editedDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        // If the update is successful, exit edit mode
        setEditMode(false);
        window.location.href = "/";
  
       
      } else {
        // Handle error if the API request fails
        console.error('Failed to update task:', response.statusText);
        // You can display an error message or take other actions here
      }
    } catch (error) {
      console.error('Error updating task:', error.message);
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
    <div className={`todo-card ${expanded ? 'expanded' : ''}`} onClick={toggleExpand}>
      {editMode ? (
        <div>
          <input
            type="text"
            value={editedName}
            onChange={handleNameChange}
            onClick={(e) => e.stopPropagation()} // Prevent toggle on input click
          />
          <textarea
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
          <h3>{todo.name}</h3>
          {expanded && (
            <div>
              <p>{todo.description}</p>
              <div className="buttons">
                <button onClick={toggleEditMode}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
