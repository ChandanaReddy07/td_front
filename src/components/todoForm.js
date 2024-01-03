import React, { useState } from "react";
import { isAuthenticated } from "../helper/user";
import axios from "axios";
import "./style.css";

const TodoForm = () => {
  const [name, setTodoName] = useState("");
  const [description, setDescription] = useState("");
  const { user, token } = isAuthenticated();

  const [showLoginOverlay, setShowLoginOverlay] = useState(false);

  const handleTodoNameChange = (e) => {
    setTodoName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description) return; // Prevent adding empty todo
    if (user) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        };

        const response = await axios.post(
          `https://todo-backend-nkpr.onrender.com/todo/create/${user._id}`,
          {
            name: name,
            description: description,
          },
          config
        );

        if (response.status === 200) {
          // Clear input fields

          // window.location.href = "/";

          setTodoName("");
          setDescription("");
        } else {
          // Handle error if the API request fails
          console.error("Failed to create todo:", response.statusText);
          // You can display an error message or take other actions here
        }
      } catch (error) {
        console.error("Error creating todo:", error.message);
        // Handle network errors or other exceptions here
      }
    } else {
      // If the user is not signed in, show the Login overlay
      setShowLoginOverlay(true);
    }
  };
  const handleCloseLoginOverlay = () => {
    setShowLoginOverlay(false);
  };

  return (
    <div>
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
      {showLoginOverlay && (
        <div className="login-overlay">
          <div className="login-card" role="document">
            <div className="login-header">
              Login Required
              <button
                type="button"
                className="close"
                onClick={handleCloseLoginOverlay}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="login-form">
              <p>You must be signed in to place an order.</p>
            </div>
            <div className="login-footer">
              <button
                type="button"
                className="login-button"
                onClick={handleCloseLoginOverlay}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoForm;
