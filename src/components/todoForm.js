import React, { useState } from 'react';
import { isAuthenticated } from '../helper/user';
import axios from 'axios';


const TodoForm = () => {
  const [name, setTodoName] = useState('');
  const [description, setDescription] = useState('');
  const { user, token } = isAuthenticated();


  const handleTodoNameChange = (e) => {
    setTodoName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  if (!name || !description) return; // Prevent adding empty todo

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };

    const response = await axios.post(`https://todo-backend-nkpr.onrender.com//todo/create/${user._id}`, {
      name: name,
      description: description,
    }, config);

    if (response.status === 200) {
     

      // Clear input fields
      setTodoName('');
      setDescription('');
    } else {
      // Handle error if the API request fails
      console.error('Failed to create todo:', response.statusText);
      // You can display an error message or take other actions here
    }
  } catch (error) {
    console.error('Error creating todo:', error.message);
    // Handle network errors or other exceptions here
  }
};


  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          placeholder="Todo Name"
          value={name}
          onChange={handleTodoNameChange}
          className="input-field"
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
          className="input-field"
        />
      </div>
      <button type="submit" className="add-button">
        Add
      </button>
    </form>
  );
};

export default TodoForm;
