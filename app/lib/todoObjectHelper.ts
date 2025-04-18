import { ObjectId } from "mongodb"
import { Todo } from "../ctypes"
import { v4 as uuidv4 } from "uuid"

export type TodoMDB = Omit<Todo, "id"> & { _id: ObjectId }

export const createTodo = (text: string): Todo => {
  return {
    id: uuidv4(),
    text,
    completed: false,
    createdAt: new Date(),
  }
}

export const convertFromTodoMDB = (todo: TodoMDB): Todo => {
  const { _id, ...rest } = todo
  return {
    id: _id.toString(),
    ...rest,
  }
}

export const convertToTodoMDB = (todo: Todo): Omit<TodoMDB, "_id"> => {
  const { id, ...rest } = todo
  return rest
}
