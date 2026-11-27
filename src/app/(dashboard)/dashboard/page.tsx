
"use client";

import {
  CheckCircle2,
  Circle,
  Clock,
  ClipboardList,
  Plus,
  ArrowUpRight,
  CalendarDays,
  TrendingUp,
  AlertCircle,
  MoreHorizontal,
  ListTodo,
  Target,
  CheckCheck,
} from "lucide-react";

import Link from "next/link";

const stats = [
  {
    title: "Total Tasks",
    value: 24,
    description: "Tasks created so far",
    icon: ClipboardList,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    title: "Completed",
    value: 16,
    description: "Tasks successfully done",
    icon: CheckCircle2,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    title: "Pending",
    value: 6,
    description: "Tasks waiting for you",
    icon: Clock,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    title: "Overdue",
    value: 2,
    description: "Tasks past their deadline",
    icon: AlertCircle,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
];

const recentTasks = [
  {
    id: 1,
    title: "Complete Next.js project",
    description: "Finish the Taskly application",
    priority: "High",
    category: "Development",
    completed: false,
    dueDate: "Today",
  },
  {
    id: 2,
    title: "Review database schema",
    description: "Check Prisma models and relationships",
    priority: "Medium",
    category: "Development",
    completed: false,
    dueDate: "Today",
  },
  {
    id: 3,
    title: "Read documentation",
    description: "Study NextAuth authentication",
    priority: "Low",
    category: "Learning",
    completed: true,
    dueDate: "Yesterday",
  },
  {
    id: 4,
    title: "Design landing page",
    description: "Create a responsive homepage",
    priority: "High",
    category: "Design",
    completed: true,
    dueDate: "Yesterday",
  },
  {
    id: 5,
    title: "Prepare project report",
    description: "Write the project documentation",
    priority: "Medium",
    category: "Personal",
    completed: false,
    dueDate: "Tomorrow",
  },
];

const priorityStyles: Record<string, string> = {
  High: "bg-red-500/10 text-red-400 border-red-500/20",
  Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Low: "bg-green-500/10 text-green-400 border-green-500/20",
};

export default function DashboardPage() {
  const completedTasks = recentTasks.filter(
    (task) => task.completed
  ).length;

  const totalTasks = stats[0].value;
  const progress = Math.round(
    (stats[1].value / totalTasks) * 100
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl space-y-8 p-5 md:p-8">

        {/* Welcome Section */}
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-medium text-blue-400">
              Welcome back 👋
            </p>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Your Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Manage your tasks and stay productive throughout the day.
            </p>
          </div>

          <Link
            href="/todos"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
          >
            <Plus size={18} />
            Create New Task
          </Link>
        </section>

        {/* Statistics Cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-white/10 bg-slate-900 p-5 transition hover:border-blue-500/30"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg}`}
                  >
                    <Icon size={22} className={stat.color} />
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-slate-500"
                  />
                </div>

                <div className="mt-5">
                  <p className="text-sm text-slate-400">
                    {stat.title}
                  </p>

                  <h2 className="mt-1 text-3xl font-bold">
                    {stat.value}
                  </h2>

                  <p className="mt-2 text-xs text-slate-500">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </section>

        {/* Progress and Productivity */}
        <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">

          {/* Progress Card */}
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  Task Progress
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Your overall productivity overview
                </p>
              </div>

              <div className="rounded-xl bg-blue-500/10 p-3">
                <Target className="text-blue-400" size={22} />
              </div>
            </div>

            <div className="mt-8 flex items-end justify-between">
              <div>
                <h3 className="text-4xl font-bold">
                  {progress}%
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Overall completion
                </p>
              </div>

              <p className="text-sm text-slate-400">
                {stats[1].value} of {totalTasks} tasks
              </p>
            </div>

            <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-blue-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs text-slate-500">
                  Completed
                </p>
                <p className="mt-1 font-semibold text-green-400">
                  16 Tasks
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  In Progress
                </p>
                <p className="mt-1 font-semibold text-amber-400">
                  6 Tasks
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Remaining
                </p>
                <p className="mt-1 font-semibold text-blue-400">
                  8 Tasks
                </p>
              </div>
            </div>
          </div>

          {/* Productivity Card */}
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Productivity
              </h2>

              <TrendingUp className="text-green-400" size={22} />
            </div>

            <div className="mt-8 text-center">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-8 border-green-500/20">
                <div className="text-center">
                  <p className="text-3xl font-bold">80%</p>
                  <p className="text-xs text-slate-400">
                    This week
                  </p>
                </div>
              </div>

              <p className="mt-6 text-sm font-medium text-green-400">
                Great progress!
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Keep completing your tasks and maintain your productivity.
              </p>
            </div>
          </div>
        </section>

        {/* Recent Tasks */}
        <section className="rounded-2xl border border-white/10 bg-slate-900">

          {/* Section Header */}
          <div className="flex flex-col justify-between gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <h2 className="text-lg font-semibold">
                Recent Tasks
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Keep track of your latest activities
              </p>
            </div>

            <Link
              href="/todos"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition hover:text-blue-300"
            >
              View All Tasks
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Task List */}
          <div className="divide-y divide-white/5">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col justify-between gap-4 p-5 transition hover:bg-slate-800/40 sm:flex-row sm:items-center sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {task.completed ? (
                      <CheckCircle2
                        size={21}
                        className="text-green-400"
                      />
                    ) : (
                      <Circle
                        size={21}
                        className="text-slate-500"
                      />
                    )}
                  </div>

                  <div>
                    <h3
                      className={`text-sm font-medium ${
                        task.completed
                          ? "text-slate-500 line-through"
                          : "text-white"
                      }`}
                    >
                      {task.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      {task.description}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-400">
                        {task.category}
                      </span>

                      <span
                        className={`rounded-md border px-2 py-1 text-xs ${
                          priorityStyles[task.priority]
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <CalendarDays size={15} />
                    {task.dueDate}
                  </div>

                  <button
                    type="button"
                    aria-label={`More options for ${task.title}`}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
                  >
                    <MoreHorizontal size={19} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 p-4 text-center">
            <Link
              href="/todos"
              className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
            >
              Explore all your tasks →
            </Link>
          </div>
        </section>

        {/* Bottom Quick Actions */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <Link
            href="/todos"
            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900 p-5 transition hover:border-blue-500/40"
          >
            <div className="rounded-xl bg-blue-500/10 p-3">
              <ListTodo className="text-blue-400" size={23} />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold">
                Manage Tasks
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Create, edit and organize your todos.
              </p>
            </div>

            <ArrowUpRight
              size={19}
              className="text-slate-500 transition group-hover:text-blue-400"
            />
          </Link>

          <Link
            href="/todos"
            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900 p-5 transition hover:border-green-500/40"
          >
            <div className="rounded-xl bg-green-500/10 p-3">
              <CheckCheck className="text-green-400" size={23} />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold">
                Completed Tasks
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Review all your completed activities.
              </p>
            </div>

            <ArrowUpRight
              size={19}
              className="text-slate-500 transition group-hover:text-green-400"
            />
          </Link>
        </section>

        {/* Footer Note */}
        <footer className="pb-4 text-center text-xs text-slate-500">
          Stay focused. Stay productive. Stay organized with Taskly.
        </footer>

      </div>
    </div>
  );
}
