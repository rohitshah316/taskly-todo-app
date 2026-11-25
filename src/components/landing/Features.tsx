
import { CheckCircle, CalendarDays, Filter } from 'lucide-react';

const features = [
  {
    icon: CheckCircle,
    title: 'Task Management',
    description: 'Easily create, update, and complete your daily tasks.',
  },
  {
    icon: CalendarDays,
    title: 'Stay Organized',
    description: 'Keep your tasks organized and never miss important work.',
  },
  {
    icon: Filter,
    title: 'Filter Tasks',
    description: 'Find your tasks easily by filtering completed and pending tasks.',
  },
];

export const Features = () => {
  return (
    <section className="bg-purple-900 py-16 px-6" id="features">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-10">
          Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg"
              >
                <Icon className="text-purple-400 mb-4" size={28} />

                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
