
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    console.log({ email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-300 px-4 py-12 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-8 shadow-2xl">


        <Link
          href="/"
          className="mb-8 block text-center text-3xl font-extrabold tracking-tight"
        >
          Taskly<span className="text-blue-400">.</span>
        </Link>

   
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">
            Welcome Back!
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Login to manage your tasks seamlessly.
          </p>
        </div>

    
        <form onSubmit={handleSubmit} className="space-y-5">

         
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-slate-800 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-300"
              >
                Password
              </label>

              <Link
                href="/forgot-password"
                className="text-xs font-medium text-blue-400 transition hover:text-blue-300"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-slate-800 py-3 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-white/20 bg-slate-800 accent-blue-500"
            />

            <label
              htmlFor="remember"
              className="text-sm text-slate-400"
            >
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-blue-400 hover:shadow-indigo-500/40"
          >
            Login
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-8 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-blue-400 transition hover:text-blue-300"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginForm;
