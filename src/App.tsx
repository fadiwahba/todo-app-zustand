import AddTodo from "./components/add-todo";
import Todos from "./components/todos";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-start bg-gradient-to-br from-pink-50 via-amber-50 to-cyan-50 px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex w-full max-w-sm sm:max-w-md lg:max-w-lg flex-col items-center justify-center space-y-6 sm:space-y-8">
        <div className="text-center space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-thin bg-gradient-to-r from-pink-400 via-amber-400 to-cyan-400 bg-clip-text text-transparent tracking-wider">
            TODO APP
          </h1>

          <h2 className="text-sm sm:text-base md:text-lg font-light text-gray-600 px-2 sm:px-0 leading-relaxed">
            A simple todo app built with React, TypeScript, Tailwind CSS, and
            Zustand for state management.
          </h2>
        </div>

        <div className="flex w-full flex-col gap-4 sm:gap-6 items-center justify-start rounded-lg border-2 border-white p-4 sm:p-6 lg:p-10 shadow-xl backdrop-blur-md bg-gradient-to-br from-cyan-100 to-orange-100 max-h-[70vh] sm:max-h-[700px] overflow-y-auto">
          <div className="flex flex-col gap-4 w-full">
            <AddTodo />
            <Todos />
          </div>
        </div>
      </div>
      <Analytics />
    </main>
  );
}

export default App;
