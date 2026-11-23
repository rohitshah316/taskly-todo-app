
"use client";

import { Todo } from "@/types/todo";
import { Check, Pencil, Trash2, Clock } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onEdit,
  onDelete,
}: TodoItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">

      {/* Todo Information */}
      <div className="flex min-w-0 flex-1 items-start gap-3">

        {/* Complete Button */}
        <button
          onClick={() => onToggle(todo.id)}
          aria-label={
            todo.completed ? "Mark as incomplete" : "Mark as complete"
          }
          className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
            todo.completed
              ? "border-green-500 bg-green-500 text-white"
              : "border-gray-300 hover:border-green-500"
          }`}
        >
          {todo.completed && <Check size={15} />}
        </button>

        {/* Title and Description */}
        <div className="min-w-0 flex-1">
          <h3
            className={`break-words text-base font-semibold ${
              todo.completed
                ? "text-gray-400 line-through"
                : "text-gray-800"
            }`}
          >
            {todo.title}
          </h3>

          {todo.description && (
            <p className="mt-1 break-words text-sm text-gray-500">
              {todo.description}
            </p>
          )}

          {/* Due Date */}
          {todo.dueDate && (
            <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
              <Clock size={13} />
              <span>
                {new Date(todo.dueDate).toLocaleDateString()}
              </span>
            </div>
          )}

          {/* Priority */}
          {todo.priority && (
            <span
              className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-medium ${
                todo.priority === "HIGH"
                  ? "bg-red-100 text-red-600"
                  : todo.priority === "MEDIUM"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {todo.priority}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex shrink-0 items-center gap-2">

        {/* Edit Button */}
        <button
          onClick={() => onEdit(todo)}
          aria-label="Edit todo"
          className="rounded-lg p-2 text-blue-500 transition hover:bg-blue-50"
        >
          <Pencil size={18} />
        </button>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(todo.id)}
          aria-label="Delete todo"
          className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
        >
          <Trash2 size={18} />
        </button>

      </div>
    </div>
  );
}
