"use server"
import { revalidatePath } from "next/cache";
import { Todo } from "@/app/ctypes"
import { TodoFactory } from "./todoFactory"

const dataSource = TodoFactory.getApi()

export const getTodos = async (): Promise<Todo[]> => {
  return await dataSource.getTodos()
}

export const addTodo = async (text: string): Promise<Todo[]> => {
  const result = await dataSource.addTodo(text);
  revalidatePath('/todo/server');
  return result;
}

export const toggleTodo = async (id: string): Promise<void> => {
  await dataSource.toggleTodo(id);
  revalidatePath('/todo/server');
}

export const deleteTodo = async (id: string): Promise<void> => {
  await dataSource.deleteTodo(id);
  revalidatePath('/todo/server');
}