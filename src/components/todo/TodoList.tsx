import type { Todo } from "../../types/todo";

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleTodo,
  deleteTodo,
}) => {
  return (
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
  );
};

export default TodoList;
