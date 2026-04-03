import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import {
  getCourses,
  getCourseBySlug,
  getLessonsByCourseId,
  getLessonBySlug,
  getUserLessonProgress,
  completeLesson,
  getChallenges,
  getChallengeBySlug,
  getUserChallengeSubmission,
  submitChallenge,
  getBadges,
  getUserBadges,
  awardBadge,
  getDailyMissions,
  completeDailyMission,
  getUserStatistics,
  getLeaderboard,
  getUserRank,
  getUserById,
  updateUserStreak,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // User profile and statistics
  user: router({
    getProfile: protectedProcedure.query(async ({ ctx }) => {
      const user = await getUserById(ctx.user.id);
      const stats = await getUserStatistics(ctx.user.id);
      const badges = await getUserBadges(ctx.user.id);
      const rank = await getUserRank(ctx.user.id);

      return {
        user,
        stats,
        badges,
        rank,
      };
    }),

    updateProfile: protectedProcedure
      .input(
        z.object({
          name: z.string().optional(),
          bio: z.string().optional(),
          avatar: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { getDb } = await import("./db");
        const { users } = await import("../drizzle/schema");
        const { eq } = await import("drizzle-orm");

        const db = await getDb();
        if (!db) throw new Error("Database not available");

        await db
          .update(users)
          .set({
            name: input.name,
            bio: input.bio,
            avatar: input.avatar,
          })
          .where(eq(users.id, ctx.user.id));

        return { success: true };
      }),
  }),

  // Courses
  courses: router({
    list: publicProcedure.query(async () => {
      return getCourses();
    }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return getCourseBySlug(input.slug);
      }),

    getLessons: publicProcedure
      .input(z.object({ courseId: z.number() }))
      .query(async ({ input }) => {
        return getLessonsByCourseId(input.courseId);
      }),
  }),

  // Lessons
  lessons: router({
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return getLessonBySlug(input.slug);
      }),

    getProgress: protectedProcedure
      .input(z.object({ lessonId: z.number() }))
      .query(async ({ ctx, input }) => {
        return getUserLessonProgress(ctx.user.id, input.lessonId);
      }),

    complete: protectedProcedure
      .input(z.object({ lessonId: z.number(), xpReward: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await completeLesson(ctx.user.id, input.lessonId, input.xpReward);
        return { success: true };
      }),
  }),

  // Challenges
  challenges: router({
    list: publicProcedure.query(async () => {
      return getChallenges();
    }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return getChallengeBySlug(input.slug);
      }),

    getProgress: protectedProcedure
      .input(z.object({ challengeId: z.number() }))
      .query(async ({ ctx, input }) => {
        return getUserChallengeSubmission(ctx.user.id, input.challengeId);
      }),

    submit: protectedProcedure
      .input(
        z.object({
          challengeId: z.number(),
          code: z.string(),
          passed: z.boolean(),
          xpReward: z.number(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await submitChallenge(
          ctx.user.id,
          input.challengeId,
          input.code,
          input.passed,
          input.xpReward
        );
        return { success: true };
      }),
  }),

  // Badges
  badges: router({
    list: publicProcedure.query(async () => {
      return getBadges();
    }),

    getUserBadges: protectedProcedure.query(async ({ ctx }) => {
      return getUserBadges(ctx.user.id);
    }),
  }),

  // Daily missions
  dailyMissions: router({
    list: publicProcedure.query(async () => {
      return getDailyMissions();
    }),

    complete: protectedProcedure
      .input(z.object({ missionId: z.number(), xpReward: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await completeDailyMission(ctx.user.id, input.missionId, input.xpReward);
        return { success: true };
      }),
  }),

  // Leaderboard
  leaderboard: router({
    getTop: publicProcedure
      .input(z.object({ limit: z.number().default(50) }))
      .query(async ({ input }) => {
        return getLeaderboard(input.limit);
      }),

    getUserRank: protectedProcedure.query(async ({ ctx }) => {
      const rank = await getUserRank(ctx.user.id);
      const user = await getUserById(ctx.user.id);
      return {
        rank,
        user,
      };
    }),
  }),
});

export type AppRouter = typeof appRouter;
