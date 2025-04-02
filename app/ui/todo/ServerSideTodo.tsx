
import { addTodo, deleteTodo, getTodos, toggleTodo } from "@/app/lib/todo-utils";
export default async function ServerTodo() {
  const todos = await getTodos();

  async function handleAdd(formData: FormData) {
    'use server';
    const text = formData.get('text') as string;
    if (text) {
      await addTodo(text);
    }
  }

  async function handleToggle(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await toggleTodo(id);
  }

  async function handleDelete(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await deleteTodo(id);
  }

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
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center justify-between p-2 border rounded">
            <div className="flex items-center">
              <form action={handleToggle}>
                <input type="hidden" name="id" value={todo.id} />
                <button type="submit" className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly 
                    className="mr-2 h-4 w-4"
                  />
                  <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                    {todo.text}
                  </span>
                </button>
              </form>
            </div>
            
            <form action={handleDelete}>
              <input type="hidden" name="id" value={todo.id} />
              <button
                type="submit"
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="text-gray-500 text-center mt-4">No todos yet. Add one above!</p>
      )}
    </div>
  );
}