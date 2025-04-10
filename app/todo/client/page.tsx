"use client"
import { Todo } from "@/app/ctypes"
import Loading from "@/app/ui/todo/loadingIndicator"
import { useEffect, useState } from "react"
import { 
  loadTodos, 
  saveTodos, 
  addTodo, 
  toggleTodo, 
  deleteTodo 
} from "@/app/lib/client/todo-utils"

export default function ClientTodo() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(true)

  // Load initial data
  useEffect(() => {
    const initialize = async () => {
      setLoading(true)
      setTodos(await loadTodos())
      setLoading(false)
    }
    initialize()
  }, [])

  // Auto-save when todos change
  useEffect(() => {
    if (todos.length > 0 || !loading) {
      saveTodos(todos)
    }
  }, [todos, loading])

  // Handler functions
  const handleAdd = async () => {
    if (!inputValue.trim()) return
    
    setLoading(true)
    setTodos(await addTodo(todos, inputValue))
    setInputValue("")
    setLoading(false)
  }

  const handleToggle = async (id: string) => {
    setLoading(true)
    setTodos(await toggleTodo(todos, id))
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    setLoading(true)
    setTodos(await deleteTodo(todos, id))
    setLoading(false)
  }

  // Render loading state if no todos exist yet
  if (loading && todos.length === 0) {
    return (
      <div className="max-w-md mx-auto p-4 flex justify-center">
        <Loading size="md" />
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Client Todo App</h1>
      
      {/* Input Form */}
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add new todo"
          className="flex-1 p-2 border rounded-l"
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          disabled={loading}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 disabled:bg-gray-400"
          disabled={loading || !inputValue.trim()}
        >
          Add
          {/* {loading ? "Adding..." : "Add"} */}
        </button>
      </div>

      {/* Todo List */}
      {loading && todos.length > 0 ? (
        <div className="flex justify-center py-4">
          <Loading size="md" />
        </div>
      ) : (
        <>
          <ul className="space-y-2">
            {todos.map(todo => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
                loading={loading}
              />
            ))}
          </ul>

          {todos.length === 0 && (
            <p className="text-gray-500 text-center mt-4">
              No todos yet. Add one above!
            </p>
          )}
        </>
      )}
    </div>
  )
}

// Extracted Todo Item component
const TodoItem = ({
  todo,
  onToggle,
  onDelete,
  loading
}: {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  loading: boolean
}) => (
  <li className="flex items-center justify-between p-2 border rounded">
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id)}
        className="mr-2 h-4 w-4"
        disabled={loading}
      />
      <span className={todo.completed ? "line-through text-gray-500" : ""}>
        {todo.text}
      </span>
    </div>
    <button
      onClick={() => onDelete(todo._id)}
      className="text-red-500 hover:text-red-700 disabled:text-gray-400"
      disabled={loading}
    >
      Delete
    </button>
  </li>
)