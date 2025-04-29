"use client"

import { useState } from "react"
import { useClientTodos } from "@/app/lib/hooks/useTodoClientActions"

export default function MixedTodo() {
  const [inputValue, setInputValue] = useState("")
  const {
    todos,
    isLoading,
    isBusy,
    isDeleteOrToggling,
    addTodo,
    toggleTodo,
    deleteTodo
  } = useClientTodos()

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

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto p-4">
        <p>Loading todos...</p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add new todo"
          className="flex-1 p-2 border rounded-l"
          disabled={isBusy}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isBusy || !inputValue.trim()}
        >
          {isBusy ? "Adding..." : "Add"}
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-2 border rounded"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="mr-2 h-4 w-4"
                disabled={isDeleteOrToggling.includes(todo.id)}
              />
              <span className={todo.completed ? "line-through text-gray-500" : ""}>
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 disabled:text-red-300"
              disabled={isDeleteOrToggling.includes(todo.id)}
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