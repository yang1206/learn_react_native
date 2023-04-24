import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { mmkvStorage } from '@/utils'

export interface Todo {
  id: string
  task: string
  priority: string
  dueDate: string
  label: string
}

export interface TodoStore {
  todos: Todo[]
  addTodo: (todo: Todo) => void
  removeTodo: (id: string) => void
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get, api) => ({
      todos: [],
      addTodo: todo => set(state => ({ todos: [...state.todos, todo] })),
      removeTodo: id =>
        set(state => ({ todos: state.todos.filter(todo => todo.id !== id) })),
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
)
