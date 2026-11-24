
"use client";

import { useState, FormEvent } from "react";

interface TodoFormProps {
  onSubmit: (todo: {
    title: string;
    description: string;
  }) => Promise<void>;
}

export default function TodoForm({ onSubmit }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate title
    if (!title.trim()) {
      setError("Please enter a todo title.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await onSubmit({
        title: title.trim(),
        description: description.trim(),
      });

      // Reset form after successful submission
      setTitle("");
      setDescription("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-1 text-xl font-semibold text-gray-800">
        Add New Task
      </h2>

      <p className="mb-5 text-sm text-gray-500">
        Create a new task to stay organized.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Todo Title */}
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Task Title *
          </label>

          <input
            id="title"
            type="text"
            placeholder="Enter your task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            maxLength={100}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />
        </div>

        {/* Todo Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Description
          </label>

          <textarea
            id="description"
            rows={4}
            placeholder="Enter task description (optional)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            maxLength={500}
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Adding Task..." : "+ Add Task"}
        </button>
      </form>
    </div>
  );
}
