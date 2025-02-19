/***
v1: CRUD operations, create, read, update, delete
- create and read has completed in v0
- delete and update

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

function Todo1() {
  const [todos, setTodos] = useState(mockTodo);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState(null);

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

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditText(item.text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      setTodos((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, text: editText.trim() } : item
        )
      );
      setEditingId(null);
      setEditText(null);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText(null);
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
        <button
          type="submit"
          className="border rounded-sm px-1 bg-blue-100 cursor-pointer"
        >
          Add
        </button>
      </form>
      <ul className="space-y-4">
        {todos.map((item) => (
          <li key={item.id} className="flex gap-2">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleTodo(item.id)}
            />
            {editingId === item.id ? (
              <div className="flex gap-1">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                />
                <button
                  className="border rounded-sm px-1 bg-gray-100 cursor-pointer"
                  onClick={saveEdit}
                >
                  Save
                </button>
                <button
                  className="border rounded-sm px-1 bg-gray-100 cursor-pointer"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span>{item.text}</span>
                <button
                  className="border rounded-sm px-1 bg-gray-100 cursor-pointer"
                  onClick={() => startEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="border rounded-sm px-1 bg-gray-100 cursor-pointer"
                  onClick={() => deleteTodo(item.id)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo1;
