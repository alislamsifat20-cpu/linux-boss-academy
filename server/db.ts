import { eq, and, desc, gte, lte, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  courses,
  lessons,
  userLessonProgress,
  badges,
  userBadges,
  challenges,
  userChallengeSubmissions,
  dailyMissions,
  userDailyMissionProgress,
  userStatistics,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.openId, openId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserXP(userId: number, xpToAdd: number) {
  const db = await getDb();
  if (!db) return;

  const user = await getUserById(userId);
  if (!user) return;

  const newTotalXP = user.totalXP + xpToAdd;
  const newLevel = Math.floor(newTotalXP / 500) + 1; // Level up every 500 XP

  await db
    .update(users)
    .set({
      totalXP: newTotalXP,
      level: newLevel,
      lastActivityDate: new Date(),
    })
    .where(eq(users.id, userId));
}

export async function updateUserStreak(userId: number, increment: boolean = true) {
  const db = await getDb();
  if (!db) return;

  const user = await getUserById(userId);
  if (!user) return;

  const today = new Date().toISOString().split("T")[0];
  const lastActivityDate = user.lastActivityDate
    ? new Date(user.lastActivityDate).toISOString().split("T")[0]
    : null;

  let newStreak = user.currentStreak;
  let newLongestStreak = user.longestStreak;

  if (increment) {
    if (lastActivityDate === today) {
      // Already did something today
      newStreak = user.currentStreak;
    } else {
      // New day
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      if (lastActivityDate === yesterdayStr) {
        newStreak = user.currentStreak + 1;
      } else {
        newStreak = 1;
      }
    }
  } else {
    newStreak = 0;
  }

  if (newStreak > newLongestStreak) {
    newLongestStreak = newStreak;
  }

  await db
    .update(users)
    .set({
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
      lastActivityDate: new Date(),
    })
    .where(eq(users.id, userId));
}

// Course queries
export async function getCourses() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(courses).orderBy(courses.order);
}

export async function getCourseBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, slug))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Lesson queries
export async function getLessonsByCourseId(courseId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(lessons)
    .where(eq(lessons.courseId, courseId))
    .orderBy(lessons.order);
}

export async function getLessonBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(lessons)
    .where(eq(lessons.slug, slug))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserLessonProgress(userId: number, lessonId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(userLessonProgress)
    .where(and(eq(userLessonProgress.userId, userId), eq(userLessonProgress.lessonId, lessonId)))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function completeLesson(userId: number, lessonId: number, xpReward: number) {
  const db = await getDb();
  if (!db) return;

  const existingProgress = await getUserLessonProgress(userId, lessonId);

  if (existingProgress && existingProgress.completed) {
    // Already completed
    return;
  }

  if (existingProgress) {
    await db
      .update(userLessonProgress)
      .set({
        completed: true,
        completedAt: new Date(),
        xpEarned: xpReward,
        attempts: existingProgress.attempts + 1,
      })
      .where(eq(userLessonProgress.id, existingProgress.id));
  } else {
    await db.insert(userLessonProgress).values({
      userId,
      lessonId,
      completed: true,
      completedAt: new Date(),
      xpEarned: xpReward,
      attempts: 1,
    });
  }

  // Update user XP and streak
  await updateUserXP(userId, xpReward);
  await updateUserStreak(userId, true);

  // Update user statistics
  await updateUserStatistics(userId);
}

// Challenge queries
export async function getChallenges() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(challenges);
}

export async function getChallengeBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(challenges)
    .where(eq(challenges.slug, slug))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserChallengeSubmission(userId: number, challengeId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(userChallengeSubmissions)
    .where(
      and(
        eq(userChallengeSubmissions.userId, userId),
        eq(userChallengeSubmissions.challengeId, challengeId)
      )
    )
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function submitChallenge(
  userId: number,
  challengeId: number,
  code: string,
  passed: boolean,
  xpReward: number
) {
  const db = await getDb();
  if (!db) return;

  const existingSubmission = await getUserChallengeSubmission(userId, challengeId);

  if (existingSubmission) {
    if (existingSubmission.completed) {
      // Already completed
      return;
    }

    await db
      .update(userChallengeSubmissions)
      .set({
        completed: passed,
        completedAt: passed ? new Date() : null,
        xpEarned: passed ? xpReward : 0,
        attempts: existingSubmission.attempts + 1,
        submittedCode: code,
      })
      .where(eq(userChallengeSubmissions.id, existingSubmission.id));
  } else {
    await db.insert(userChallengeSubmissions).values({
      userId,
      challengeId,
      completed: passed,
      completedAt: passed ? new Date() : null,
      xpEarned: passed ? xpReward : 0,
      attempts: 1,
      submittedCode: code,
    });
  }

  if (passed) {
    await updateUserXP(userId, xpReward);
    await updateUserStreak(userId, true);
    await updateUserStatistics(userId);
  }
}

// Badge queries
export async function getBadges() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(badges);
}

