import { useMemo, useState } from "react";
import InputTodo from "./components/todo/InputTodo";
import type { Todo } from "./types/todo";
import TodoList from "./components/todo/TodoList";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos],
  );

  const addTodo = (text: string) => {
    if (!text) return;

    setTodos((current: Todo[]) => [
      { id: crypto.randomUUID(), label: text, completed: false },
      ...current,
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos((current: Todo[]) =>
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

        <InputTodo addTodo={addTodo} />

        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />

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
