import { TodoList } from '@/app/ctypes';
import { useCallback } from 'react';
import { apiAddTodo, apiDeleteTodo, apiToggleTodo } from '../client/clientTodoUtils';

export const useTodoActions = (setTodos: React.Dispatch<React.SetStateAction<TodoList>>) => {
  const addTodo = useCallback(async (text: string) => {
    const updatedTodos = await apiAddTodo(text);
    setTodos(updatedTodos);
  }, [setTodos]);

  const toggleTodo = useCallback(async (id: string) => {
    const updatedTodos = await apiToggleTodo(id);
    setTodos(updatedTodos);
  }, [setTodos]);

  const deleteTodo = useCallback(async (id: string) => {
    const updatedTodos = await apiDeleteTodo(id);
    setTodos(updatedTodos);
  }, [setTodos]);

  return { addTodo, toggleTodo, deleteTodo };
};