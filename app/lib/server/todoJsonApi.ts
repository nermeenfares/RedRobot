import { ITodoApi, Todo, TodoList } from "@/app/ctypes"
import fs from "fs/promises"
import path from "path"
import { createTodo } from "../todoObjectHelper"

export class TodoJsonApi implements ITodoApi {
  private readonly filePath: string
  private data: TodoList = [] 

  constructor(filename: string) {
    this.filePath = path.join(
      process.cwd(),
      process.env.DATA_FOLDER_NAME as string, 
      filename
    )
    console.log("Storage path:", this.filePath)
  }

  public async initialize(): Promise<void> {
    try {
      //TODOOOO
        // does the directory exists?

    // if no we create the folder

    // if yes, we don't do anything

      // Ensure directory exists
      await fs.mkdir(path.dirname(this.filePath), { recursive: true })

      // Check if file exists and is accessible
      try {
        await fs.access(this.filePath)
        const fileContent = await fs.readFile(this.filePath, "utf-8")
        this.data = JSON.parse(fileContent) as Todo[]
      } catch {
        // File doesn't exist - create it with empty array
        await fs.writeFile(this.filePath, JSON.stringify([]), 'utf-8')
        this.data = [] // Explicitly set empty array
      }
    } catch (error) {
      console.error("Initialization failed:", error)
      this.data = [] // Fallback to empty array
      throw error 
    }
  }

  public async getTodos(): Promise<TodoList> {
    return this.data
  }

  public async addTodo(text: string): Promise<TodoList> {
    const todo = createTodo(text)
    this.data.push(todo)
    await this.saveTodos()
    return this.data
  }

  public async toggleTodo(id: string): Promise<void> {
    this.data = this.data.map(todo =>
      todo._id === id ? { ...todo, completed: !todo.completed } : todo
    )
    await this.saveTodos()
  }

  public async deleteTodo(id: string): Promise<void> {
    this.data = this.data.filter(todo => todo._id !== id)
    await this.saveTodos()
  }

  private async saveTodos(): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(this.data, null, 2))
  }
}