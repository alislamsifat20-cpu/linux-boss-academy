export default function GlobalFooter() {
  return (
    <footer className="border-t border-border bg-card/50 py-8 mt-20">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">Linux Boss Academy</h3>
            <p className="text-sm text-muted-foreground">
              Bengali ভাষায় Linux শেখার জন্য সম্পূর্ণ প্ল্যাটফর্ম
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">শিখুন</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">কোর্স</a></li>
              <li><a href="#" className="hover:text-foreground">চ্যালেঞ্জ</a></li>
              <li><a href="#" className="hover:text-foreground">প্র্যাকটিস</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">সম্প্রদায়</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">লিডারবোর্ড</a></li>
              <li><a href="#" className="hover:text-foreground">ফোরাম</a></li>
              <li><a href="#" className="hover:text-foreground">ইভেন্ট</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">সাহায্য</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">FAQ</a></li>
              <li><a href="#" className="hover:text-foreground">সাপোর্ট</a></li>
              <li><a href="#" className="hover:text-foreground">যোগাযোগ</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2026 Linux Boss Academy. সর্বাধিকার সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}
