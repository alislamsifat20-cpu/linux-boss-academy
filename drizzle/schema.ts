import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, decimal, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extended with gamification and learning progress fields.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  
  // Gamification fields
  totalXP: int("totalXP").default(0).notNull(),
  level: int("level").default(1).notNull(),
  currentStreak: int("currentStreak").default(0).notNull(),
  longestStreak: int("longestStreak").default(0).notNull(),
  lastActivityDate: timestamp("lastActivityDate"),
  
  // Profile fields
  bio: text("bio"),
  avatar: varchar("avatar", { length: 500 }),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Courses table - represents learning paths (Beginner, Intermediate, Advanced)
 */
export const courses = mysqlTable("courses", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  titleBn: varchar("titleBn", { length: 255 }).notNull(),
  titleEn: varchar("titleEn", { length: 255 }).notNull(),
  descriptionBn: text("descriptionBn"),
  descriptionEn: text("descriptionEn"),
  level: mysqlEnum("level", ["beginner", "intermediate", "advanced"]).notNull(),
  order: int("order").notNull(),
  icon: varchar("icon", { length: 50 }),
  color: varchar("color", { length: 7 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Course = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;

/**
 * Lessons table - individual lessons within courses
 */
export const lessons = mysqlTable("lessons", {
  id: int("id").autoincrement().primaryKey(),
  courseId: int("courseId").notNull(),
  slug: varchar("slug", { length: 100 }).notNull(),
  titleBn: varchar("titleBn", { length: 255 }).notNull(),
  titleEn: varchar("titleEn", { length: 255 }).notNull(),
  descriptionBn: text("descriptionBn"),
  descriptionEn: text("descriptionEn"),
  contentBn: text("contentBn"),
  contentEn: text("contentEn"),
  order: int("order").notNull(),
  xpReward: int("xpReward").default(100).notNull(),
  difficulty: mysqlEnum("difficulty", ["easy", "medium", "hard"]).default("easy").notNull(),
  prerequisites: varchar("prerequisites", { length: 500 }), // comma-separated lesson IDs
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = typeof lessons.$inferInsert;

/**
 * User lesson progress - tracks which lessons users have completed
 */
export const userLessonProgress = mysqlTable("userLessonProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  lessonId: int("lessonId").notNull(),
  completed: boolean("completed").default(false).notNull(),
  completedAt: timestamp("completedAt"),
  xpEarned: int("xpEarned").default(0).notNull(),
  attempts: int("attempts").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserLessonProgress = typeof userLessonProgress.$inferSelect;
export type InsertUserLessonProgress = typeof userLessonProgress.$inferInsert;

/**
 * Badges table - achievements users can earn
 */
export const badges = mysqlTable("badges", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  nameBn: varchar("nameBn", { length: 255 }).notNull(),
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  descriptionBn: text("descriptionBn"),
  descriptionEn: text("descriptionEn"),
  icon: varchar("icon", { length: 500 }),
  condition: varchar("condition", { length: 255 }).notNull(), // e.g., "xp:500", "lessons:10", "streak:7"
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Badge = typeof badges.$inferSelect;
export type InsertBadge = typeof badges.$inferInsert;

/**
 * User badges - tracks which badges users have earned
 */
export const userBadges = mysqlTable("userBadges", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  badgeId: int("badgeId").notNull(),
  earnedAt: timestamp("earnedAt").defaultNow().notNull(),
});

export type UserBadge = typeof userBadges.$inferSelect;
export type InsertUserBadge = typeof userBadges.$inferInsert;

/**
 * Challenges table - coding challenges and tasks
 */
export const challenges = mysqlTable("challenges", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  titleBn: varchar("titleBn", { length: 255 }).notNull(),
  titleEn: varchar("titleEn", { length: 255 }).notNull(),
  descriptionBn: text("descriptionBn"),
  descriptionEn: text("descriptionEn"),
  instructionBn: text("instructionBn"),
  instructionEn: text("instructionEn"),
  difficulty: mysqlEnum("difficulty", ["easy", "medium", "hard"]).default("easy").notNull(),
  xpReward: int("xpReward").default(200).notNull(),
  testCases: json("testCases"), // Array of test cases
  sampleCommand: varchar("sampleCommand", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Challenge = typeof challenges.$inferSelect;
export type InsertChallenge = typeof challenges.$inferInsert;

/**
 * User challenge submissions - tracks challenge attempts and completions
 */
export const userChallengeSubmissions = mysqlTable("userChallengeSubmissions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  challengeId: int("challengeId").notNull(),
  completed: boolean("completed").default(false).notNull(),
  completedAt: timestamp("completedAt"),
  xpEarned: int("xpEarned").default(0).notNull(),
  attempts: int("attempts").default(0).notNull(),
  submittedCode: text("submittedCode"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserChallengeSubmission = typeof userChallengeSubmissions.$inferSelect;
export type InsertUserChallengeSubmission = typeof userChallengeSubmissions.$inferInsert;

/**
 * Daily missions - repeating tasks for daily engagement
 */
export const dailyMissions = mysqlTable("dailyMissions", {
  id: int("id").autoincrement().primaryKey(),
  titleBn: varchar("titleBn", { length: 255 }).notNull(),
  titleEn: varchar("titleEn", { length: 255 }).notNull(),
  descriptionBn: text("descriptionBn"),
  descriptionEn: text("descriptionEn"),
  xpReward: int("xpReward").default(50).notNull(),
  condition: varchar("condition", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type DailyMission = typeof dailyMissions.$inferSelect;
export type InsertDailyMission = typeof dailyMissions.$inferInsert;

/**
 * User daily mission progress - tracks daily mission completion
 */
export const userDailyMissionProgress = mysqlTable("userDailyMissionProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  missionId: int("missionId").notNull(),
  completed: boolean("completed").default(false).notNull(),
  completedAt: timestamp("completedAt"),
  xpEarned: int("xpEarned").default(0).notNull(),
  date: varchar("date", { length: 10 }).notNull(), // YYYY-MM-DD format
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UserDailyMissionProgress = typeof userDailyMissionProgress.$inferSelect;
export type InsertUserDailyMissionProgress = typeof userDailyMissionProgress.$inferInsert;

/**
 * User statistics - aggregated learning stats
 */
export const userStatistics = mysqlTable("userStatistics", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  lessonsCompleted: int("lessonsCompleted").default(0).notNull(),
  challengesCompleted: int("challengesCompleted").default(0).notNull(),
  totalLearningMinutes: int("totalLearningMinutes").default(0).notNull(),
  lastLessonDate: timestamp("lastLessonDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserStatistics = typeof userStatistics.$inferSelect;
export type InsertUserStatistics = typeof userStatistics.$inferInsert;
