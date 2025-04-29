import { statLabels } from "./stat-labels";

export const StatsLabelsContent = () => {
  return (
    <div className="flex flex-col items-end gap-2">
      <div className="h-4 w-full" />
      {statLabels.map((stat) => (
        <span key={stat.key} className="text-sm h-6 flex items-center">
          {stat.label}
        </span>
      ))}
    </div>
  );
};
