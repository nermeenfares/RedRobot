import {
  getTodos,
  handleAdd,
  handleToggle,
  handleDelete,
} from "@/app/lib/server/todoActions";

export default async function ServerTodo() {
  const todos = await getTodos();

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
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </form>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex items-center justify-between p-2 border rounded"
          >
            <div className="flex items-center">
              <form action={handleToggle} className="flex items-center">
                <input type="hidden" name="id" value={todo._id} />
                <button
                  type="submit"
                  className="flex items-center"
                  aria-label={
                    todo.completed ? "Mark as incomplete" : "Mark as complete"
                  }
                >
                  <span
                    className={`inline-block mr-2 h-4 w-4 border rounded-sm ${
                      todo.completed
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {todo.completed && (
                      <svg viewBox="0 0 12 10" className="h-3 w-3 text-white">
                        <path
                          fill="currentColor"
                          d="M10.28 1.28L4 7.56 1.72 5.28a1 1 0 00-1.41 1.41l3 3a1 1 0 001.41 0l7-7a1 1 0 00-1.41-1.41z"
                        />
                      </svg>
                    )}
                  </span>
                  <span
                    className={
                      todo.completed ? "line-through text-gray-500" : ""
                    }
                  >
                    {todo.text}
                  </span>
                </button>
              </form>
            </div>

            <form action={handleDelete}>
              <input type="hidden" name="id" value={todo._id} />
              <button
                type="submit"
                className="text-red-500 hover:text-red-700"
                aria-label="Delete todo"
              >
                Delete
              </button>
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
  );
}
