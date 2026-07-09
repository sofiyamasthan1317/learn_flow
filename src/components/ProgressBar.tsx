interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  color?: string;
}

export default function ProgressBar({
  progress,
  showLabel = true,
  size = "md",
  color = "bg-indigo-500"
}: ProgressBarProps) {
  const heights = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-sm mb-1.5">
          <span className="text-gray-500 dark:text-gray-400">Progress</span>
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            {progress}%
          </span>
        </div>
      )}
      <div
        className={`w-full ${heights[size]} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}
      >
        <div
          className={`${heights[size]} ${color} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}