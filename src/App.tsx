import { useMemo, useState } from "react";

type Todo = {
  id: string;
  label: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [draft, setDraft] = useState("");

  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos],
  );

  const addTodo = () => {
    const text = draft.trim();
    if (!text) return;

    setTodos((current) => [
      { id: crypto.randomUUID(), label: text, completed: false },
      ...current,
    ]);
    setDraft("");
  };

  const toggleTodo = (id: string) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((current) => current.filter((todo) => !todo.completed));
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-200">
      <div className="bg-white shadow-lg px-6 py-5 w-full max-w-lg">
        <header className="text-center mb-6">
          <div className="pb-3 border-b-2 border-gray-300">
            <p className="font-bold text-2xl pb-1">my-todo</p>
            <p className="text-gray-800">Time to remember what you forgot.</p>
          </div>
          {/* <div className="status">
            <span>{todos.length} task{todos.length === 1 ? '' : 's'}</span>
            <span>{completedCount} completed</span>
          </div> */}
        </header>

        <div className="flex my-4 gap-2">
          <input
            className="border border-gray-200 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && addTodo()}
            placeholder="Add a new task"
            aria-label="New todo"
          />
          <button
            type="button"
            onClick={addTodo}
            disabled={!draft.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        <ul className="pb-4">
          {todos.length === 0 ? (
            <li className="text-center text-sm text-gray-800 py-1">
              No todos yet. Add one above.
            </li>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                className="border border-gray-100 rounded py-2 px-4 flex items-center justify-between mb-2"
              >
                <label>
                  <input
                    className="mr-2 cursor-pointer"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span
                    className={`cursor-pointer ${
                      todo.completed ? "text-gray-500 line-through" : ""
                    }`}
                  >
                    {todo.label}
                  </span>
                </label>
                <button
                  type="button"
                  className="text-red-500 text-lg font-bold cursor-pointer"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label={`Delete ${todo.label}`}
                >
                  ×
                </button>
              </li>
            ))
          )}
        </ul>

        <footer className="border-t-2 border-gray-200 pt-5 flex justify-center">
          <button
            type="button"
            onClick={clearCompleted}
            disabled={completedCount === 0}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Clear completed
          </button>
        </footer>
      </div>
    </main>
  );
}

export default App;
