"use client"

import { TodoList } from "@/app/ctypes"
import { useCallback, useEffect, useState } from "react"
import {
  apiAddTodo,
  apiDeleteTodo,
  apiToggleTodo,
  fetchTodos,
} from "../client/clientTodoUtils"

export const useClientTodos = () => {
  const [todos, setTodos] = useState<TodoList>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isBusy, setIsBusy] = useState<boolean>(false)
  const [isDeleteOrToggling, setIsDeleteOrToggling] = useState<Array<string>>(
    []
  )

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true)
        const todos = await fetchTodos()
        setTodos(todos)
      } catch (error) {
        console.error("Failed to load todos:", error)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const addTodo = useCallback(
    async (text: string) => {
      try {
        setIsBusy(true)
        const updatedTodos = await apiAddTodo(text)
        setTodos(updatedTodos)
        return updatedTodos
      } finally {
        setIsBusy(false)
      }
    },
    [setTodos]
  )

  const toggleTodo = useCallback(
    async (id: string) => {
      try {
        setIsDeleteOrToggling((ids) => [...ids, id])
        const updatedTodos = await apiToggleTodo(id)
        setTodos(updatedTodos)
        return updatedTodos
      } finally {
        setIsDeleteOrToggling((ids) => ids.filter(currentId => currentId !== id))
      }
    },
    [setTodos]
  )

  const deleteTodo = useCallback(
    async (id: string) => {
      try {
        setIsDeleteOrToggling((ids) => [...ids, id])
        const updatedTodos = await apiDeleteTodo(id)
        setTodos(updatedTodos)
        return updatedTodos
      } finally {
        setIsDeleteOrToggling((ids) => ids.filter(currentId => currentId !== id))
      }
    },
    [setTodos]
  )

  return {
    todos,
    isLoading,
    isBusy,
    isDeleteOrToggling,
    addTodo,
    toggleTodo,
    deleteTodo,
  }
}
