import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoStore {
  isLoading: boolean;
  error: string | null;
  todos: Todo[];
  addTodoAsync: (title: string) => Promise<void>;
  toggleTodoAsync: (id: number) => Promise<void>;
  removeTodoAsync: (id: number) => Promise<void>;
}

const useTodoStore = create<TodoStore>()(
  persist(
    devtools((set) => ({
      isLoading: false,
      error: null,
      todos: [],
      addTodoAsync: async (title) => {
        set((state) => ({ isLoading: (state.isLoading = true) }));
        await new Promise((resolve) => setTimeout(resolve, 3)); // Simulate async operation
        set((state) => ({
          todos: [...state.todos, { id: Date.now(), title, completed: false }],
        }));
        set((state) => ({ isLoading: (state.isLoading = false) }));
      },

      toggleTodoAsync: async (id) => {
        set((state) => ({ isLoading: (state.isLoading = true) }));
        await new Promise((resolve) => setTimeout(resolve, 3)); // Simulate async operation
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        }));
        set((state) => ({ isLoading: (state.isLoading = false) }));
      },

      removeTodoAsync: async (id) => {
        set((state) => ({ isLoading: (state.isLoading = true) }));
        await new Promise((resolve) => setTimeout(resolve, 3)); // Simulate async operation
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        }));
        set((state) => ({ isLoading: (state.isLoading = false) }));
      },
    })),
    { name: "todo-storage" }
  )
);

export default useTodoStore;
