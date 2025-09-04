import useTodoStore from "../lib/stores/useTodoStore";
import { useState } from "react";
import { Plus } from "lucide-react";

const AddTodo = () => {
  const addTodoAsync = useTodoStore((state) => state.addTodoAsync);
  const [text, setText] = useState("");

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (text.trim()) {
            addTodoAsync(text.trim());
            setText("");
          }
        }}
      >
        <div className="flex gap-4 mb-8">
          <input
            className="bg-gray-50 border-2 border-cyan-200 rounded-full px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-amber-300 hover:ring-2 hover:ring-amber-300 transition-all ease-in-out duration-300"
            value={text}
            placeholder="Add a new todo"
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            className="flex justify-center items-center cursor-pointer shadow-md w-fit px-6 py-2 bg-amber-400 hover:bg-amber-400/70 text-amber-800 rounded-full transition-all ease-in-out duration-300"
          >
            <Plus size={24} />
          </button>
        </div>
      </form>
    </>
  );
};
export default AddTodo;
