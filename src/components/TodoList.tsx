import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { CheckCircle2, Circle, Trash2, Edit2, Save, X } from 'lucide-react';
import { useTodoStore } from '../store/todoStore';
import type { Todo } from '../types/todo';

export function TodoList() {
  const { todos, fetchTodos, updateTodo, deleteTodo } = useTodoStore();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [category, setCategory] = useState<string>('all');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null); // Track which todo is being edited
  const [editedTodo, setEditedTodo] = useState<Partial<Todo>>({}); // Store edited values

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

  const startEditing = (todo: Todo) => {
    setEditingTodo(todo);
    setEditedTodo({ ...todo }); // Initialize with current todo details
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedTodo((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    if (editingTodo && editedTodo) {
      await updateTodo(editingTodo.id, editedTodo);
      setEditingTodo(null); // Exit edit mode
    }
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
            {editingTodo?.id === todo.id ? (
              // Edit Mode Form
              <div className="flex flex-col w-full space-y-2">
                <input
                  name="title"
                  value={editedTodo.title || ''}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded-md"
                />
                <textarea
                  name="description"
                  value={editedTodo.description || ''}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded-md"
                  rows={2}
                />
                <select
                  name="category"
                  value={editedTodo.category || ''}
                  onChange={handleEditChange}
                  className="p-2 border rounded-md"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>

                <div className="flex space-x-2">
                  <select
                    name="priority"
                    value={editedTodo.priority || 'low'}
                    onChange={handleEditChange}
                    className="p-2 border rounded-md"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>

                  <input
                    type="date"
                    name="due_date"
                    value={editedTodo.due_date || ''}
                    onChange={handleEditChange}
                    className="p-2 border rounded-md"
                  />
                </div>

                <div className="flex space-x-2">
                  <button onClick={saveEdit} className="p-2 bg-green-500 text-white rounded-md flex items-center">
                    <Save className="h-4 w-4 mr-1" /> Save
                  </button>
                  <button onClick={() => setEditingTodo(null)} className="p-2 bg-gray-300 rounded-md flex items-center">
                    <X className="h-4 w-4 mr-1" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Normal Todo View
              <div className="flex items-center justify-between w-full">
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
                  <button onClick={() => startEditing(todo)} className="p-2 hover:bg-gray-100 rounded-full">
                    <Edit2 className="h-5 w-5 text-gray-500" />
                  </button>
                  <button onClick={() => deleteTodo(todo.id)} className="p-2 hover:bg-gray-100 rounded-full">
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
