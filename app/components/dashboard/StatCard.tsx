interface StatCardProps {
  label: string;
  value: string | number;
  icon?: string;
  trend?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  trend,
}) => (
  <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-600 text-sm">{label}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
        {trend && (
          <p
            className={`text-sm mt-2 ${trend > 0 ? "text-green-600" : "text-red-600"}`}
          >
            {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </p>
        )}
      </div>
      {icon && <span className="text-3xl">{icon}</span>}
    </div>
  </div>
);
