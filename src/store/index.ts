import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { MMKV } from 'react-native-mmkv'
import type { TodoStore } from './TodoSlice'
import { createTodoSlice } from './TodoSlice'
const storage = new MMKV()
export interface ZustandStorage {
  getItem: (name: string) => string | null | Promise<string | null>
  setItem: (name: string, value: string) => void | Promise<void>
  removeItem: (name: string) => void | Promise<void>
}
export const mmkvStorage: ZustandStorage = {
  setItem: (key, value) => storage.set(key, value),
  getItem: key => storage.getString(key) || null,
  removeItem: key => storage.delete(key),
}

interface IStore extends TodoStore { }

/**
 * Make sure to enforce type for each slice
 */

export const useStore = create<IStore>()(
  persist(
    (set, get, api) => ({
      ...createTodoSlice(set, get, api),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
)
