
"use client";

import React from "react";

interface TodoFiltersProps {
  filter: "all" | "completed" | "pending";
  setFilter: (filter: "all" | "completed" | "pending") => void;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({
  filter,
  setFilter,
}) => {
  const filters = [
    { label: "All Tasks", value: "all" },
    { label: "Completed", value: "completed" },
    { label: "Pending", value: "pending" },
  ] as const;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {filters.map((item) => (
        <button
          key={item.value}
          onClick={() => setFilter(item.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            filter === item.value
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default TodoFilters;
