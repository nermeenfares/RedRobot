"use client"

import { TodoList } from '@/app/ctypes';
import { useCallback, useState } from 'react';
import { apiAddTodo, apiDeleteTodo, apiToggleTodo } from '../client/clientTodoUtils';

export const useTodoActions = (setTodos: React.Dispatch<React.SetStateAction<TodoList>>) => {
  const [isLoading, setIsLoading] = useState(false);

  const addTodo = useCallback(async (text: string) => {
    try {
      setIsLoading(true);
      const updatedTodos = await apiAddTodo(text);
      setTodos(updatedTodos);
      return updatedTodos;
    } finally {
      setIsLoading(false);
    }
  }, [setTodos]);

  const toggleTodo = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const updatedTodos = await apiToggleTodo(id);
      setTodos(updatedTodos);
      return updatedTodos;
    } finally {
      setIsLoading(false);
    }
  }, [setTodos]);

  const deleteTodo = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const updatedTodos = await apiDeleteTodo(id);
      setTodos(updatedTodos);
      return updatedTodos;
    } finally {
      setIsLoading(false);
    }
  }, [setTodos]);

  return { addTodo, toggleTodo, deleteTodo, isLoading };
};