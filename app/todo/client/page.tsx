'use client';
import { Todo } from '@/app/ctypes';
import { fetchTodos } from '@/app/lib/client/client-todo-utils';
import { useTodoActions } from '@/app/lib/hooks/useTodoClientActions';
import { useState, useEffect, memo } from 'react';
import Loading from '@/app/ui/todo/loadingIndicator';

const TodoItem = memo(function TodoItem({ 
  todo, 
  onToggle, 
  onDelete,
  isProcessing 
}: {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isProcessing: boolean;
}) {
  return (
    <li className={`flex items-center justify-between p-3 border rounded-lg mb-2 transition-colors ${isProcessing ? 'opacity-50' : 'hover:bg-gray-50'}`}>
      <div className="flex items-center space-x-3">
        {isProcessing ? (
          <div className="h-5 w-5 flex items-center justify-center">
            <Loading size="sm" />
          </div>
        ) : (
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo._id)}
            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        )}
        <span className={`${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo._id)}
        disabled={isProcessing}
        className={`p-1 rounded-full transition-colors ${isProcessing ? 'text-gray-400' : 'text-red-500 hover:text-red-700 hover:bg-red-50'}`}
      >
        {isProcessing ? (
          <Loading size="sm" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        )}
      </button>
    </li>
  );
});

const AddTodoForm = memo(function AddTodoForm({ 
  onSubmit,
  isSubmitting 
}: {
  onSubmit: (text: string) => void;
  isSubmitting: boolean;
}) {
  const [text, setText] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isSubmitting) {
      onSubmit(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add new todo..."
        disabled={isSubmitting}
        className={`flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isSubmitting ? 'bg-gray-100' : ''}`}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className={`px-4 py-2 rounded-r-lg transition-colors ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white flex items-center justify-center min-w-[80px]`}
      >
        {isSubmitting ? <Loading size="sm" /> : 'Add'}
      </button>
    </form>
  );
});

export default function TodoListComponent() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const { addTodo, toggleTodo, deleteTodo } = useTodoActions(setTodos);

  const handleAdd = async (text: string) => {
    setIsAdding(true);
    try {
      await addTodo(text);
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggle = async (id: string) => {
    setProcessingIds(prev => [...prev, id]);
    try {
      await toggleTodo(id);
    } finally {
      setProcessingIds(prev => prev.filter(pid => pid !== id));
    }
  };

  const handleDelete = async (id: string) => {
    setProcessingIds(prev => [...prev, id]);
    try {
      await deleteTodo(id);
    } finally {
      setProcessingIds(prev => prev.filter(pid => pid !== id));
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const todos = await fetchTodos();
        setTodos(todos);
      } catch (error) {
        console.error('Failed to load todos:', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-4 flex justify-center">
        <Loading size="md" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Todo App</h1>
      
      <AddTodoForm onSubmit={handleAdd} isSubmitting={isAdding} />
      
      <ul className="space-y-2">
        {todos.map(todo => (
          <TodoItem 
            key={todo._id} 
            todo={todo} 
            onToggle={handleToggle} 
            onDelete={handleDelete}
            isProcessing={processingIds.includes(todo._id)}
          />
        ))}
      </ul>

      {todos.length === 0 && !loading && (
        <p className="text-gray-500 text-center py-8">
          No todos yet. Add one above!
        </p>
      )}
    </div>
  );
}