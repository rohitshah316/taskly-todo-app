"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  CheckCircle2,
  Circle,
  Trash2,
  Pencil,
  X,
  CalendarDays,
  ListTodo,
  Clock,
  CheckCheck,
  AlertCircle,
  Filter,
  Loader2,
  ClipboardList,
} from "lucide-react";

type Priority = "LOW" | "MEDIUM" | "HIGH";
type FilterType = "ALL" | "ACTIVE" | "COMPLETED";

interface Todo {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  priority: Priority;
  dueDate?: string | null;
  createdAt?: string;
}

const initialForm = {
  title: "",
  description: "",
  priority: "MEDIUM" as Priority,
  dueDate: "",
};

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [filter, setFilter] = useState<FilterType>("ALL");
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  // Fetch todos
  const fetchTodos = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/todos");

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await response.json();

      setTodos(Array.isArray(data) ? data : data.todos ?? []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load todos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Statistics
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;

  const completionPercentage =
    totalTodos > 0
      ? Math.round((completedTodos / totalTodos) * 100)
      : 0;

  // Search and filter
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesSearch =
        todo.title.toLowerCase().includes(search.toLowerCase()) ||
        (todo.description ?? "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "ALL" ||
        (filter === "ACTIVE" && !todo.completed) ||
        (filter === "COMPLETED" && todo.completed);

      return matchesSearch && matchesFilter;
    });
  }, [todos, search, filter]);

  // Open add modal
  const openAddModal = () => {
    setEditingTodo(null);
    setForm(initialForm);
    setError("");
    setIsModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (todo: Todo) => {
    setEditingTodo(todo);

    setForm({
      title: todo.title,
      description: todo.description ?? "",
      priority: todo.priority,
      dueDate: todo.dueDate
        ? todo.dueDate.slice(0, 10)
        : "",
    });

    setError("");
    setIsModalOpen(true);
  };

  // Create or update todo
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setError("Please enter a todo title.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const isEditing = Boolean(editingTodo);

      const response = await fetch(
        isEditing
          ? `/api/todos/${editingTodo!.id}`
          : "/api/todos",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: form.title.trim(),
            description: form.description.trim(),
            priority: form.priority,
            dueDate: form.dueDate || null,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save todo");
      }

      await fetchTodos();

      setIsModalOpen(false);
      setForm(initialForm);
      setEditingTodo(null);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Toggle completed status
  const toggleTodo = async (todo: Todo) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === todo.id
          ? { ...item, completed: !item.completed }
          : item
      )
    );

    try {
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }
    } catch (err) {
      console.error(err);
      await fetchTodos();
    }
  };

  // Delete todo
  const deleteTodo = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this todo?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      setTodos((prev) =>
        prev.filter((todo) => todo.id !== id)
      );
    } catch (err) {
      console.error(err);
      setError("Unable to delete todo. Please try again.");
    }
  };

  // Priority styles
  const priorityStyles: Record<Priority, string> = {
    LOW: "bg-green-500/10 text-green-400 border-green-500/20",
    MEDIUM: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    HIGH: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  // Format date
  const formatDate = (date?: string | null) => {
    if (!date) return null;

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  
  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 lg:p-8">

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-blue-400 text-sm mb-2">
            <ListTodo size={17} />
            <span>Task Management</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            My Todos
          </h1>

          <p className="text-slate-400 mt-2">
            Organize your tasks and get things done.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-5 py-3 rounded-xl font-medium transition"
        >
          <Plus size={20} />
          Add New Task
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Tasks" value={totalTodos}
          icon={<ClipboardList size={22} />}
          color="text-blue-400" bg="bg-blue-500/10" />

        <StatCard title="Completed" value={completedTodos}
          icon={<CheckCircle2 size={22} />}
          color="text-green-400" bg="bg-green-500/10" />

        <StatCard title="In Progress" value={activeTodos}
          icon={<Clock size={22} />}
          color="text-amber-400" bg="bg-amber-500/10" />

        <StatCard title="Completion Rate" value={`${completionPercentage}%`}
          icon={<CheckCheck size={22} />}
          color="text-cyan-400" bg="bg-cyan-500/10" />
      </div>

      {/* Progress */}
      <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 mb-8">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="font-semibold">Overall Progress</h2>
            <p className="text-sm text-slate-400 mt-1">
              Keep going! Every completed task counts.
            </p>
          </div>
          <span className="text-blue-400 font-bold text-xl">
            {completionPercentage}%
          </span>
        </div>

        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        <div className="flex justify-between text-xs text-slate-500 mt-3">
          <span>{completedTodos} completed</span>
          <span>{activeTodos} remaining</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="relative flex-1">
            <Search size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              type="text"
              placeholder="Search your tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter size={18} className="text-slate-400 shrink-0" />

            {(["ALL", "ACTIVE", "COMPLETED"] as FilterType[]).map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                    filter === item
                      ? "bg-blue-500 text-white"
                      : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                  }`}
                >
                  {item === "ALL" ? "All Tasks" :
                   item === "ACTIVE" ? "Active" : "Completed"}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Todo List */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Your Tasks</h2>
        <span className="text-sm text-slate-400">
          {filteredTodos.length} tasks found
        </span>
      </div>

      {error && !isModalOpen && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-4 mb-5 flex items-center gap-2">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {loading ? (
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-16 flex flex-col items-center">
          <Loader2 size={35} className="text-blue-400 animate-spin mb-4" />
          <p className="text-slate-400">Loading your tasks...</p>
        </div>
      ) : filteredTodos.length === 0 ? (
        <div className="bg-slate-900 border border-white/10 border-dashed rounded-2xl p-12 text-center">
          <ClipboardList size={30} className="text-blue-400 mx-auto mb-5" />

          <h3 className="text-xl font-semibold mb-2">
            {search ? "No matching tasks" :
             filter === "COMPLETED" ? "No completed tasks yet" :
             filter === "ACTIVE" ? "No active tasks" : "No tasks yet"}
          </h3>

          <p className="text-slate-400 text-sm mb-6">
            Start organizing your day by creating your first task.
          </p>

          {!search && filter === "ALL" && (
            <button onClick={openAddModal}
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 px-5 py-3 rounded-xl transition font-medium">
              <Plus size={18} />
              Create Your First Task
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {filteredTodos.map((todo) => (
            <div key={todo.id}
              className={`bg-slate-900 border border-white/10 rounded-2xl p-5 hover:border-blue-500/30 transition ${todo.completed ? "opacity-75" : ""}`}>
              <div className="flex items-start gap-4">

                <button onClick={() => toggleTodo(todo)}
                  aria-label="Toggle completion" className="mt-1 shrink-0">
                  {todo.completed
                    ? <CheckCircle2 size={23} className="text-green-400" />
                    : <Circle size={23} className="text-slate-500 hover:text-blue-400" />}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className={`font-semibold break-words ${todo.completed ? "text-slate-500 line-through" : "text-white"}`}>
                      {todo.title}
                    </h3>

                    <span className={`text-xs px-2.5 py-1 rounded-full border ${priorityStyles[todo.priority] ?? priorityStyles.MEDIUM}`}>
                      {todo.priority}
                    </span>
                  </div>

                  {todo.description && (
                    <p className="text-sm text-slate-400 mb-4 break-words">
                      {todo.description}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    {todo.dueDate && (
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={14} />
                        {formatDate(todo.dueDate)}
                      </span>
                    )}

                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {todo.completed ? "Completed" : "In progress"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => openEditModal(todo)}
                    aria-label="Edit todo"
                    className="p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10">
                    <Pencil size={17} />
                  </button>

                  <button onClick={() => deleteTodo(todo.id)}
                    aria-label="Delete todo"
                    className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10">
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl">

            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold">
                  {editingTodo ? "Edit Task" : "Create New Task"}
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Add or update your task details.
                </p>
              </div>

              <button onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">

              <div>
                <label className="block text-sm font-medium mb-2">
                  Task Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="What needs to be done?"
                  maxLength={200}
                  required
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Add details about your task..."
                  rows={4}
                  className="w-full resize-none bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Priority
                </label>
                <select
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
                >
                  <option value="LOW">Low Priority</option>
                  <option value="MEDIUM">Medium Priority</option>
                  <option value="HIGH">High Priority</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 [color-scheme:dark]"
                />
              </div>

              {error && (
                <p className="text-sm text-red-400 flex items-center gap-2">
                  <AlertCircle size={16} />
                  {error}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl py-3 font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-white rounded-xl py-3 font-medium"
                >
                  {saving ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Plus size={18} />
                      {editingTodo ? "Update Task" : "Create Task"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Statistics Card
function StatCard({
  title,
  value,
  icon,
  color,
  bg,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  bg: string;
}) {
  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-400">{title}</p>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${bg} ${color}`}>
          {icon}
        </div>
      </div>
      <h3 className="text-3xl font-bold text-white">{value}</h3>
    </div>
  );
}
