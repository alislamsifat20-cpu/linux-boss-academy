import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { CheckCircle, Zap } from "lucide-react";

interface LessonProps {
  slug: string;
}

export default function Lesson({ slug }: LessonProps) {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { data: lesson } = trpc.lessons.getBySlug.useQuery({ slug });
  const { data: progress } = trpc.lessons.getProgress.useQuery(
    { lessonId: lesson?.id || 0 },
    { enabled: !!lesson?.id }
  );
  const completeMutation = trpc.lessons.complete.useMutation();

  const handleCompleteLesson = async () => {
    if (!lesson) return;
    await completeMutation.mutateAsync({
      lessonId: lesson.id,
      xpReward: lesson.xpReward,
    });
  };

  if (!lesson) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">পাঠ খুঁজে পাওয়া যায়নি</p>
      </div>
    );
  }

  const lessonContent: Record<string, { content: string; examples: Array<{ title: string; code: string }> }> = {
    "linux-intro": {
      content: `Linux একটি মুক্ত এবং খোলা উৎসের অপারেটিং সিস্টেম যা বিশ্বব্যাপী লক্ষ লক্ষ ডিভাইসে ব্যবহৃত হয়। এটি Unix অপারেটিং সিস্টেমের উপর ভিত্তি করে তৈরি এবং Linus Torvalds দ্বারা ১৯৯১ সালে তৈরি করা হয়েছিল।

Linux এর প্রধান বৈশিষ্ট্যগুলি হল:
- মাল্টিইউজার: একাধিক ব্যবহারকারী একই সময়ে সিস্টেম ব্যবহার করতে পারে
- মাল্টিটাস্কিং: একাধিক প্রোগ্রাম একই সময়ে চলতে পারে
- পোর্টেবিলিটি: এটি বিভিন্ন হার্ডওয়্যার প্ল্যাটফর্মে চলতে পারে
- নিরাপত্তা: শক্তিশালী নিরাপত্তা বৈশিষ্ট্য সহ আসে
- ওপেন সোর্স: সোর্স কোড সবার জন্য উপলব্ধ`,
      examples: [
        {
          title: "Linux সংস্করণ চেক করুন",
          code: "uname -a",
        },
        {
          title: "বর্তমান ব্যবহারকারী দেখুন",
          code: "whoami",
        },
      ],
    },
  };

  const content = lessonContent[slug] || {
    content: lesson.contentBn || "পাঠের বিষয়বস্তু শীঘ্রই আসছে",
    examples: [],
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold">{lesson.titleBn}</h1>
          {progress?.completed && <CheckCircle className="w-8 h-8 text-accent" />}
        </div>
        <p className="text-muted-foreground">{lesson.descriptionBn}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">কঠিনতা</p>
          <p className="font-semibold capitalize">
            {lesson.difficulty === "easy" && "সহজ"}
            {lesson.difficulty === "medium" && "মাঝারি"}
            {lesson.difficulty === "hard" && "কঠিন"}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">পুরস্কার</p>
          <p className="font-semibold flex items-center gap-1">
            <Zap className="w-4 h-4 text-accent" />
            {lesson.xpReward} XP
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">অগ্রগতি</p>
          <p className="font-semibold">
            {progress?.completed ? "✓ সম্পূর্ণ" : "অসম্পূর্ণ"}
          </p>
        </Card>
      </div>

      <Card className="p-8">
        <h2 className="text-2xl font-bold mb-4">পাঠের বিষয়বস্তু</h2>
        <div className="bengali-text whitespace-pre-wrap text-base leading-relaxed">
          {content.content}
        </div>
      </Card>

      {content.examples.length > 0 && (
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">উদাহরণ</h2>
          <div className="space-y-6">
            {content.examples.map((example, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="font-semibold text-lg">{example.title}</h3>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm font-mono">{example.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="flex gap-4 flex-wrap">
        {!progress?.completed ? (
          <Button
            onClick={handleCompleteLesson}
            disabled={completeMutation.isPending}
            className="btn-primary"
          >
            {completeMutation.isPending ? "প্রক্রিয়াধীন..." : "পাঠ সম্পূর্ণ করুন"}
          </Button>
        ) : (
          <Button disabled className="btn-secondary">
            ✓ সম্পূর্ণ
          </Button>
        )}
        <Button className="btn-secondary" onClick={() => navigate("/roadmap")}>
          রোডম্যাপে ফিরুন
        </Button>
      </div>
    </div>
  );
}
