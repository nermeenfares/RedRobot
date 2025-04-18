"use client"
import { Todo } from "@/app/ctypes"
import { memo } from "react"
import { Spinner } from "@/app/ui/loading"
import { TrashCan } from "@/app/todo/_components/TrashIcon"

export const TodoItem = memo(function TodoItem({
  todo,
  isBusy,
  onToggle,
  onDelete,
}: {
  todo: Todo
  isBusy: boolean
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}) {
  return (
    <li
      className={`${
        isBusy && "pointer-events-none opacity-60"
      } relative flex items-center justify-between p-3 border rounded-lg mb-2 transition-colors hover:bg-gray-50`}
    >
      {isBusy && (
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        </div>
      )}
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span
          className={`${
            todo.completed ? "line-through text-gray-400" : "text-gray-700"
          }`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className={`p-1 rounded-full transition-colors ${"text-red-500 hover:text-red-700 hover:bg-red-50"}`}
      >
        <TrashCan />
      </button>
    </li>
  )
})
