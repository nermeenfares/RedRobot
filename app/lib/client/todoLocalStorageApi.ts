import { ITodoApi, TodoList } from "@/app/ctypes"
import { createTodo } from "@/app/lib/todoObjectHelper"

export class TodoLocalStorageApi implements ITodoApi {
  private STORAGE_KEY = "todos"
  private todos: TodoList = []
  private initialized = false

  async initialize(): Promise<void> {
    if (!this.initialized) {
      this.loadTodos()
      this.initialized = true
    }
  }

  async getTodos(): Promise<TodoList> {
    return [...this.todos]
  }

  async addTodo(text: string): Promise<TodoList> {
    if (!text.trim()) {
      throw new Error("Todo text cannot be empty")
    }

    const newTodo = createTodo(text)
    this.todos = [...this.todos, newTodo]
    this.saveTodos()

    return [...this.todos]
  }

  async toggleTodo(id: string): Promise<void> {
    this.validateTodoExists(id)

    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )

    this.saveTodos()
  }

  async deleteTodo(id: string): Promise<void> {
    this.validateTodoExists(id)

    this.todos = this.todos.filter((todo) => todo.id !== id)

    this.saveTodos()
  }

  private validateTodoExists(id: string): void {
    if (!id) {
      throw new Error("Todo ID is required")
    }

    const todoExists = this.todos.some((todo) => todo.id === id)
    if (!todoExists) {
      throw new Error(`Todo with ID ${id} not found`)
    }
  }

  private loadTodos(): void {
    const savedTodos = localStorage.getItem(this.STORAGE_KEY)
    try {
      this.todos = savedTodos ? JSON.parse(savedTodos) : []
    } catch {
      this.todos = []
      localStorage.removeItem(this.STORAGE_KEY)
    }
  }

  private saveTodos(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.todos))
  }
}
