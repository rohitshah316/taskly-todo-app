
"use client";

import { Bell, Search, User, Menu } from "lucide-react";
import { useState } from "react";

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
}

export default function DashboardHeader({
  title = "Dashboard",
  subtitle = "Welcome back! Here's what's happening today.",
}: DashboardHeaderProps) {
  const [search, setSearch] = useState("");

  return (
    <header className="w-full bg-white border-b border-gray-200 px-4 md:px-8 py-4">
      <div className="flex items-center justify-between gap-4">

        {/* Left Section */}
        <div className="flex items-center gap-3">
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <Menu size={22} />
          </button>

          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              {title}
            </h1>
            <p className="text-sm text-gray-500 mt-1 hidden sm:block">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">

          {/* Search */}
          <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <Search size={18} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search todos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none px-2 text-sm w-32 md:w-48 text-gray-700"
            />
          </div>

          {/* Notification */}
          <button
            aria-label="Notifications"
            className="relative p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Bell size={21} className="text-gray-600" />

            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 transition">
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center">
              <User size={20} className="text-indigo-600" />
            </div>

            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-800">
                John Doe
              </p>
              <p className="text-xs text-gray-500">
                User
              </p>
            </div>
          </button>

        </div>
      </div>
    </header>
  );
}
