"use client";

import { ClientTodoFactory } from "./clientTodoFactory";
let todoApiInstance: ReturnType<typeof ClientTodoFactory.getApi> | null = null;

const getTodoApi = async () => {
  if (!todoApiInstance) {
    todoApiInstance = ClientTodoFactory.getApi();
  }
  return todoApiInstance;
};

export const fetchTodos = async () => {
  try {
    const api = await getTodoApi();
    return await api.getTodos();
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    throw new Error("Failed to load todos");
  }
};

export const apiAddTodo = async (text: string) => {
  try {
    if (!text?.trim()) throw new Error("Todo text cannot be empty");
    const api = await getTodoApi();
    const result = await api.addTodo(text.trim());
    return result;
  } catch (error) {
    console.error("Failed to add todo:", error);
    throw new Error("Failed to create todo");
  }
};

export const apiToggleTodo = async (id: string) => {
  try {
    if (!id) throw new Error("Todo ID is required");

    const api = await getTodoApi();
    await api.toggleTodo(id);
    return await api.getTodos();
  } catch (error) {
    console.error("Failed to toggle todo:", error);
    throw new Error("Failed to update todo");
  }
};

export const apiDeleteTodo = async (id: string) => {
  try {
    if (!id) throw new Error("Todo ID is required");

    const api = await getTodoApi();
    await api.deleteTodo(id);
    return await api.getTodos();
  } catch (error) {
    console.error("Failed to delete todo:", error);
    throw new Error("Failed to remove todo");
  }
};
