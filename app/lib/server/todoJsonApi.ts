import { ITodoApi, Todo } from "@/app/ctypes";
import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

export class TodoJsonApi implements ITodoApi {
  private readonly filePath: string;

  constructor() {
    this.filePath = path.join(process.cwd(), "data", "todos.json");
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async saveTodos(todos: Todo[]): Promise<void> {
    await this.delay(3000); // Simulate network delay
    await fs.mkdir(path.dirname(this.filePath), { recursive: true });
    await fs.writeFile(this.filePath, JSON.stringify(todos, null, 2));
  }

  // --- Public API Methods (ITodoApi Implementation) ---
  public async getTodos(): Promise<Todo[]> {
    try {
      await fs.access(this.filePath);
      const data = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(data) as Todo[];
    } catch (error) {
      if (error.code === 'ENOENT') { // File doesn't exist
        return []; // Return empty array instead of throwing
      }
      throw error;
    }
  }

  public async addTodo(_prev: Todo[], text: string): Promise<Todo> {
    const todos = await this.getTodos();
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    await this.saveTodos([...todos, newTodo]);
    revalidatePath("/");
    return newTodo;
  }

  public async toggleTodo( id: string): Promise<void> {
    const todos = await this.getTodos();
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    await this.saveTodos(updatedTodos);
    revalidatePath("/");
  }

  public async deleteTodo( id: string): Promise<void> {
    const todos = await this.getTodos();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    await this.saveTodos(filteredTodos);
    revalidatePath("/");
  }
}