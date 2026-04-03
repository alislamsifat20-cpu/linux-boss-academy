interface XPProgressBarProps {
  currentXP: number;
  nextLevelXP: number;
  level: number;
}

export default function XPProgressBar({ currentXP, nextLevelXP, level }: XPProgressBarProps) {
  const progress = (currentXP / nextLevelXP) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold">লেভেল {level}</span>
        <span className="text-sm text-muted-foreground">
          {currentXP} / {nextLevelXP} XP
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-accent to-blue-500 h-full transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>
    </div>
  );
}
