import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

export default function Challenges() {
  const { data: challenges } = trpc.challenges.list.useQuery();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">চ্যালেঞ্জ</h1>
        <p className="text-muted-foreground">আপনার Linux দক্ষতা পরীক্ষা করুন এবং পুরস্কার জিতুন</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {challenges?.map((challenge) => (
          <Card key={challenge.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">{challenge.titleBn}</h3>
                <p className="text-sm text-muted-foreground">{challenge.descriptionBn}</p>
              </div>
              <span className="badge-base">{challenge.xpReward} XP</span>
            </div>
            <div className="flex gap-2">
              <Button className="btn-primary flex-1">শুরু করুন</Button>
              <Button className="btn-secondary flex-1">বিস্তারিত</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
