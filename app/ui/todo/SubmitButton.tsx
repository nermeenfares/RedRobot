// 'use client';

// import { useFormStatus, useFormState } from 'react-dom';
// import { handleAdd } from '@/app/lib/server/todoActions';

// export function SubmitButton() {
//   const { pending } = useFormStatus();
  
//   return (
//     <button
//       type="submit"
//       disabled={pending}
//       className={`bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 ${
//         pending ? 'opacity-50' : ''
//       }`}
//     >
//       {pending ? 'Adding...' : 'Add'}
//     </button>
//   );
// }

// export function AddTodoForm() {
//   const [state, formAction] = useFormState(handleAdd, null);

//   return (
//     <form action={formAction} className="mb-4">
//       <div className="flex">
//         <input
//           type="text"
//           name="text"
//           placeholder="Add new todo"
//           className="flex-1 p-2 border rounded-l"
//           required
//         />
//         <SubmitButton />
//       </div>
//       {state?.message && (
//         <p className="mt-2 text-sm text-green-600">{state.message}</p>
//       )}
//     </form>
//   );
// }