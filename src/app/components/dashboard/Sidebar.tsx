
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  Settings,
  LogOut,
  X,
  ListTodo,
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Todos",
    href: "/todos",
    icon: CheckSquare,
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: CalendarDays,
  },
];

const bottomItems = [
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  isOpen = true,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2"
            onClick={onClose}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <ListTodo size={23} />
            </div>

            <span className="text-2xl font-bold text-gray-900">
              Taskly
            </span>
          </Link>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 md:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4 py-6">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Menu
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  active
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                }`}
              >
                <Icon size={20} />

                <span>{item.name}</span>

                {active && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-indigo-600" />
                )}
              </Link>
            );
          })}

          {/* Bottom Navigation */}
          <div className="pt-8">
            <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              General
            </p>

            {bottomItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    active
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center gap-3 rounded-xl p-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
              U
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900">
                User Name
              </p>
              <p className="truncate text-xs text-gray-500">
                user@example.com
              </p>
            </div>

            <button
              className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-500"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut size={19} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
