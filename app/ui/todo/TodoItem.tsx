'use client';
import { Todo } from '@/app/ctypes';
import { fetchTodos } from '@/app/lib/client/clientTodoUtils';
import { useTodoActions } from '@/app/lib/hooks/useTodoClientActions';
import { useState, useEffect, memo } from 'react';
import Loading from '@/app/ui/todo/loadingIndicator';
import AddTodoForm from '@/app/ui/todo/AddTodoForm';
export const TodoItem = memo(function TodoItem({ 
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

