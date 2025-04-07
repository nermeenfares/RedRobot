'use client';

import type { Todo } from '@/types';

export const todoUtils = {
  loadFromLocalStorage: (): Todo[] => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  },

  saveToLocalStorage: (todos: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  },

  addTodo: (todos: Todo[], text: string): Todo[] => {
    if (!text.trim()) return todos;
    return [...todos, {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    }];
  },

  toggleTodo: (todos: Todo[], id: string): Todo[] => (
    todos.map(t => t.id === id ? {...t, completed: !t.completed} : t)
  ),

  deleteTodo: (todos: Todo[], id: string): Todo[] => (
    todos.filter(t => t.id !== id)
  )
};