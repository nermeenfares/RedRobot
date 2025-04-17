"use client";
import { TodoList } from "@/app/ctypes";
import { fetchTodos } from "@/app/lib/client/clientTodoUtils";
import { useTodoActions } from "@/app/lib/hooks/useTodoClientActions";
import AddTodoForm from "@/app/ui/todo/AddTodoForm";
import Loading from "@/app/ui/todo/loadingIndicator";
import { TodoItem } from "@/app/ui/todo/TodoItem";
import { useEffect, useState } from "react";

export default function TodoListComponent() {
  const [todos, setTodos] = useState<TodoList>([]);
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
    setProcessingIds((prev) => [...prev, id]);
    try {
      await toggleTodo(id);
    } finally {
      setProcessingIds((prev) => prev.filter((pid) => pid !== id));
    }
  };

  const handleDelete = async (id: string) => {
    setProcessingIds((prev) => [...prev, id]);
    try {
      await deleteTodo(id);
    } finally {
      setProcessingIds((prev) => prev.filter((pid) => pid !== id));
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const todos = await fetchTodos();
        setTodos(todos);
      } catch (error) {
        console.error("Failed to load todos:", error);
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
        {todos.map((todo) => (
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
