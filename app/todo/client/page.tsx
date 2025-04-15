'use client';
import { Todo } from '@/app/ctypes';
import { fetchTodos } from '@/app/lib/client/client-todo-utils';
import { useTodoActions } from '@/app/lib/hooks/useTodoClientActions';
import { useState, useEffect, memo } from 'react';

const TodoItem = memo(function TodoItem({ 
  todo, 
  onToggle, 
  onDelete 
}: {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo._id)}>Delete</button>
    </div>
  );
});

const AddTodoForm = memo(function AddTodoForm({ 
  onSubmit 
}: {
  onSubmit: (text: string) => void;
}) {
  const [text, setText] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
});

export default function TodoListComponent() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const { addTodo, toggleTodo, deleteTodo } = useTodoActions(setTodos);

  useEffect(() => {
    const load = async () => {
      const todos = await fetchTodos();
      setTodos(todos);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {todos.map(todo => (
        <TodoItem 
          key={todo._id} 
          todo={todo} 
          onToggle={toggleTodo} 
          onDelete={deleteTodo} 
        />
      ))}
      <AddTodoForm onSubmit={addTodo} />
    </div>
  );
}