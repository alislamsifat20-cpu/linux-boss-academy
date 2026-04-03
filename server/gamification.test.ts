import { describe, expect, it } from "vitest";

// Test XP calculation
describe("XP System", () => {
  it("calculates correct level from XP", () => {
    const xpPerLevel = 1000;
    const calculateLevel = (xp: number) => Math.floor(xp / xpPerLevel) + 1;

    expect(calculateLevel(0)).toBe(1);
    expect(calculateLevel(999)).toBe(1);
    expect(calculateLevel(1000)).toBe(2);
    expect(calculateLevel(5000)).toBe(6);
  });

  it("calculates XP needed for next level", () => {
    const xpPerLevel = 1000;
    const getNextLevelXP = (currentXP: number) => {
      const currentLevel = Math.floor(currentXP / xpPerLevel);
      return (currentLevel + 1) * xpPerLevel;
    };

    expect(getNextLevelXP(0)).toBe(1000);
    expect(getNextLevelXP(500)).toBe(1000);
    expect(getNextLevelXP(1000)).toBe(2000);
  });

  it("validates XP reward amounts", () => {
    const validateXPReward = (xp: number) => xp > 0 && xp <= 500;

    expect(validateXPReward(0)).toBe(false);
    expect(validateXPReward(100)).toBe(true);
    expect(validateXPReward(500)).toBe(true);
    expect(validateXPReward(501)).toBe(false);
  });
});

// Test streak logic
describe("Streak System", () => {
  it("increments streak for consecutive days", () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const isConsecutiveDay = (lastDate: Date) => {
      const diff = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      return diff === 1;
    };

    expect(isConsecutiveDay(yesterday)).toBe(true);
  });

  it("resets streak for non-consecutive days", () => {
    const today = new Date();
    const twoWeeksAgo = new Date(today);
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    const isConsecutiveDay = (lastDate: Date) => {
      const diff = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      return diff === 1;
    };

    expect(isConsecutiveDay(twoWeeksAgo)).toBe(false);
  });
});

// Test badge unlock conditions
describe("Badge System", () => {
  it("unlocks First Steps badge at level 2", () => {
    const checkBadgeUnlock = (level: number, badgeId: string) => {
      const conditions: Record<string, (level: number) => boolean> = {
        "first-steps": (l) => l >= 2,
        "intermediate": (l) => l >= 5,
        "expert": (l) => l >= 10,
      };
      return conditions[badgeId]?.(level) ?? false;
    };

    expect(checkBadgeUnlock(1, "first-steps")).toBe(false);
    expect(checkBadgeUnlock(2, "first-steps")).toBe(true);
  });

  it("unlocks Expert badge at level 10", () => {
    const checkBadgeUnlock = (level: number, badgeId: string) => {
      const conditions: Record<string, (level: number) => boolean> = {
        "first-steps": (l) => l >= 2,
        "intermediate": (l) => l >= 5,
        "expert": (l) => l >= 10,
      };
      return conditions[badgeId]?.(level) ?? false;
    };

    expect(checkBadgeUnlock(9, "expert")).toBe(false);
    expect(checkBadgeUnlock(10, "expert")).toBe(true);
  });
});

// Test leaderboard ranking
describe("Leaderboard", () => {
  it("ranks users by XP correctly", () => {
    const users = [
      { id: 1, name: "Alice", totalXP: 5000 },
      { id: 2, name: "Bob", totalXP: 3000 },
      { id: 3, name: "Charlie", totalXP: 7000 },
    ];

    const ranked = users.sort((a, b) => b.totalXP - a.totalXP);

    expect(ranked[0].name).toBe("Charlie");
    expect(ranked[1].name).toBe("Alice");
    expect(ranked[2].name).toBe("Bob");
  });

  it("handles tied XP scores", () => {
    const users = [
      { id: 1, name: "Alice", totalXP: 5000 },
      { id: 2, name: "Bob", totalXP: 5000 },
      { id: 3, name: "Charlie", totalXP: 5000 },
    ];

    const ranked = users.sort((a, b) => b.totalXP - a.totalXP);

    expect(ranked.length).toBe(3);
    expect(ranked.every((u) => u.totalXP === 5000)).toBe(true);
  });
});
