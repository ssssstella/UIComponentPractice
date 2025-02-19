/***
basic structure v0:
- display todo item
- create new todo
- toggle completion -> checkbox

3 elements and 2 states, one input and one submit button, one todo list
***/

import { useState } from 'react';

const mockTodo = [
  {
    id: 1,
    text: 'learn react hooks',
    completed: true,
    createdAt: '2024-02-13T09:00:00.000Z',
  },
  {
    id: 2,
    text: 'build todo list component',
    completed: false,
    createdAt: '2024-02-13T10:00:00.000Z',
  },
  {
    id: 3,
    text: 'practice bq interview questions',
    completed: false,
    createdAt: '2024-02-13T11:00:00.000Z',
  },
];

function Todo0() {
  const [todos, setTodos] = useState(mockTodo);
  const [newTodo, setNewTodo] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos((prev) => {
        const newItem = {
          id: Date.now(),
          text: newTodo.trim(),
          completed: false,
          createdAt: new Date().toISOString(),
        };
        return [newItem, ...prev];
      });
      setNewTodo('');
    }
  }

  const toggleTodo = (id) => {
    setTodos((prev) => {
      return prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
    });
  };

  return (
    <div className="w-full max-w-lg flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold text-center">Todo List</h1>
      <form className="flex gap-4" onSubmit={handleSubmit}>
        <input
          className="w-60 border"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New todo..."
        />
        <button type="submit" className="border rounded-sm px-1 bg-blue-100">
          Add
        </button>
      </form>
      <ul>
        {todos.map((item) => (
          <li key={item.id} className="flex gap-2">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleTodo(item.id)}
            />
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo0;
