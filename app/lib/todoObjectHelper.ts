import { Todo } from "../ctypes";
import { v4 as uuidv4 } from "uuid";

export const createTodo = (text: string): Todo => {
  return {
    _id: uuidv4(),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
  };
};
