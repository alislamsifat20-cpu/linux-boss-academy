import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

export default function Profile() {
  const { data: profile } = trpc.user.getProfile.useQuery();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">আমার প্রোফাইল</h1>
        <p className="text-muted-foreground">আপনার শেখার অগ্রগতি এবং অর্জন দেখুন</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">মোট XP</p>
          <p className="text-4xl font-bold text-accent">{profile?.user?.totalXP || 0}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">লেভেল</p>
          <p className="text-4xl font-bold text-accent">{profile?.user?.level || 1}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">ব্যাজ</p>
          <p className="text-4xl font-bold text-accent">{profile?.badges?.length || 0}</p>
        </Card>
      </div>
      <Card className="p-8">
        <h2 className="text-2xl font-bold mb-6">অর্জিত ব্যাজ</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {profile?.badges?.map((badge) => (
            <div key={badge.badge.id} className="text-center">
              <div className="text-4xl mb-2">{badge.badge.icon}</div>
              <p className="font-semibold text-sm">{badge.badge.nameBn}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
