import { Flame } from "lucide-react";

interface StreakCounterProps {
  current: number;
  longest: number;
}

export default function StreakCounter({ current, longest }: StreakCounterProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Flame className="w-8 h-8 text-orange-500" />
        <div>
          <p className="text-sm text-muted-foreground">বর্তমান স্ট্রিক</p>
          <p className="text-2xl font-bold">{current} দিন</p>
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        দীর্ঘতম স্ট্রিক: <span className="font-semibold text-foreground">{longest} দিন</span>
      </div>
    </div>
  );
}
