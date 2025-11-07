import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoItem, setTodoItem] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [emoji, setEmoji] = useState("🙂");

  const BASE_URL = "http://localhost:8080";


  const loadTodos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/todos`);
      setTodos(response.data.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);


  const addTodo = async (e) => {
    e.preventDefault();
    if (!todoItem.trim()) return alert("Please enter a task!");

    try {
      const response = await axios.post(`${BASE_URL}/todos`, {
        todoItem,
        priority,
        emoji,
      });
      alert(response.data.message);
      setTodoItem("");
      setPriority("Medium");
      setEmoji("🙂");
      loadTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };


  const deleteTodo = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`${BASE_URL}/todos/${id}`);
        loadTodos();
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    }
  };


  const toggleDone = async (id, isDone) => {
    try {
      await axios.patch(`${BASE_URL}/todos/${id}/status`, { isDone: !isDone });
      loadTodos();
    } catch (error) {
      console.error("Error updating todo status:", error);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <h1>📝 ToDo App</h1>

        <form className="add-task-form" onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Enter your task..."
            value={todoItem}
            onChange={(e) => setTodoItem(e.target.value)}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High 🔥</option>
            <option value="Medium">Medium ⚡</option>
            <option value="Low">Low 🌿</option>
          </select>

          <input
            type="text"
            placeholder="Emoji (e.g. 😄)"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            maxLength="2"
          />

          <button type="submit">Add Task</button>
        </form>
      </div>

      
      <div className="todo-section">
        {todos.map(({ id, todoItem, emoji, priority, isDone, createdAt }) => (
          <div key={id} className="todo-cards">
            <span className={`todo-priority ${priority}`}>{priority}</span>

            <div className="todo-icon">{emoji}</div>

            <div className={`todo-details ${isDone ? "todo-done" : ""}`}>
              <h2>{todoItem}</h2>
            </div>

            <span className="todo-created-at">
              {createdAt ? createdAt.replace("T", " ").slice(0, 16) : ""}
            </span>

            <div className="todo-actions">
              <button onClick={() => toggleDone(id, isDone)}>
                {isDone ? "✅ Undo" : "✔ Mark Done"}
              </button>
              <button className="delete-btn" onClick={() => deleteTodo(id)}>
               🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
