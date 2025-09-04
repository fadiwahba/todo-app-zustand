import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Todo {
  id: number | string;
  title: string;
  completed: boolean;
}

interface TodoStore {
  isLoading: boolean;
  error: string | null;
  todos: Todo[];
  initializeFromServer: () => Promise<void>;
  addTodoAsync: (title: string) => Promise<void>;
  toggleTodoAsync: (id: number | string) => Promise<void>;
  removeTodoAsync: (id: number | string) => Promise<void>;
}

const useTodoStore = create<TodoStore>()(
  persist(
    devtools((set) => ({
      isLoading: false,
      error: null,
      todos: [],

      initializeFromServer: async () => {
        try {
          set({ isLoading: true, error: null });
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
          const res = await fetch("/api/todos?_limit=5"); // "https://jsonplaceholder.typicode.com/todos?_limit=5"
          const data = await res.json();
          set({ todos: data, isLoading: false });
        } catch (error) {
          console.log(
            "No API yet or network error, using cached data. ",
            error
          );
          set({ error: null, isLoading: false }); // Keep existing localStorage data
        }
      },
      addTodoAsync: async (title) => {
        const tempId = `temp-${Date.now()}`;

        // 1. Optimistic update - instant UI response
        set((state) => ({
          todos: [
            ...state.todos,
            { id: tempId, title, completed: false },
          ],
        }));

        try {
          // 2. Sync with backend (will fail gracefully for now)
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
          const res = await fetch("/api/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, completed: false }),
          });
          const realTodo = await res.json();

          // 3. Replace temp with real data
          set((state) => ({
            todos: state.todos.map((t) => (t.id === tempId ? realTodo : t)),
          }));
        } catch {
          // 4. Keep temp todo (offline mode) - user doesn't notice
          console.log("Offline mode - keeping temp ID for todo:", title);
          set((state) => ({
            todos: state.todos.map((t) =>
              t.id === tempId ? { ...t, id: Date.now() } : t
            ),
          }));
        }
      },

      toggleTodoAsync: async (id) => {
        // 1. Optimistic update - instant UI response
        const originalTodos = useTodoStore.getState().todos;
        const targetTodo = originalTodos.find((t) => t.id === id);
        if (!targetTodo) return;

        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        }));

        try {
          // 2. Sync with backend (will fail gracefully for now)
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
          const res = await fetch(`/api/todos/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: !targetTodo.completed }),
          });
          const updatedTodo = await res.json();

          // 3. Update with server response
          set((state) => ({
            todos: state.todos.map((t) => (t.id === id ? updatedTodo : t)),
          }));
        } catch (error) {
          console.error("Error toggling todo:", error);
          // 4. Keep optimistic update (offline mode)
          console.log("Offline mode - keeping optimistic toggle for todo:", id);
        }
      },

      removeTodoAsync: async (id) => {
        // 1. Store original state for potential rollback
        const originalTodos = useTodoStore.getState().todos;
        const todoToRemove = originalTodos.find((t) => t.id === id);
        if (!todoToRemove) return;

        // 2. Optimistic update - instant UI response
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        }));

        try {
          // 3. Sync with backend (will fail gracefully for now)
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
          await fetch(`/api/todos/${id}`, {
            method: "DELETE",
          });

          // 4. Success - todo already removed optimistically
          console.log("Todo deleted from server:", id);
        } catch (error) {
          console.error("Error toggling todo:", error);
          // 5. Rollback on failure - restore the todo
          console.log("Offline mode - rollback delete for todo:", id);
          set((state) => ({
            todos: [...state.todos, todoToRemove].sort(
              (a, b) =>
                (typeof a.id === "number" ? a.id : 0) -
                (typeof b.id === "number" ? b.id : 0)
            ),
          }));
        }
      },
    })),
    { name: "todo-storage" }
  )
);

export default useTodoStore;
