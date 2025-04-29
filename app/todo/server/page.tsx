import { Todo } from "@/app/ctypes";
import { TodoItemWrapper } from "@/app/ui/todo/TodoItemWrapper";
import { getTodos, handleAdd, handleToggle, handleDelete } from "@/app/lib/server/todoActions";
import { AddTodoForm } from "@/app/ui/todo/AddTodoForm";

export default async function ServerPage() {
  const todos = await getTodos();

  return (
    <div className="max-w-md mx-auto p-4">
      <AddTodoForm action={handleAdd} />
      <ul className="space-y-2">
        {todos.map((todo:Todo) => (
       <li key={todo.id}>
            <TodoItemWrapper 
            todo={todo} 
            toggleAction={handleToggle}
            deleteAction={handleDelete}
            />
      
            </li>
        ))}
      </ul>
    </div>
  );
}