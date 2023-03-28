import AsyncStorage from '@react-native-community/async-storage'
import { create, } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { createTodoSlice, TodoStore } from './TodoSlice'

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
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
