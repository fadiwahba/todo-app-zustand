import useTodoStore from "../lib/stores/useTodoStore";
import { useEffect } from "react";
import Loader from "./loader";
import { Trash2, Check, Square } from "lucide-react";

const Todos = () => {
  const isLoading = useTodoStore((state) => state.isLoading);
  const todos = useTodoStore((state) => state.todos);
  const initializeFromServer = useTodoStore(
    (state) => state.initializeFromServer
  );
  const removeTodoAsync = useTodoStore((state) => state.removeTodoAsync);
  const toggleTodoAsync = useTodoStore((state) => state.toggleTodoAsync);

  useEffect(() => {
    initializeFromServer();

    return () => {
      // cleanup if needed
    };
  }, [initializeFromServer]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {todos.length === 0 && (
          <p className="col-span-4 text-center text-gray-500">No todos yet. Add one!</p>
        )}
        {todos.map((todo) => (
          <li
            className={`relative w-full flex justify-between items-start max-h-60 overflow-y-auto gap-4 p-4 rounded-md shadow-sm hover:shadow-lg border-l-8 border-amber-400 bg-amber-100 transition-all ease-in-out duration-300 ${
              todo.completed
                ? "border-green-300 perspective-distant"
                : "border-amber-400"
            }`}
            key={todo.id}
          >
            <div
              className={
                "flex-1 wrap-break-word flex-wrap " +
                (todo.completed
                  ? "text-gray-400 line-through"
                  : "text-gray-800")
              }
            >
              {todo.title}
            </div>
            <div className="flex flex-col items-center gap-2 sticky top-0">
              <button
                className="flex justify-center items-center w-10 h-10 cursor-pointer text-green-600 bg-green-100 md:bg-transparent hover:bg-green-100 rounded-full transition-all ease-in-out duration-300"
                onClick={() => toggleTodoAsync(todo.id)}
              >
                {todo.completed ? <Check size={16} /> : <Square size={16} />}
              </button>
              <button
                className="flex justify-center items-center w-10 h-10 cursor-pointer text-pink-600 bg-pink-100 md:bg-transparent hover:bg-pink-100 rounded-full transition-all ease-in-out duration-300"
                onClick={() => removeTodoAsync(todo.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Todos;
