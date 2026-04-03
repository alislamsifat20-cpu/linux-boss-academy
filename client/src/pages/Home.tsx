import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap, BookOpen, Trophy, Users, Rocket, Target } from "lucide-react";
import { useLocation } from "wouter";
import { getLoginUrl } from "@/const";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <GlobalHeader />

      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8 items-center">
          <div className="space-y-6 animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="gradient-text">Linux Boss</span> হয়ে উঠুন
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Linux শিখুন মজার মাধ্যমে। কমান্ড লাইন থেকে সিস্টেম অ্যাডমিনিস্ট্রেশন পর্যন্ত সবকিছু শিখুন গেমিফাইড
              পদ্ধতিতে।
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <>
                  <Button
                    onClick={() => navigate("/dashboard")}
                    className="btn-primary text-lg px-8 py-6"
                  >
                    শুরু করুন
                  </Button>
                  <Button
                    onClick={() => navigate("/roadmap")}
                    className="btn-secondary text-lg px-8 py-6"
                  >
                    কোর্স রোডম্যাপ
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => (window.location.href = getLoginUrl())}
                    className="btn-primary text-lg px-8 py-6"
                  >
                    এখনই শুরু করুন
                  </Button>
                  <Button className="btn-secondary text-lg px-8 py-6">আরও জানুন</Button>
                </>
              )}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-blue-500/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-card border border-border rounded-2xl p-8 space-y-4">
                <div className="text-4xl text-center">🚀</div>
                <div className="space-y-2 text-center">
                  <div className="text-sm font-mono text-accent">$ linux-boss-academy</div>
                  <div className="text-sm font-mono text-muted-foreground">
                    শেখা শুরু করুন আজই...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card/50 py-20 border-y border-border">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-16">কেন Linux Boss Academy?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "গেমিফাইড লার্নিং",
                description: "XP পয়েন্ট, ব্যাজ এবং লেভেল আনলক করে শিখুন",
              },
              {
                icon: BookOpen,
                title: "সম্পূর্ণ কোর্স",
                description: "শুরু থেকে উন্নত পর্যায় পর্যন্ত সব কিছু শিখুন",
              },
              {
                icon: Trophy,
                title: "চ্যালেঞ্জ ও প্রতিযোগিতা",
                description: "বাস্তব সমস্যা সমাধান করে দক্ষতা বাড়ান",
              },
              {
                icon: Rocket,
                title: "ইন্টারেক্টিভ টার্মিনাল",
                description: "ব্রাউজারে সরাসরি Linux কমান্ড প্র্যাকটিস করুন",
              },
              {
                icon: Users,
                title: "লিডারবোর্ড",
                description: "বন্ধুদের সাথে প্রতিযোগিতা করুন এবং র‍্যাঙ্কিং দেখুন",
              },
              {
                icon: Target,
                title: "ব্যক্তিগত অগ্রগতি",
                description: "আপনার শেখার যাত্রা ট্র্যাক করুন এবং লক্ষ্য অর্জন করুন",
              },
            ].map((feature, i) => (
              <Card key={i} className="p-6 hover:shadow-lg transition-shadow">
                <feature.icon className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="container py-20">
        <h2 className="text-4xl font-bold text-center mb-16">তিনটি শেখার পথ</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              emoji: "🌱",
              title: "শুরুর পথ",
              description: "Linux এর মূল ধারণা শিখুন এবং প্রথম পদক্ষেপ নিন",
              color: "from-green-400 to-green-600",
              topics: ["Linux কি", "টার্মিনাল বেসিক", "ফাইল নেভিগেশন"],
            },
            {
              emoji: "⚡",
              title: "অভিজ্ঞ পর্যায়",
              description: "আরও উন্নত Linux দক্ষতা অর্জন করুন",
              color: "from-yellow-400 to-orange-600",
              topics: ["ফাইল পারমিশন", "Bash স্ক্রিপ্টিং", "প্যাকেজ ম্যানেজমেন্ট"],
            },
            {
              emoji: "🚀",
              title: "উন্নত স্তর",
              description: "Linux এর শক্তিশালী বৈশিষ্ট্য এবং সিস্টেম প্রশাসন শিখুন",
              color: "from-red-400 to-red-600",
              topics: ["সিস্টেম অ্যাডমিনিস্ট্রেশন", "নেটওয়ার্কিং", "নিরাপত্তা"],
            },
          ].map((path, i) => (
            <Card key={i} className="overflow-hidden hover:shadow-lg transition-all">
              <div className={`bg-gradient-to-r ${path.color} h-2`}></div>
              <div className="p-6">
                <div className="text-4xl mb-4">{path.emoji}</div>
                <h3 className="text-2xl font-bold mb-2">{path.title}</h3>
                <p className="text-muted-foreground mb-6">{path.description}</p>
                <div className="space-y-2">
                  {path.topics.map((topic, j) => (
                    <div key={j} className="text-sm flex items-center gap-2">
                      <span className="text-accent">✓</span>
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-card/50 py-16 border-y border-border">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50+", label: "পাঠ" },
              { number: "100+", label: "চ্যালেঞ্জ" },
              { number: "25+", label: "ব্যাজ" },
              { number: "1000+", label: "শিক্ষার্থী" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-bold gradient-text">{stat.number}</div>
                <div className="text-muted-foreground mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">আজই শুরু করুন আপনার Linux যাত্রা</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          হাজার হাজার শিক্ষার্থী ইতিমধ্যে Linux Boss Academy এ তাদের দক্ষতা বৃদ্ধি করছেন। আপনিও যোগ দিন এবং
          একজন Linux বস হয়ে উঠুন।
        </p>
        {!isAuthenticated && (
          <Button
            onClick={() => (window.location.href = getLoginUrl())}
            className="btn-primary text-lg px-8 py-6"
          >
            বিনামূল্যে শুরু করুন
          </Button>
        )}
      </section>

      <GlobalFooter />
    </div>
  );
}
