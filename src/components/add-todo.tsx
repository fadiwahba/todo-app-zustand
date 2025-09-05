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
        <div className="flex flex-col md:flex-row gap-4">
          <textarea
            className="bg-gray-50 border-2 border-cyan-200 rounded-2xl px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-amber-300 hover:ring-2 hover:ring-amber-300 transition-all ease-in-out duration-300 resize-none min-h-[44px] max-h-32 overflow-y-auto"
            value={text}
            placeholder="Add a new todo"
            onChange={(e) => setText(e.target.value)}
            rows={1}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 128) + 'px';
            }}
          />
          <button
            type="submit"
            className="flex justify-center items-center cursor-pointer shadow-md w-full md:w-fit h-10 px-6 py-2 bg-cyan-400 hover:bg-cyan-400/70 text-white rounded-full transition-all ease-in-out duration-300"
          >
            <Plus size={24} />
          </button>
        </div>
      </form>
    </>
  );
};
export default AddTodo;
