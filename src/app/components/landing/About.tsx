
import React from 'react';

export const About = () => {
  return (
    <section className="bg-white py-16 px-6" id="about">
      <div className="max-w-4xl mx-auto text-center">

        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          About <span className="text-purple-700">Taskly</span>
        </h2>

        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          Taskly is a simple and efficient task management application
          designed to help you stay organized and productive.
          Whether you're managing daily activities or tracking important
          work, Taskly makes it easier to manage everything in one place.
        </p>

        <p className="text-gray-500 mt-4 leading-relaxed">
          Our goal is to make task management simple, helping you focus
          on what matters most without unnecessary distractions.
        </p>

      </div>
    </section>
  );
};
