'use client';

import { Todo } from '@/types';
import { useEffect, useState } from 'react';

const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function ClientTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true); 
  

  useEffect(() => {
    const loadTodos = async () => {
      await simulateDelay(1000);
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
      setLoading(false);
    };
    
    loadTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = async () => {
    if (inputValue.trim()) {
      setLoading(true);
      await simulateDelay(500); 
      
      const newTodo = {
        id: Date.now().toString(),
        text: inputValue,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      
      setTodos(prev => [...prev, newTodo]);
      setInputValue('');
      setLoading(false);
    }
  };

  const handleToggle = async (id: string) => {
    setLoading(true);
    await simulateDelay(300);
    setTodos(prev => prev.map(t => t.id === id ? {...t, completed: !t.completed} : t));
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    await simulateDelay(300); 
    setTodos(prev => prev.filter(t => t.id !== id));
    setLoading(false);
  };

  // if (loading) {
  //   return (
  //     <div className="max-w-md mx-auto p-4">
  //       <Loading size="md" />
  //     </div>
  //   );
  // }
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Client Todo App</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add new todo"
          className="flex-1 p-2 border rounded-l"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          disabled={loading}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center justify-between p-2 border rounded">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
                className="mr-2 h-4 w-4"
                disabled={loading}
              />
              <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => handleDelete(todo.id)}
              className="text-red-500 hover:text-red-700 disabled:text-gray-400"
              disabled={loading}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && !loading && (
        <p className="text-gray-500 text-center mt-4">No todos yet. Add one above!</p>
      )}
    </div>
  );
}