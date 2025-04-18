"use client"

import { TodoList } from "@/app/ctypes"
import Loading from "@/app/ui/loading"
import { useState, useEffect } from "react"
import { fetchTodos } from "@/app/lib/todoApi"
import { useClientTodos } from "@/app/lib/hooks/useTodoClientActions"

export default function MixedTodo() {
  // const [todos, setTodos] = useState<TodoList>([]);
  const [inputValue, setInputValue] = useState("")
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const { todos, addTodo, toggleTodo, deleteTodo, isLoading } = useClientTodos()

  // useEffect(() => {
  //   const loadTodos = async () => {
  //     try {
  //       const data = await fetchTodos()
  //       setTodos(data)
  //     } catch (error) {
  //       console.error("Error fetching todos:", error)
  //     } finally {
  //       setIsInitialLoading(false)
  //     }
  //   }
  //   loadTodos()
  // }, [])

  const handleAdd = async () => {
    if (inputValue.trim()) {
      try {
        await addTodo(inputValue)
        setInputValue("")
      } catch (error) {
        console.error("Error adding todo:", error)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAdd()
  }

  if (isInitialLoading) {
    return (
      <div className="max-w-md mx-auto p-4">
        <Loading size="md" />
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hybrid Todo App</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add new todo"
          className="flex-1 p-2 border rounded-l"
          disabled={isLoading}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isLoading || !inputValue.trim()}
        >
          {isLoading ? "Adding..." : "Add"}
        </button>
      </div>

      {isLoading && todos.length > 0 && (
        <div className="mb-2">
          <Loading size="sm" />
        </div>
      )}

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
                onChange={() => toggleTodo(todo._id)}
                className="mr-2 h-4 w-4"
                disabled={isLoading}
              />
              <span
                className={todo.completed ? "line-through text-gray-500" : ""}
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="text-red-500 hover:text-red-700 disabled:text-red-300"
              disabled={isLoading}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && !isInitialLoading && (
        <p className="text-gray-500 text-center mt-4">
          No todos yet. Add one above!
        </p>
      )}
    </div>
  )
}
