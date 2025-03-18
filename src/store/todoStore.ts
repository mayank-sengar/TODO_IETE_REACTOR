import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Todo, TodoStore } from '../types/todo';
import { openDB } from 'idb';

// Initialize IndexedDB
const dbPromise = openDB('todoDB', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('todos')) {
      db.createObjectStore('todos', { keyPath: 'id' });
    }
  },
});

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  isLoading: false,
  error: null,

  fetchTodos: async () => {
    set({ isLoading: true });
    try {
      const { data: todos, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Sync with IndexedDB
      const db = await dbPromise;
      const tx = db.transaction('todos', 'readwrite');
      await Promise.all(todos.map((todo) => tx.store.put(todo)));
      await tx.done;

      set({ todos: todos as Todo[], error: null });
    } catch (error) {
      // Fallback to IndexedDB if offline
      const db = await dbPromise;
      const todos = await db.getAll('todos');
      set({ todos: todos as Todo[], error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  addTodo: async (todo) => {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return;

    try {
      const { data, error } = await supabase
        .from('todos')
        .insert([{ ...todo, user_id: user.user.id }])
        .select()
        .single();

      if (error) throw error;

      // Sync with IndexedDB
      const db = await dbPromise;
      await db.put('todos', data);

      set((state) => ({ todos: [data as Todo, ...state.todos] }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  updateTodo: async (id, updates) => {
    try {
      const { error } = await supabase
        .from('todos')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      // Sync with IndexedDB
      const db = await dbPromise;
      const todo = await db.get('todos', id);
      if (todo) {
        await db.put('todos', { ...todo, ...updates });
      }

      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, ...updates } : todo
        ),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  deleteTodo: async (id) => {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Sync with IndexedDB
      const db = await dbPromise;
      await db.delete('todos', id);

      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));