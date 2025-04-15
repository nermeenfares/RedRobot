"use client"

import {  TodoList } from "@/app/ctypes"
import Loading from "@/app/ui/todo/loadingIndicator"
import { useState, useEffect } from "react"

export default function MixedTodo() {
  const [todos, setTodos] = useState<TodoList>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true)

        const response = await fetch("/api/todos", { cache: "no-store" })
        const data = await response.json()
        setTodos(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching todos:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTodos()
  }, [])

  const handleAdd = async () => {
    if (inputValue.trim()) {
    
      try {
        setIsLoading(true)
        const response = await fetch("/api/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: inputValue }),
        })
  
        const NewTodos = await response.json()
      
        setTodos(prev => [...NewTodos])
        setInputValue("")
        setIsLoading(false)
      } catch (error) {
        console.error("Error adding todo:", error)
      }
    }
  }

  const handleToggle = async (id: string) => {
    try {
      setIsLoading(true)

      await fetch("/api/todos", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })

      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: !todo.completed } : todo
        )
      )
      setIsLoading(false)
    } catch (error) {
      console.error("Error toggling todo:", error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true)
      await fetch("/api/todos", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
      setTodos(todos.filter((todo) => todo._id !== id))
      setIsLoading(false)
    } catch (error) {
      console.error("Error deleting todo:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto p-4">
        <Loading size="md" />
      </div>
    )
  }
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hybrid Todo App </h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add new todo"
          className="flex-1 p-2 border rounded-l"
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex items-center justify-between p-2 border rounded"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo._id)}
                className="mr-2 h-4 w-4"
              />
              <span
                className={todo.completed ? "line-through text-gray-500" : ""}
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => handleDelete(todo._id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && !isLoading && (
        <p className="text-gray-500 text-center mt-4">
          No todos yet. Add one above!
        </p>
      )}
    </div>
  )
}
