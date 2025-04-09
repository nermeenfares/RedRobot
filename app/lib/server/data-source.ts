// import TodoModel from "@/app/mongodb/models/Todo"
// import dbConnect from "@/app/mongodb/mongodb"
// import { Todo } from "@/app/ctypes"
// import path from "path"
// import fs from "fs/promises"
// import { revalidatePath } from "next/cache"

// const DATA_SOURCE_TYPE = process.env.DATA_SOURCE_TYPE || "JSON"

// const mongoOperations = {
//   getTodos: async (): Promise<Todo[]> => {
//     await dbConnect()
//     const todos = await TodoModel.find().sort({ createdAt: -1 })
//     return todos.map((todo) => ({
//       id: todo._id.toString(),
//       text: todo.text,
//       completed: todo.completed,
//       createdAt: todo.createdAt.toISOString(),
//     }))
//   },
//   addTodo: async (prev: Todo[], text: string): Promise<Todo> => {
//     await dbConnect()
//     const newTodo = await TodoModel.create({ text })
//     return {
//       id: newTodo._id.toString(),
//       text: newTodo.text,
//       completed: newTodo.completed,
//       createdAt: newTodo.createdAt.toISOString(),
//     }
//   },

//   toggleTodo: async (prev: Todo[], id: string): Promise<void> => {
//     await dbConnect()
//     const todo = await TodoModel.findById(id)
//     if (todo) {
//       todo.completed = !todo.completed
//       await todo.save()
//     }
//   },

//   deleteTodo: async (prev: Todo[], id: string): Promise<void> => {
//     await dbConnect()
//     await TodoModel.findByIdAndDelete(id)
//   },
// }

// let jsonTodos: Todo[] = []
// const filePath = path.join(process.cwd(), "data", "todos.json")

// function delay(ms: number): Promise<void> {
//   return new Promise((resolve) => setTimeout(resolve, ms))
// }

// const jsonOperations = {
//   getTodos: async (): Promise<Todo[]> => {
//     try {
//       // await delay(3000);

//       await fs.access(filePath)
//       const data = await fs.readFile(filePath, "utf-8")
//       return JSON.parse(data)
//     } catch (error) {
//       throw error
//     }
//   },
//   saveTodos: async (todos: Todo[]): Promise<void> => {
//     await delay(3000)

//     await fs.mkdir(path.dirname(filePath), { recursive: true })
//     await fs.writeFile(filePath, JSON.stringify(todos, null, 2))
//   },

//   addTodo: async (prev: Todo[], text: string): Promise<Todo> => {
//     const todos = await jsonOperations.getTodos()
//     const newTodo = {
//       id: Date.now().toString(),
//       text,
//       completed: false,
//       createdAt: new Date().toISOString(),
//     }
//     await jsonOperations.saveTodos([...todos, newTodo])
//     revalidatePath("/")
//     return newTodo
//   },
//   toggleTodo: async (prev: Todo[], id: string): Promise<void> => {
//     const todos = await jsonOperations.getTodos()
//     const updatedTodos = todos.map((todo) =>
//       todo.id === id ? { ...todo, completed: !todo.completed } : todo
//     )
//     await jsonOperations.saveTodos(updatedTodos)
//     revalidatePath("/")
//   },
//   deleteTodo: async (prev: Todo[], id: string): Promise<void> => {
//     const todos = await jsonOperations.getTodos()
//     const filteredTodos = todos.filter((todo) => todo.id !== id)
//     await jsonOperations.saveTodos(filteredTodos)
//     revalidatePath("/")
//   },
// }

// export const dataSource =
//   DATA_SOURCE_TYPE === "MONGODB" ? mongoOperations : jsonOperations
