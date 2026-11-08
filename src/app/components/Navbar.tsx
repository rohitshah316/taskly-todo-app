
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/95 px-6 py-4 text-white shadow-lg backdrop-blur-md md:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          Taskly<span className="text-indigo-400">.</span>
        </Link>

        {/* Navigation Links */}
        <ul className="hidden items-center gap-8 md:flex">
          <li>
            <Link href="#home" className="text-sm font-medium text-slate-300 transition hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link href="#features" className="text-sm font-medium text-slate-300 transition hover:text-indigo-400">
              Features
            </Link>
          </li>
          <li>
            <Link href="#about" className="text-sm font-medium text-slate-300 transition hover:text-indigo-400">
              About
            </Link>
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-400 hover:shadow-indigo-500/40"
          >
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;