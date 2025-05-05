"use client"
import { useState } from "react"
import { TodoItem } from "./TodoItem"
import type { Todo } from "@/app/ctypes"

type TodoItemProps = {
  todo: Todo
  isBusy?: boolean
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItemWrapper({
  todo,
  isBusy: parentIsBusy = false,
  onToggle: parentOnToggle,
  onDelete: parentOnDelete,
}: TodoItemProps) {
  const [isPending, setIsPending] = useState(false)
  const combinedIsBusy = parentIsBusy || isPending

  const handleToggle = async () => {
    if (combinedIsBusy) return
    setIsPending(true)
    try {
      await parentOnToggle(todo.id)
    } finally {
      setIsPending(false)
    }
  }

  const handleDelete = async () => {
    if (combinedIsBusy) return
    setIsPending(true)
    try {
      await parentOnDelete(todo.id)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <TodoItem
      todo={todo}
      isBusy={combinedIsBusy}
      onToggle={handleToggle}
      onDelete={handleDelete}
    />
  )
}