import AddTodo from "./components/add-todo";
import Todos from "./components/todos";

function App() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-start bg-gradient-to-br from-pink-50 via-amber-50 to-cyan-50 py-8 gap-6">
      <div className="flex flex-col items-center justify-center space-y-8">
        <h1 className="text-3xl md:text-7xl font-thin text-center bg-gradient-to-r from-pink-400 via-amber-400 to-cyan-400 bg-clip-text text-transparent tracking-wider">
          TODO APP
        </h1>

        <h2 className="text-md md:text-lg font-light text-center text-gray-600 mb-4 w-md">
          A simple todo app built with React, TypeScript, Tailwind CSS, and
          Zustand for state management.
        </h2>
        <div className="flex w-full max-w-md max-h-[700px] flex-col gap-6 items-center justify-start rounded-lg border-2 border-white p-10 shadow-xl backdrop-blur-md overflow-y-auto bg-gradient-to-br from-cyan-100 to-orange-100">
          <div className="flex flex-col gap-4 w-full">
            <AddTodo />
            <Todos />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
