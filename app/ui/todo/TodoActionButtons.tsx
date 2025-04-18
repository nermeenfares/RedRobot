"use client"

import { TrashCan } from "@/app/todo/_components/TrashIcon"
import { Spinner } from "@/app/ui/loading"
import { useFormStatus } from "react-dom"

export function AddButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-4 py-2 rounded-r-lg transition-colors ${
        pending ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
      } text-white flex items-center justify-center min-w-[80px]`}
    >
      {pending ? <Spinner size="sm" /> : "Add"}
    </button>
  )
}

export function ToggleButton({
  completed,
  text,
}: {
  completed: boolean
  text: string
}) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center relative"
      aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
    >
      {pending ? (
        <span className="absolute -ml-1">
          <Spinner size="sm" />
        </span>
      ) : (
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={completed}
            onClick={(e) => e.currentTarget.form?.requestSubmit()}
            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span
            className={`${
              completed ? "line-through text-gray-400" : "text-gray-700"
            }`}
          >
            {text}
          </span>
        </div>
      )}
    </button>
  )
}

export function DeleteButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="text-red-500 hover:text-red-700 relative p-1 rounded-full"
      aria-label="Delete todo"
    >
      {pending ? <Spinner size="sm" /> : <TrashCan />}
    </button>
  )
}
