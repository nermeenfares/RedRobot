"use client"
import { useClientTodos } from "@/app/lib/hooks/useTodoClientActions"
import { AddTodoForm } from "@/app/ui/todo/AddTodoForm"
import { Spinner } from "@/app/ui/loading"
import { TodoItem } from "@/app/ui/todo/TodoItem"

export default function TodoListComponent() {
  const {
    todos,
    isLoading,
    isBusy,
    isDeleteOrToggling,
    addTodo,
    toggleTodo,
    deleteTodo,
  } = useClientTodos()

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto p-4 flex justify-center">
        <Spinner size="md" />
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Todo App</h1>

      <AddTodoForm
        onSubmit={(text: string) => addTodo(text)}
        isSubmitting={isBusy}
      />

      {todos.length === 0 && (
        <p className="text-gray-500 text-center py-8">Todo list empty</p>
      )}

      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            isBusy={isDeleteOrToggling.includes(todo.id)}
            todo={todo}
            onToggle={(id: string) => {
              toggleTodo(id)
            }}
            onDelete={(id: string) => {
              deleteTodo(id)
            }}
          />
        ))}
      </ul>
    </div>
  )
}
