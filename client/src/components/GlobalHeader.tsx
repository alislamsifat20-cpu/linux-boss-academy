import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { getLoginUrl } from "@/const";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function GlobalHeader() {
  const { user, isAuthenticated, logout } = useAuth();
  const [, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = isAuthenticated
    ? [
        { label: "ড্যাশবোর্ড", href: "/dashboard" },
        { label: "রোডম্যাপ", href: "/roadmap" },
        { label: "প্র্যাকটিস", href: "/practice" },
        { label: "চ্যালেঞ্জ", href: "/challenges" },
        { label: "লিডারবোর্ড", href: "/leaderboard" },
      ]
    : [];

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <nav className="container flex items-center justify-between py-4">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="text-2xl font-bold gradient-text">🐧 Linux Boss</div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => navigate(link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="hidden sm:inline text-sm text-muted-foreground">
                {user?.name}
              </span>
              <Button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="btn-secondary text-sm"
              >
                লগআউট
              </Button>
            </>
          ) : (
            <Button
              onClick={() => (window.location.href = getLoginUrl())}
              className="btn-primary text-sm"
            >
              লগইন
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && isAuthenticated && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="container py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => {
                  navigate(link.href);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