export async function getUserBadges(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select({
      badge: badges,
      earnedAt: userBadges.earnedAt,
    })
    .from(userBadges)
    .innerJoin(badges, eq(userBadges.badgeId, badges.id))
    .where(eq(userBadges.userId, userId));
}

export async function awardBadge(userId: number, badgeId: number) {
  const db = await getDb();
  if (!db) return;

  const existing = await db
    .select()
    .from(userBadges)
    .where(and(eq(userBadges.userId, userId), eq(userBadges.badgeId, badgeId)))
    .limit(1);

  if (existing.length === 0) {
    await db.insert(userBadges).values({
      userId,
      badgeId,
    });
  }
}

// Daily mission queries
export async function getDailyMissions() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(dailyMissions);
}

export async function getUserDailyMissionProgress(userId: number, missionId: number, date: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(userDailyMissionProgress)
    .where(
      and(
        eq(userDailyMissionProgress.userId, userId),
        eq(userDailyMissionProgress.missionId, missionId),
        eq(userDailyMissionProgress.date, date)
      )
    )
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function completeDailyMission(
  userId: number,
  missionId: number,
  xpReward: number
) {
  const db = await getDb();
  if (!db) return;

  const today = new Date().toISOString().split("T")[0];
  const existingProgress = await getUserDailyMissionProgress(userId, missionId, today);

  if (existingProgress && existingProgress.completed) {
    // Already completed today
    return;
  }

  if (existingProgress) {
    await db
      .update(userDailyMissionProgress)
      .set({
        completed: true,
        completedAt: new Date(),
        xpEarned: xpReward,
      })
      .where(eq(userDailyMissionProgress.id, existingProgress.id));
  } else {
    await db.insert(userDailyMissionProgress).values({
      userId,
      missionId,
      completed: true,
      completedAt: new Date(),
      xpEarned: xpReward,
      date: today,
    });
  }

  await updateUserXP(userId, xpReward);
  await updateUserStreak(userId, true);
}

// User statistics
export async function getUserStatistics(userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(userStatistics)
    .where(eq(userStatistics.userId, userId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserStatistics(userId: number) {
  const db = await getDb();
  if (!db) return;

  const lessonsCompleted = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(userLessonProgress)
    .where(
      and(eq(userLessonProgress.userId, userId), eq(userLessonProgress.completed, true))
    );

  const challengesCompleted = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(userChallengeSubmissions)
    .where(
      and(eq(userChallengeSubmissions.userId, userId), eq(userChallengeSubmissions.completed, true))
    );

  const lessonCount = lessonsCompleted[0]?.count || 0;
  const challengeCount = challengesCompleted[0]?.count || 0;

  const existingStats = await getUserStatistics(userId);

  if (existingStats) {
    await db
      .update(userStatistics)
      .set({
        lessonsCompleted: lessonCount,
        challengesCompleted: challengeCount,
        lastLessonDate: new Date(),
      })
      .where(eq(userStatistics.userId, userId));
  } else {
    await db.insert(userStatistics).values({
      userId,
      lessonsCompleted: lessonCount,
      challengesCompleted: challengeCount,
      lastLessonDate: new Date(),
    });
  }
}

// Leaderboard
export async function getLeaderboard(limit: number = 50) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select({
      id: users.id,
      name: users.name,
      totalXP: users.totalXP,
      level: users.level,
      avatar: users.avatar,
    })
    .from(users)
    .orderBy(desc(users.totalXP))
    .limit(limit);
}

export async function getUserRank(userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const user = await getUserById(userId);
  if (!user) return undefined;

  const result = await db
    .select({ rank: sql<number>`COUNT(*) + 1` })
    .from(users)
    .where(sql`${users.totalXP} > ${user.totalXP}`);

  return result[0]?.rank || 1;
}
