
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  color?: "blue" | "green" | "orange" | "purple";
}

const colorStyles = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-600",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
  },
};

export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendLabel = "vs last week",
  color = "blue",
}: StatsCardProps) {
  const styles = colorStyles[color];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {value}
          </h2>
        </div>

        {/* Icon */}
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${styles.bg}`}
        >
          <Icon className={`h-6 w-6 ${styles.text}`} />
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-5 flex items-center gap-2 text-sm">
        {trend !== undefined && (
          <span
            className={`flex items-center gap-1 font-semibold ${
              trend >= 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {trend >= 0 ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}

            {Math.abs(trend)}%
          </span>
        )}

        <span className="text-gray-500">
          {trend !== undefined ? trendLabel : description}
        </span>
      </div>
    </div>
  );
}
