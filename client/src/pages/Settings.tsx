import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Settings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">সেটিংস</h1>
        <p className="text-muted-foreground">আপনার প্রোফাইল এবং পছন্দ পরিচালনা করুন</p>
      </div>
      <Card className="p-8">
        <h2 className="text-2xl font-bold mb-6">অ্যাকাউন্ট সেটিংস</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">নাম</label>
            <input type="text" className="w-full px-4 py-2 border border-border rounded-lg" placeholder="আপনার নাম" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">বায়ো</label>
            <textarea className="w-full px-4 py-2 border border-border rounded-lg" placeholder="আপনার বায়ো" rows={4}></textarea>
          </div>
          <Button className="btn-primary">সংরক্ষণ করুন</Button>
        </div>
      </Card>
    </div>
  );
}
