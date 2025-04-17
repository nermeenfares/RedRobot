import { TodoList } from "@/app/ctypes";

export async function fetchTodos(): Promise<TodoList> {
  const response = await fetch("/api/todos", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return response.json();
}

export async function addTodo(text: string): Promise<TodoList> {
  const response = await fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  
  if (!response.ok) {
    throw new Error("Failed to add todo");
  }
  
  return response.json();
}

export async function toggleTodo(id: string): Promise<void> {
  const response = await fetch("/api/todos", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  
  if (!response.ok) {
    throw new Error("Failed to toggle todo");
  }
}

export async function deleteTodo(id: string): Promise<void> {
  const response = await fetch("/api/todos", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  
  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
}