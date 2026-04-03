import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PracticeLab() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">প্র্যাকটিস ল্যাব</h1>
        <p className="text-muted-foreground">এখানে আপনি Linux কমান্ড প্র্যাকটিস করতে পারবেন</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="text-3xl mb-4">💻</div>
          <h3 className="text-xl font-bold mb-2">টার্মিনাল সিমুলেটর</h3>
          <p className="text-muted-foreground mb-4">ব্রাউজারে সরাসরি কমান্ড চালান</p>
          <Button className="btn-primary w-full">খুলুন</Button>
        </Card>
        <Card className="p-6">
          <div className="text-3xl mb-4">📝</div>
          <h3 className="text-xl font-bold mb-2">গাইডেড এক্সারসাইজ</h3>
          <p className="text-muted-foreground mb-4">ধাপে ধাপে নির্দেশনা অনুসরণ করুন</p>
          <Button className="btn-primary w-full">শুরু করুন</Button>
        </Card>
        <Card className="p-6">
          <div className="text-3xl mb-4">🎯</div>
          <h3 className="text-xl font-bold mb-2">চ্যালেঞ্জ</h3>
          <p className="text-muted-foreground mb-4">আপনার দক্ষতা পরীক্ষা করুন</p>
          <Button className="btn-primary w-full">চেষ্টা করুন</Button>
        </Card>
      </div>
    </div>
  );
}
