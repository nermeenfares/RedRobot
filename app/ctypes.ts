import { Collection } from "mongodb"

export type Todo = {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

export type TodoList = Array<Todo>

export interface ITodoApi {
  initialize(): Promise<void | Collection<Todo>>
  getTodos(): Promise<TodoList>
  addTodo(text: string): Promise<TodoList>
  toggleTodo(id: string): Promise<void>
  deleteTodo(id: string): Promise<void>
}
