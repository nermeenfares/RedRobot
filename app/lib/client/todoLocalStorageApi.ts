import { ITodoApi, TodoList } from "@/app/ctypes";
import { createTodo } from "@/app/lib/todoObjectHelper";

export class TodoLocalStorageApi implements ITodoApi {
  private STORAGE_KEY = "todos";
  private todos: TodoList = [];
  private initialized = false;

  async initialize(): Promise<void> {
    if (!this.initialized) {
      await this.loadTodos();
      this.initialized = true;
    }
  }

  async getTodos(): Promise<TodoList> {
    if (!this.initialized) {
      await this.initialize();
    }
    return [...this.todos]; // Return a copy to prevent external modifications
  }

  async addTodo(text: string): Promise<TodoList> {
    if (!text.trim()) {
      throw new Error("Todo text cannot be empty");
    }
    
    const newTodo = createTodo(text);
    this.todos = [...this.todos, newTodo];
    await this.saveTodos();
    return [...this.todos];
  }

  async toggleTodo(id: string): Promise<void> {
    await this.validateTodoExists(id);
    
    this.todos = this.todos.map(todo => 
      todo._id === id ? { ...todo, completed: !todo.completed } : todo
    );
    await this.saveTodos();
  }

  async deleteTodo(id: string): Promise<void> {
    await this.validateTodoExists(id);
    
    this.todos = this.todos.filter(todo => todo._id !== id);
    await this.saveTodos();
  }

  private async validateTodoExists(id: string): Promise<void> {
    if (!id) {
      throw new Error("Todo ID is required");
    }
    
    if (!this.initialized) {
      await this.initialize();
    }
    
    const todoExists = this.todos.some(todo => todo._id === id);
    if (!todoExists) {
      throw new Error(`Todo with ID ${id} not found`);
    }
  }

  private async loadTodos(): Promise<void> {
    try {
      const savedTodos = localStorage.getItem(this.STORAGE_KEY);
      this.todos = savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error("Failed to load todos:", error);
      this.todos = [];
    }
  }

  private async saveTodos(): Promise<void> {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.todos));
    } catch (error) {
      console.error("Failed to save todos:", error);
      throw new Error("Failed to save todos");
    }
  }
}