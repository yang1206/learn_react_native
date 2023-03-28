import { StateCreator } from "zustand"

export type Todo = {
  id: string;
  task: string;
  priority: string;
  dueDate: string;
  label: string;
};


export   type TodoStore = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
};

export const createTodoSlice : StateCreator<TodoStore> = ((set, get) => ({
  todos: [],
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  removeTodo: (id) =>
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
}))
