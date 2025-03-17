import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { CheckCircle2, Circle, Trash2, Edit2 } from 'lucide-react';
import { useTodoStore } from '../store/todoStore';
import type { Todo } from '../types/todo';

export function TodoList() {
  const { todos, fetchTodos, updateTodo, deleteTodo } = useTodoStore();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [category, setCategory] = useState<string>('all');

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const filteredTodos = todos.filter((todo) => {
    const categoryMatch = category === 'all' || todo.category === category;
    const statusMatch =
      filter === 'all' ||
      (filter === 'active' && !todo.completed) ||
      (filter === 'completed' && todo.completed);
    return categoryMatch && statusMatch;
  });

  const categories = ['all', ...new Set(todos.map((todo) => todo.category))];

  const toggleTodo = async (todo: Todo) => {
    await updateTodo(todo.id, { completed: !todo.completed });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-6">
        <select
          className="px-3 py-2 border rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <select
          className="px-3 py-2 border rounded-md"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          >
            <div className="flex items-center space-x-3">
              <button onClick={() => toggleTodo(todo)}>
                {todo.completed ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                ) : (
                  <Circle className="h-6 w-6 text-gray-400" />
                )}
              </button>
              <div>
                <p
                  className={`text-lg ${
                    todo.completed ? 'line-through text-gray-400' : ''
                  }`}
                >
                  {todo.title}
                </p>
                {todo.description && (
                  <p className="text-sm text-gray-500">{todo.description}</p>
                )}
                <div className="flex space-x-2 mt-1">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      todo.priority === 'high'
                        ? 'bg-red-100 text-red-800'
                        : todo.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {todo.priority}
                  </span>
                  <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                    {todo.category}
                  </span>
                  {todo.due_date && (
                    <span className="text-xs px-2 py-1 rounded bg-purple-100 text-purple-800">
                      Due: {format(new Date(todo.due_date), 'MMM d, yyyy')}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {/* Implement edit */}}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Edit2 className="h-5 w-5 text-gray-500" />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}