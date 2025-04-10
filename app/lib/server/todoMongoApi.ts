import { ITodoApi, Todo, TodoList } from "@/app/ctypes"
import { dbConnect } from "@/app/mongodb/mongodb"
import { Collection, ObjectId } from "mongodb"
import { createTodo, delay } from "../todoObjectHelper"
import { SHORT_DURATION } from "../constants"


export class TodoMongoApi implements ITodoApi {

  constructor() {
    this.collection = this.initialize()
  }

  public  async initialize() {
    const db = await dbConnect()
    return db.collection<Todo>("todos")
  }

  // private toTodo(doc: { _id: ObjectId } & Omit<Todo, "_id">): Todo {
  //   return {
  //     _id: doc._id.toString(),
  //     text: doc.text,
  //     completed: doc.completed,
  //     createdAt: doc.createdAt, // Already string from query
  //   }
  // }

  public async getTodos(): Promise<Todo[]> {
    delay(SHORT_DURATION)
    const coll = await this.collection
    const docs = await coll.find().toArray()
    return docs.map((doc) => ({
      _id: doc._id.toString(),
      text: doc.text,
      completed: doc.completed,
      createdAt: doc.createdAt,
    }))
  }

  public async addTodo(text: string): Promise<TodoList> {
    delay(SHORT_DURATION)
    const coll = await this.collection
    const todo = createTodo(text);
    // MongoDB will automatically add _id (ObjectId)
  await coll.insertOne(todo)
  const todos = await coll.find().toArray();

    // Return with string _id
    return todos;
  }
  public async toggleTodo(id: string): Promise<void> {
    delay(SHORT_DURATION)
    const coll = await this.collection

    const todo = await coll.findOne({ _id: new ObjectId(id).toString() })

    if (todo) {
      // 2. Toggle the completed status
      await coll.updateOne(
        { _id: new ObjectId(id).toString() },
        { $set: { completed: !todo.completed } }
      )
    }
  }

  public async deleteTodo(id: string): Promise<void> {
    delay(SHORT_DURATION)
    const coll = await this.collection
    await coll.deleteOne({ _id: new ObjectId(id).toString() })
  }
  private collection: Promise<Collection<Todo>>

}
