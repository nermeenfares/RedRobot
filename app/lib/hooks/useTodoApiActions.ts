"use client"

import { TodoList } from '@/app/ctypes'
import { useState, useEffect } from 'react'

export const useTodoApiActions = () => {
  const [todos, setTodos] = useState<TodoList>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isBusy, setIsBusy] = useState(false)
  const [isDeleteOrToggling, setIsDeleteOrToggling] = useState<string[]>([])

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true)
      try {
        const res = await fetch('/api/todos')
        setTodos(await res.json())
      } finally {
        setIsLoading(false)
      }
    }
    fetchTodos()
  }, [])

  const addTodo = async (text: string) => {
    setIsBusy(true)
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ text })
      })
      setTodos([...todos, await res.json()])
    } finally {
      setIsBusy(false)
    }
  }

  const toggleTodo = async (id: string) => {
    setIsDeleteOrToggling(prev => [...prev, id])
    try {
      const res = await fetch('/api/todos', {
        method: 'PUT',
        body: JSON.stringify({ id })
      })
      const result = await res.json()
      setTodos(todos.map(t => t.id === id ?  result : t))
    } finally {
      setIsDeleteOrToggling(prev => prev.filter(i => i !== id))
    }
  }

  const deleteTodo = async (id: string) => {
    setIsDeleteOrToggling(prev => [...prev, id])
    try {
      await fetch('/api/todos', {
        method: 'DELETE',
        body: JSON.stringify({ id })
      })
      setTodos(todos.filter(t => t.id !== id))
    } finally {
      setIsDeleteOrToggling(prev => prev.filter(i => i !== id))
    }
  }

  return {
    todos,
    isLoading,
    isBusy,
    isDeleteOrToggling,
    addTodo,
    toggleTodo,
    deleteTodo
  }
}