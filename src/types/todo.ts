export interface Todo {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  due_date?: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  completed: boolean;
  created_at: string;
}

export interface TodoStore {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  addTodo: (todo: Omit<Todo, 'id' | 'user_id' | 'created_at'>) => Promise<void>;
  updateTodo: (id: string, todo: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  fetchTodos: () => Promise<void>;
}