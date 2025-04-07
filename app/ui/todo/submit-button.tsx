// app/components/submit-button.tsx
'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`px-4 py-2 rounded ${pending ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
    >
      {pending ? 'Processing...' : children}
    </button>
  );
}