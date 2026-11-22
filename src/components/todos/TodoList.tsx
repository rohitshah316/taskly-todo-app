
"use client";

import { useState } from "react";
import TodoItem from "./TodoItem";
import TodoFilters from "./TodoFilters";
import Loader from "../ui/Loader";

export interface Todo {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  createdAt?: string;
}

interface TodoListProps {
  todos: Todo[];
  loading?: boolean;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

export default function TodoList({
  todos,
  loading = false,
  onToggle,
  onDelete,
  onEdit,
}: TodoListProps) {
  const [filter, setFilter] = useState<
    "all" | "active" | "completed"
  >("all");

  // Filter todos based on selected filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;

    if (filter === "completed") return todo.completed;

    return true;
  });

  const completedCount = todos.filter(
    (todo) => todo.completed
  ).length;

  const activeCount = todos.length - completedCount;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">

      {/* Todo Statistics */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="rounded-lg bg-blue-50 px-4 py-3">
          <p className="text-gray-500">Total Tasks</p>
          <h3 className="text-xl font-bold text-blue-600">
            {todos.length}
          </h3>
        </div>

        <div className="rounded-lg bg-yellow-50 px-4 py-3">
          <p className="text-gray-500">Active Tasks</p>
          <h3 className="text-xl font-bold text-yellow-600">
            {activeCount}
          </h3>
        </div>

        <div className="rounded-lg bg-green-50 px-4 py-3">
          <p className="text-gray-500">Completed Tasks</p>
          <h3 className="text-xl font-bold text-green-600">
            {completedCount}
          </h3>
        </div>
      </div>

      {/* Todo Filters */}
      <TodoFilters
        filter={filter}
        setFilter={setFilter}
      />

      {/* Todo List */}
      <div className="space-y-3">

        {filteredTodos.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
            <div className="mb-3 text-4xl">📝</div>

            <h3 className="text-lg font-semibold text-gray-700">
              No tasks found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {filter === "completed"
                ? "You haven't completed any tasks yet."
                : filter === "active"
                ? "You have no pending tasks."
                : "Start by adding your first task!"}
            </p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        )}

      </div>

      {/* Footer */}
      {todos.length > 0 && (
        <div className="flex justify-between border-t pt-4 text-sm text-gray-500">
          <span>
            {activeCount} tasks remaining
          </span>

          <span>
            {completedCount} completed
          </span>
        </div>
      )}

    </div>
  );
}
