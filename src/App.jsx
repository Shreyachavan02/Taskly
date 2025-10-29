import React from 'react'
import { useState } from 'react';
import axios from 'axios'; 
import { useEffect } from 'react';

import './App.css';
function App() {
const [todos, setTodos] = useState( [] );

const loadTodos = async  () => {
 const response = await axios.get("http://localhost:8080/todos");
 setTodos(response.data.data);
};
useEffect(() => {
  loadTodos();
}, []);

  return (
    <div>
     <h1>ToDo App</h1> 

{todos.map((todoObj) =>{
  const { id, todoItem, emoji, priority, isDone, creactedAt } = todoObj;
  return (
    <div key={id} className="todo-cards">

<span className="todo-priority">{priority}</span>

        <div className="todo-icon">{emoji}</div>
        
       <div className="todo-details"> <h2>{todoItem}</h2>
        </div>
         
          <span className="todo-created-at">{
          creactedAt.replace("T", " ")}
          </span>
   
   
    </div>
  )
})}

 </div>
  );
}
 
 export default App
