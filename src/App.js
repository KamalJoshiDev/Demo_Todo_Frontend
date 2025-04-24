import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get(process.env.REACT_APP_API_URL);
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (text.trim() === "") return;
    await axios.post(process.env.REACT_APP_API_URL, { text });
    setText("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/${id}`);
    fetchTodos();
  };

  const toggleTodo = async (todo) => {
    await axios.put(`${process.env.REACT_APP_API_URL}/${todo._id}`, {
      ...todo,
      completed: !todo.completed,
    });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>Todo App</h2>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.text}
            <button onClick={() => toggleTodo(todo)}>Toggle</button>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
