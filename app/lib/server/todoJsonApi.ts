import { ITodoApi, Todo, TodoList } from "@/app/ctypes";
import fs from "fs/promises";
import path from "path";
import { createTodo } from "../todoObjectHelper";

export class TodoJsonApi implements ITodoApi {
  private readonly filePath: string;
  private data: TodoList = [];

  constructor(filename: string) {
    this.filePath = path.join(
      process.cwd(),
      process.env.DATA_FOLDER_NAME as string,
      filename
    );
    console.log("Storage path:", this.filePath);
  }

  public async initialize(): Promise<void> {
    try {
      // Ensure directory exists
      const dirPath = path.dirname(this.filePath);
      await fs.mkdir(dirPath, { recursive: true });

      // Try to read the file if it exists
      try {
        const fileContent = await fs.readFile(this.filePath, "utf-8");
        this.data = JSON.parse(fileContent) as Todo[];
      } catch (error) {
        // File doesn't exist or has invalid content - create a new one
        if ((error as NodeJS.ErrnoException).code === "ENOENT") {
          await fs.writeFile(this.filePath, JSON.stringify([]), "utf-8");
          console.log(`Created new todo file: ${this.filePath}`);
          this.data = [];
        } else {
          // Re-throw unexpected errors
          throw error;
        }
      }
    } catch (error) {
      console.error("Initialization failed:", error);
      this.data = []; // Fallback to empty array
      throw error;
    }
  }

  public async getTodos(): Promise<TodoList> {
    return this.data;
  }

  public async addTodo(text: string): Promise<TodoList> {
    const todo = createTodo(text);
    this.data.push(todo);
    await this.saveTodos();
    return this.data;
  }

  public async toggleTodo(id: string): Promise<void> {
    this.data = this.data.map((todo) =>
      todo._id === id ? { ...todo, completed: !todo.completed } : todo
    );
    await this.saveTodos();
  }

  public async deleteTodo(id: string): Promise<void> {
    this.data = this.data.filter((todo) => todo._id !== id);
    await this.saveTodos();
  }

  private async saveTodos(): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(this.data, null, 2));
  }
}
