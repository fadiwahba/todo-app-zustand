import useTodoStore from "../lib/stores/useTodoStore";
import { useEffect, useState } from "react";
import Loader from "./loader";
import { Trash2 } from "lucide-react";

const loadTodos = async () => {
  try {
    useTodoStore.setState((state) => ({ isLoading: (state.isLoading = true) }));
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    const data = await res.json();
    useTodoStore.setState({ todos: data, isLoading: false });
  } catch (error) {
    console.error("Failed to load todos: ", error);
    useTodoStore.setState({ error: "Failed to load todos", isLoading: false });
  }
};

const Todos = () => {
  const isLoading = useTodoStore((state) => state.isLoading);
  const todos = useTodoStore((state) => state.todos);
  const addTodoAsync = useTodoStore((state) => state.addTodoAsync);
  const removeTodoAsync = useTodoStore((state) => state.removeTodoAsync);
  const toggleTodoAsync = useTodoStore((state) => state.toggleTodoAsync);
  const [text, setText] = useState("");

  useEffect(() => {
    loadTodos();

    return () => {
      // cleanup if needed
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodoAsync(text);
          setText("");
        }}
      >
        <div className="flex gap-4">
          <input
            className="bg-gray-50 border border-gray-300 rounded px-4 py-2 flex-1"
            value={text}
            placeholder="Add a new todo"
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            className="cursor-pointer shadow-sm w-fit px-6 py-2 bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-white rounded transition-all ease-in-out duration-300"
          >
            Add
          </button>
        </div>
      </form>
      <ul className="flex flex-col gap-4">
        {todos.map((todo) => (
          <li
            className={`flex justify-between gap-4 p-4 rounded cursor-pointer shadow-sm hover:shadow-lg transition-all ease-in-out duration-300 ${
              todo.completed ? "bg-green-100" : "bg-gray-50"
            }`}
            key={todo.id}
          >
            <p
              onClick={() => toggleTodoAsync(todo.id)}
              className={
                "flex-1 " +
                (todo.completed
                  ? "text-gray-400 line-through"
                  : "text-gray-800")
              }
            >
              {todo.title}
            </p>
            <button
              className="flex justify-center items-center w-8 h-8 cursor-pointer text-red-700 hover:bg-gray-200 rounded-full transition-all ease-in-out duration-300"
              onClick={() => removeTodoAsync(todo.id)}
            >
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Todos;
