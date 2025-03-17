import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Todo, TodoStore } from '../types/todo';

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
      set({ todos: todos as Todo[], error: null });
    } catch (error) {
      set({ error: (error as Error).message });
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
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));