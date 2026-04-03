import { useAuth } from "@/_core/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Zap, BookOpen, Trophy, Flame } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: profile } = trpc.user.getProfile.useQuery();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">স্বাগতম, {user?.name}!</h1>
        <p className="text-muted-foreground">আপনার শেখার যাত্রা অব্যাহত রাখুন</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">মোট XP</p>
              <p className="text-3xl font-bold">{profile?.user?.totalXP || 0}</p>
            </div>
            <Zap className="w-8 h-8 text-accent" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">লেভেল</p>
              <p className="text-3xl font-bold">{profile?.user?.level || 1}</p>
            </div>
            <Trophy className="w-8 h-8 text-accent" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">স্ট্রিক</p>
              <p className="text-3xl font-bold">{profile?.user?.currentStreak || 0}</p>
            </div>
            <Flame className="w-8 h-8 text-accent" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">র‍্যাঙ্ক</p>
              <p className="text-3xl font-bold">#{profile?.rank || 1}</p>
            </div>
            <BookOpen className="w-8 h-8 text-accent" />
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-8">
        <h2 className="text-2xl font-bold mb-6">পরবর্তী পদক্ষেপ</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left">
            <div className="font-semibold mb-2">📚 পাঠ শুরু করুন</div>
            <div className="text-sm text-muted-foreground">নতুন পাঠ শিখুন</div>
          </button>
          <button className="p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left">
            <div className="font-semibold mb-2">⚡ চ্যালেঞ্জ সমাধান করুন</div>
            <div className="text-sm text-muted-foreground">আপনার দক্ষতা পরীক্ষা করুন</div>
          </button>
          <button className="p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left">
            <div className="font-semibold mb-2">🏆 লিডারবোর্ড দেখুন</div>
            <div className="text-sm text-muted-foreground">শীর্ষ শিক্ষার্থীদের দেখুন</div>
          </button>
        </div>
      </Card>
    </div>
  );
}
