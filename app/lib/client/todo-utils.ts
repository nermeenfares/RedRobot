// lib/todoLocalStorageUtils.ts
import { Todo } from "@/app/ctypes"
import { SHORT_DURATION } from "@/app/lib/constants"
import { createTodo, delay } from "@/app/lib/todoObjectHelper"

export const loadTodos = async (): Promise<Todo[]> => {
  await delay(SHORT_DURATION)
  const savedTodos = localStorage.getItem("todos")
  return savedTodos ? JSON.parse(savedTodos) : []
}

export const saveTodos = (todos: Todo[]): void => {
  localStorage.setItem("todos", JSON.stringify(todos))
}

export const addTodo = async (currentTodos: Todo[], text: string): Promise<Todo[]> => {
  await delay(SHORT_DURATION)
  return [...currentTodos, createTodo(text)]
}

export const toggleTodo = async (currentTodos: Todo[], id: string): Promise<Todo[]> => {
  await delay(SHORT_DURATION)
  return currentTodos.map(t => 
    t._id === id ? { ...t, completed: !t.completed } : t
  )
}

export const deleteTodo = async (currentTodos: Todo[], id: string): Promise<Todo[]> => {
  await delay(SHORT_DURATION)
  return currentTodos.filter(t => t._id !== id)
}