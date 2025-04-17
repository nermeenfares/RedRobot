"use server";

import { revalidatePath } from "next/cache";
import { ServerTodoFactory } from "./serverTodoFactory";

const todoApi = await ServerTodoFactory.getApi();

export async function getTodos() {
  return await todoApi.getTodos();
}

export async function addTodo(text: string) {
  const result = await todoApi.addTodo(text);
  revalidatePath("/todo/server");
  return result;
}

export async function toggleTodo(id: string) {
  const result = await todoApi.toggleTodo(id);
  revalidatePath("/todo/server");
  return result;
}

export async function deleteTodo(id: string) {
  const result = await todoApi.deleteTodo(id);
  revalidatePath("/todo/server");
  return result;
}

// Form action handlers
export async function handleAdd(formData: FormData) {
  const text = formData.get("text")?.toString().trim();
  if (text) {
    await addTodo(text);
  }
}

export async function handleToggle(formData: FormData) {
  const id = formData.get("id")?.toString();
  if (id) {
    await toggleTodo(id);
  }
}

export async function handleDelete(formData: FormData) {
  const id = formData.get("id")?.toString();
  if (id) {
    await deleteTodo(id);
  }
}
