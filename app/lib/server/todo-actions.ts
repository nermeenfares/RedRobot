'use server';
import { dataSource } from './data-source';
import { Todo } from '@/types';

export const getTodos = async (): Promise<Todo[]> => {
  return await dataSource.getTodos();
};

export const addTodo = async (text: string): Promise<Todo> => {
  return await dataSource.addTodo([], text);
};

export const toggleTodo = async (id: string): Promise<void> => {
  await dataSource.toggleTodo([],id);
};

export const deleteTodo = async (id: string): Promise<void> => {
  await dataSource.deleteTodo([],id);
};