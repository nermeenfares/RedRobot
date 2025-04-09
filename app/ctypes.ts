export type Todo = {
  id: string;
  _id?: string; 
  text: string
  completed: boolean
  createdAt: string
}

export interface ITodoApi {
  getTodos(): Promise<Todo[]>
  addTodo(prev: Todo[], text: string): Promise<Todo>
  save?(todos: Todo[]): Promise<void>
  toggleTodo(id: string): Promise<void>
  deleteTodo(id: string): Promise<void>
}
