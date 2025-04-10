import { Todo } from "../ctypes"
//this is way to make the id value using sequence
// let todoSequence = 0

// export const createTodo = (text: string): Todo => {
//   const todo: Todo = {
//     _id: (++todoSequence).toString(), 
//     completed: false,
//     createdAt: Date.now().toString(),
//     text
//   }
//   return todo
// }

//another optio to set the id using uuid lib
import { v4 as uuidv4 } from 'uuid';

export const createTodo = (text: string): Todo => {
  return {
    _id: uuidv4(),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
  };
};


export const delay= async(ms: number): Promise<void>=> {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }