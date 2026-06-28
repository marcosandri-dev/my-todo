import { useState } from "react";

interface InputProps {
  addTodo: (text: string) => void;
}

const InputTodo: React.FC<InputProps> = ({ addTodo }) => {
  const [draft, setDraft] = useState("");

  const addTodoAction = () => {
    const text = draft.trim();
    addTodo(text);
    setDraft("");
  };

  return (
    <div className="flex my-4 gap-2">
      <input
        className="border border-gray-200 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && addTodoAction()}
        placeholder="Add a new task"
        aria-label="New todo"
      />
      <button
        type="button"
        onClick={addTodoAction}
        disabled={!draft.trim()}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </div>
  );
};

export default InputTodo;
