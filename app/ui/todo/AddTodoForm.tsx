// app/ui/todo/AddTodoForm.tsx
'use client';
import { useState, memo } from 'react';
import Loading from '@/app/ui/todo/loadingIndicator';

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
      />
      <button
        type="submit"
        disabled={!text.trim() || isSubmitting}
        className={`px-4 py-2 rounded-r-lg transition-colors ${
          !text.trim() ? 'bg-gray-400 cursor-not-allowed' : 
          isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
        } text-white flex items-center justify-center min-w-[80px]`}
        aria-label="Add todo"
      >
        {isSubmitting ? <Loading size="sm" /> : 'Add'}
      </button>
    </form>
  );
});

export default AddTodoForm;