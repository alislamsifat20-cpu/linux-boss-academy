import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { Circle } from "lucide-react";

export default function CourseRoadmap() {
  const [, navigate] = useLocation();
  const { data: courses } = trpc.courses.list.useQuery();

  const courseColors = {
    beginner: "from-green-400 to-green-600",
    intermediate: "from-yellow-400 to-orange-600",
    advanced: "from-red-400 to-red-600",
  };

  const courseEmojis = {
    beginner: "🌱",
    intermediate: "⚡",
    advanced: "🚀",
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold mb-2">কোর্স রোডম্যাপ</h1>
        <p className="text-muted-foreground">আপনার শেখার যাত্রা পরিকল্পনা করুন এবং প্রতিটি স্তরে দক্ষতা অর্জন করুন</p>
      </div>

      {/* Skill Tree Visualization */}
      <div className="space-y-8">
        {courses?.map((course) => (
          <div key={course.id} className="space-y-4">
            {/* Course Header */}
            <div className={`bg-gradient-to-r ${courseColors[course.level as keyof typeof courseColors]} rounded-lg p-6 text-white`}>
              <div className="flex items-center gap-4">
                <div className="text-4xl">{courseEmojis[course.level as keyof typeof courseEmojis]}</div>
                <div>
                  <h2 className="text-2xl font-bold">{course.titleBn}</h2>
                  <p className="text-white/80">{course.descriptionBn}</p>
                </div>
              </div>
            </div>

            {/* Lessons Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { id: 1, title: "পরিচয়", difficulty: "সহজ", xp: 100 },
                { id: 2, title: "মূল ধারণা", difficulty: "সহজ", xp: 150 },
                { id: 3, title: "প্র্যাকটিস", difficulty: "মাঝারি", xp: 200 },
                { id: 4, title: "উন্নত বিষয়", difficulty: "কঠিন", xp: 250 },
                { id: 5, title: "চ্যালেঞ্জ", difficulty: "কঠিন", xp: 300 },
              ].map((lesson) => (
                <Card key={lesson.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Circle className="w-5 h-5 text-muted-foreground" />
                      <h3 className="font-semibold">{lesson.title}</h3>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">কঠিনতা:</span>
                      <span className="font-medium">{lesson.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">পুরস্কার:</span>
                      <span className="font-medium text-accent">+{lesson.xp} XP</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => navigate(`/lesson/linux-intro`)}
                    className="w-full mt-4 btn-secondary"
                  >
                    শুরু করুন
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Learning Path Info */}
      <Card className="p-8 bg-accent/5 border-accent/20">
        <h3 className="text-2xl font-bold mb-4">শেখার পথ সম্পর্কে</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-3xl mb-2">🌱</div>
            <h4 className="font-semibold mb-2">শুরুর পথ</h4>
            <p className="text-sm text-muted-foreground">Linux এর মূল ধারণা এবং কমান্ড লাইন ইন্টারফেস শিখুন।</p>
          </div>
          <div>
            <div className="text-3xl mb-2">⚡</div>
            <h4 className="font-semibold mb-2">অভিজ্ঞ পর্যায়</h4>
            <p className="text-sm text-muted-foreground">ফাইল পারমিশন, স্ক্রিপ্টিং এবং প্যাকেজ ম্যানেজমেন্ট শিখুন।</p>
          </div>
          <div>
            <div className="text-3xl mb-2">🚀</div>
            <h4 className="font-semibold mb-2">উন্নত স্তর</h4>
            <p className="text-sm text-muted-foreground">সিস্টেম অ্যাডমিনিস্ট্রেশন এবং নিরাপত্তা শিখুন।</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
