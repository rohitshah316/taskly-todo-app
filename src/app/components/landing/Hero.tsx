
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const Hero = () => {
  return (
    <section
      id="home"
      className="h-90 flex flex-col items-center justify-center bg-gray-700 text-white px-4 text-center"
    >
      <h1 className="font-bold text-3xl md:text-4xl">
        Add your Tasks for Seamless Management
      </h1>

      <Link
        href="/register"
        className="bg-purple-700 text-white px-5 py-2 mt-5 rounded-lg flex gap-3 items-center font-semibold hover:bg-purple-800 transition"
      >
        Try it Free
        <ArrowRight size={18} />
      </Link>
    </section>
  );
};
