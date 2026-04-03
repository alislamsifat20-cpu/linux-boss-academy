import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";

export default function Leaderboard() {
  const { data: leaderboard } = trpc.leaderboard.getTop.useQuery({ limit: 50 });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">লিডারবোর্ড</h1>
        <p className="text-muted-foreground">শীর্ষ শিক্ষার্থীদের দেখুন এবং প্রতিযোগিতা করুন</p>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">র‍্যাঙ্ক</th>
                <th className="px-6 py-4 text-left font-semibold">নাম</th>
                <th className="px-6 py-4 text-left font-semibold">লেভেল</th>
                <th className="px-6 py-4 text-right font-semibold">XP</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard?.map((user, idx) => (
                <tr key={user.id} className="border-t border-border hover:bg-muted/50">
                  <td className="px-6 py-4">{idx + 1}</td>
                  <td className="px-6 py-4 font-medium">{user.name}</td>
                  <td className="px-6 py-4">লেভেল {user.level}</td>
                  <td className="px-6 py-4 text-right font-semibold text-accent">{user.totalXP}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
