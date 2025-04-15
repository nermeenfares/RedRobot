import { ITodoApi, TodoList } from "@/app/ctypes";
import { createTodo } from "@/app/lib/todoObjectHelper";

export class TodoLocalStorageApi implements ITodoApi {
  private STORAGE_KEY = "todos";
  private todos: TodoList = [];

  async initialize(): Promise<void> {
    await this.loadTodos();
  }

  async getTodos(): Promise<TodoList> {
    return this.todos;
  }

  async addTodo(text: string): Promise<TodoList> {
    const newTodo = createTodo(text);
    this.todos = [...this.todos, newTodo];
    await this.saveTodos();
    return this.todos;
  }

  async toggleTodo(id: string): Promise<void> {
    this.todos = this.todos.map(todo => 
      todo._id === id ? { ...todo, completed: !todo.completed } : todo
    );
    await this.saveTodos();
  }

  async deleteTodo(id: string): Promise<void> {
    this.todos = this.todos.filter(todo => todo._id !== id);
    await this.saveTodos();
  }

  private async loadTodos(): Promise<void> {
    const savedTodos = localStorage.getItem(this.STORAGE_KEY);
    this.todos = savedTodos ? JSON.parse(savedTodos) : [];
  }

  private async saveTodos(): Promise<void> {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.todos));
  }
}