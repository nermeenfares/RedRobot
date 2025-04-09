"use server"
import { Todo } from "@/app/ctypes"
import { TodoFactory } from "./todoFactory"

const dataSource = TodoFactory.getApi()

export const getTodos = async (): Promise<Todo[]> => {
  return await dataSource.getTodos()
}

export const addTodo = async (text: string): Promise<Todo> => {
  return await dataSource.addTodo([], text)
}

export const toggleTodo = async (id: string): Promise<void> => {
  await dataSource.toggleTodo([], id)
}

export const deleteTodo = async (id: string): Promise<void> => {
  await dataSource.deleteTodo([], id)
}
