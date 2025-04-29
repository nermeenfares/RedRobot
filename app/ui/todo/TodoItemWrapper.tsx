"use client"
import { Todo } from "@/app/ctypes";
import { TodoItem } from "./TodoItem";

export function TodoItemWrapper({
  todo,
  toggleAction,
  deleteAction
}: {
  todo: Todo;
  toggleAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
}) {
  return (
    <TodoItem
      todo={todo}
      isBusy={false}
      onToggle={async () => {
        const formData = new FormData();
        formData.append("id", todo.id);
        await toggleAction(formData);
      }}
      onDelete={async () => {
        const formData = new FormData();
        formData.append("id", todo.id);
        await deleteAction(formData);
      }}
    />
  );
}