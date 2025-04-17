import { ITodoApi, Todo, TodoList } from "@/app/ctypes";
import { dbConnect } from "@/app/mongodb/mongodb";
import { ObjectId } from "mongodb";
import { createTodo } from "../todoObjectHelper";

export class TodoMongoApi implements ITodoApi {
  private todoCol: any;

  constructor() {}

  public async initialize() {
    const db = await dbConnect();
    this.todoCol = db.collection<Todo>("todos");
  }

  public async getTodos(): Promise<TodoList> {
    const docs = await this.todoCol.find().toArray();
    return docs.map((doc: any) => ({
      _id: doc._id.toString(),
      text: doc.text,
      completed: doc.completed,
      createdAt: doc.createdAt,
    }));
  }

  public async addTodo(text: string): Promise<TodoList> {
    const todo = createTodo(text);

    await this.todoCol.insertOne(todo);
    return this.getTodos();
  }
  public async toggleTodo(id: string): Promise<void> {
    const coll = await this.todoCol.find().toArray();
    const todo = await coll.findOne({ _id: this.toObjectIdString(id) });

    if (todo) {
      await coll.updateOne(
        { _id: this.toObjectIdString(id) },
        { $set: { completed: !todo.completed } }
      );
    }
  }

  public async deleteTodo(id: string): Promise<void> {
    const coll = await this.todoCol.find().toArray();
    await coll.deleteOne({ _id: this.toObjectIdString(id) });
  }
  private toObjectIdString(id: string): string {
    return new ObjectId(id).toString();
  }
}
