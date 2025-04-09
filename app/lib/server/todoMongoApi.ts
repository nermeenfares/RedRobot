import { ITodoApi, Todo } from "@/app/ctypes";
import { dbConnect } from "@/app/mongodb/mongodb";
import { Collection, ObjectId } from "mongodb";

export class TodoMongoApi implements ITodoApi {
  private collection: Promise<Collection<Todo>>;
  
  constructor() {
    this.collection = this.initializeCollection();
  }

  private async initializeCollection() {
    const db = await dbConnect();
    return db.collection<Todo>('todos');
  }

  private toTodo(doc: { _id: ObjectId } & Omit<Todo, '_id'>): Todo {
    return {
      _id: doc._id.toString(),
      text: doc.text,
      completed: doc.completed,
      createdAt: doc.createdAt // Already string from query
    };
  }

  public async getTodos(): Promise<Todo[]> {
    const coll = await this.collection;
    const docs = await coll.find().toArray();
    return docs.map(doc => ({
      _id: doc._id.toString(),
      text: doc.text,
      completed: doc.completed,
      createdAt: doc.createdAt
    }));
  }

  public async addTodo(_prev: Todo[], text: string): Promise<Todo> {
    const coll = await this.collection;
    
    // MongoDB will automatically add _id (ObjectId)
    const result = await coll.insertOne({
      text,
      completed: false,
      createdAt: new Date().toString() // Store as Date for proper sorting
    });
    
    // Return with string _id
    return {
      _id: result.insertedId.toString(), // Convert ObjectId to string
      text,
      completed: false,
      createdAt: new Date().toISOString() // Convert to string for response
    };
  }
  public async toggleTodo( id: string): Promise<void> {
    const coll = await this.collection;
    
    const todo = await coll.findOne({ _id: new ObjectId(id).toString()});
    
    if (todo) {
      // 2. Toggle the completed status
      await coll.updateOne(
        { _id: new ObjectId(id).toString() },
        { $set: { completed: !todo.completed } }
      );
    }
  }

  public async deleteTodo( id: string): Promise<void> {
    const coll = await this.collection;
    await coll.deleteOne({ _id: new ObjectId(id).toString() });
  }
}