
import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  Clock,
  ListTodo,
  Plus,
  ArrowRight,
  CalendarDays,
  TrendingUp,
  Target,
  MoreHorizontal,
  AlertCircle,
} from "lucide-react";

const stats = [
  {
    title: "Total Tasks",
    value: 24,
    description: "All your tasks",
    icon: ListTodo,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Completed",
    value: 16,
    description: "Tasks completed",
    icon: CheckCircle2,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Pending",
    value: 6,
    description: "Tasks remaining",
    icon: Clock,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Overdue",
    value: 2,
    description: "Need your attention",
    icon: AlertCircle,
    color: "bg-red-100 text-red-600",
  },
];

const recentTasks = [
  {
    id: 1,
    title: "Complete Next.js project",
    category: "Development",
    priority: "High",
    dueDate: "Today",
    completed: false,
  },
  {
    id: 2,
    title: "Read 20 pages of a book",
    category: "Personal",
    priority: "Low",
    dueDate: "Today",
    completed: true,
  },
  {
    id: 3,
    title: "Prepare project documentation",
    category: "Work",
    priority: "Medium",
    dueDate: "Tomorrow",
    completed: false,
  },
  {
    id: 4,
    title: "Review weekly progress",
    category: "Planning",
    priority: "Medium",
    dueDate: "Nov 20",
    completed: false,
  },
  {
    id: 5,
    title: "Learn TypeScript basics",
    category: "Learning",
    priority: "High",
    dueDate: "Nov 21",
    completed: true,
  },
];

const upcomingTasks = [
  {
    id: 1,
    title: "Finish portfolio website",
    date: "Nov 19, 2026",
    priority: "High",
  },
  {
    id: 2,
    title: "Submit assignment",
    date: "Nov 20, 2026",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Team meeting",
    date: "Nov 21, 2026",
    priority: "Low",
  },
];

function getPriorityStyle(priority: string) {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-600";
    case "Medium":
      return "bg-yellow-100 text-yellow-700";
    case "Low":
      return "bg-green-100 text-green-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

export default function DashboardPage() {
  const completedTasks = 16;
  const totalTasks = 24;
  const completionPercentage = Math.round(
    (completedTasks / totalTasks) * 100
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Welcome Section */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Tuesday, November 18, 2026
            </p>

            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              Welcome back! 👋
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Here's what's happening with your tasks today.
            </p>
          </div>

          <Link
            href="/todos"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Add New Task
          </Link>
        </section>

        {/* Statistics Cards */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Overview
            </h2>
            <p className="text-sm text-gray-500">
              Your task statistics at a glance.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {stat.title}
                      </p>

                      <h3 className="mt-2 text-3xl font-bold text-gray-900">
                        {stat.value}
                      </h3>
                    </div>

                    <div className={`rounded-xl p-3 ${stat.color}`}>
                      <Icon size={24} />
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-gray-400">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Progress and Quick Actions */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Progress Card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Task Progress
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Keep up the great work!
                </p>
              </div>

              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                <TrendingUp size={22} />
              </div>
            </div>

            <div className="mt-8 flex items-end justify-between">
              <div>
                <h3 className="text-4xl font-bold text-indigo-600">
                  {completionPercentage}%
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Overall completion
                </p>
              </div>

              <p className="text-sm font-medium text-gray-600">
                {completedTasks} of {totalTasks} tasks
              </p>
            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-5 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                <span className="text-gray-500">
                  Completed ({completedTasks})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                <span className="text-gray-500">
                  Remaining ({totalTasks - completedTasks})
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage your daily activities.
            </p>

            <div className="mt-6 space-y-3">
              <Link
                href="/todos"
                className="flex items-center gap-3 rounded-xl bg-indigo-50 p-4 text-indigo-700 transition hover:bg-indigo-100"
              >
                <Plus size={20} />
                <span className="text-sm font-semibold">
                  Create New Task
                </span>
                <ArrowRight size={17} className="ml-auto" />
              </Link>

              <Link
                href="/todos"
                className="flex items-center gap-3 rounded-xl bg-green-50 p-4 text-green-700 transition hover:bg-green-100"
              >
                <CheckCircle2 size={20} />
                <span className="text-sm font-semibold">
                  View Completed
                </span>
                <ArrowRight size={17} className="ml-auto" />
              </Link>

              <Link
                href="/todos"
                className="flex items-center gap-3 rounded-xl bg-yellow-50 p-4 text-yellow-700 transition hover:bg-yellow-100"
              >
                <Clock size={20} />
                <span className="text-sm font-semibold">
                  View Pending
                </span>
                <ArrowRight size={17} className="ml-auto" />
              </Link>
            </div>
          </div>
        </section>

        {/* Recent Tasks and Upcoming Tasks */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Recent Tasks */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Tasks
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Your latest activities.
                </p>
              </div>

              <Link
                href="/todos"
                className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                View All
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-6 divide-y divide-gray-100">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between gap-3 py-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {task.completed ? (
                      <CheckCircle2
                        size={21}
                        className="shrink-0 text-green-500"
                      />
                    ) : (
                      <Circle
                        size={21}
                        className="shrink-0 text-gray-300"
                      />
                    )}

                    <div className="min-w-0">
                      <h3
                        className={`truncate text-sm font-semibold ${
                          task.completed
                            ? "text-gray-400 line-through"
                            : "text-gray-800"
                        }`}
                      >
                        {task.title}
                      </h3>

                      <p className="mt-1 text-xs text-gray-400">
                        {task.category} · {task.dueDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <span
                      className={`hidden rounded-full px-3 py-1 text-xs font-medium sm:inline-block ${getPriorityStyle(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>

                    <button
                      type="button"
                      aria-label={`More options for ${task.title}`}
                      className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Upcoming Tasks
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  What's coming next?
                </p>
              </div>

              <CalendarDays className="text-indigo-600" size={22} />
            </div>

            <div className="mt-6 space-y-5">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Target size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {task.title}
                    </h3>

                    <p className="mt-1 text-xs text-gray-400">
                      {task.date}
                    </p>

                    <span
                      className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${getPriorityStyle(
                        task.priority
                      )}`}
                    >
                      {task.priority} Priority
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/todos"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 transition hover:border-indigo-600 hover:text-indigo-600"
            >
              View All Tasks
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Bottom Motivation Section */}
        <section className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold">
                Small steps lead to big achievements! 🚀
              </h2>

              <p className="mt-2 max-w-xl text-sm text-indigo-100">
                Stay consistent, complete your tasks, and make every day
                productive. You've got this!
              </p>
            </div>

            <Link
              href="/todos"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
            >
              Manage Tasks
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
