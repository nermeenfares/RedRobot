import {
  getTodos,
  handleAdd,
  handleToggle,
  handleDelete,
} from "@/app/lib/server/todoActions"
import {
  AddButton,
  ToggleButton,
  DeleteButton,
} from "@/app/ui/todo/TodoActionButtons"

export default async function ServerTodo() {
  const todos = await getTodos()

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Server-Only Todo App</h1>

      <form action={handleAdd} className="mb-4">
        <div className="flex">
          <input
            type="text"
            name="text"
            placeholder="Add new todo"
            className="flex-1 p-2 border rounded-l"
            required
          />
          <AddButton />
        </div>
      </form>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-2 border rounded"
          >
            <div className="flex items-center">
              <form action={handleToggle} className="flex items-center">
                <input type="hidden" name="id" value={todo.id} />
                <ToggleButton completed={todo.completed} text={todo.text} />
              </form>
            </div>

            <form action={handleDelete}>
              <input type="hidden" name="id" value={todo.id} />
              <DeleteButton />
            </form>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="text-gray-500 text-center mt-4">
          No todos yet. Add one above!
        </p>
      )}
    </div>
  )
}
