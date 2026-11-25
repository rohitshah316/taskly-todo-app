


const year=new Date().getFullYear();
export const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white py-6 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

        <p className="text-sm text-gray-300">
          © {year} Taskly. All rights reserved.
        </p>

        <a
          href="https://github.com/rohitshah316"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-purple-300 hover:text-purple-400 transition"
        >
    
          <span className="text-sm font-medium">GitHub</span>
        </a>

      </div>
    </footer>
  );
};
