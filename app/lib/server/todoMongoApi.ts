import { ITodoApi, Todo, TodoList } from "@/app/ctypes"
import { dbConnect } from "@/app/mongodb/mongodb"
import { ObjectId } from "mongodb"
import {
  convertFromTodoMDB,
  convertToTodoMDB,
  createTodo,
} from "../todoObjectHelper"

export class TodoMongoApi implements ITodoApi {
  private todoCol: any

  public async initialize() {
    const db = await dbConnect()
    this.todoCol = db.collection<Todo>("todos")
  }

  public async getTodos(): Promise<TodoList> {
    const docs = await this.todoCol.find().toArray()
    return docs.map(convertFromTodoMDB)
  }

  public async addTodo(text: string): Promise<TodoList> {
    const todo = convertToTodoMDB(createTodo(text))
    await this.todoCol.insertOne(todo)
    return this.getTodos()
  }

  public async toggleTodo(id: string): Promise<void> {
    await this.todoCol.updateOne({ _id: new ObjectId(id) }, [
      { $set: { completed: { $not: "$completed" } } },
    ])
  }

  public async deleteTodo(id: string): Promise<void> {
    await this.todoCol.deleteOne({ _id: new ObjectId(id) })
  }
}
