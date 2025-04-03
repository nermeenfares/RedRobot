import fs from 'fs/promises';
import { revalidatePath } from 'next/cache';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'todos.json');

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
};

export async function getTodos(): Promise<Todo[]> {
  try {
    await fs.access(filePath);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
   
    throw error;
  }
}

export async function saveTodos(todos: Todo[]): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(todos, null, 2));
}

export async function addTodo(text: string): Promise<Todo> {
  const todos = await getTodos();
  const newTodo = {
    id: Date.now().toString(),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  await saveTodos([...todos, newTodo]);
  revalidatePath('/');
  return newTodo;
}

export async function toggleTodo(id: string): Promise<void> {
  const todos = await getTodos();
  const updatedTodos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  await saveTodos(updatedTodos);
  revalidatePath('/');
}

export async function deleteTodo(id: string): Promise<void> {
  const todos = await getTodos();
  const filteredTodos = todos.filter(todo => todo.id !== id);
  await saveTodos(filteredTodos);
  revalidatePath('/');
}