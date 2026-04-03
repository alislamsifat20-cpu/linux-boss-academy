CREATE TABLE `badges` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(100) NOT NULL,
	`nameBn` varchar(255) NOT NULL,
	`nameEn` varchar(255) NOT NULL,
	`descriptionBn` text,
	`descriptionEn` text,
	`icon` varchar(500),
	`condition` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `badges_id` PRIMARY KEY(`id`),
	CONSTRAINT `badges_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `challenges` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(100) NOT NULL,
	`titleBn` varchar(255) NOT NULL,
	`titleEn` varchar(255) NOT NULL,
	`descriptionBn` text,
	`descriptionEn` text,
	`instructionBn` text,
	`instructionEn` text,
	`difficulty` enum('easy','medium','hard') NOT NULL DEFAULT 'easy',
	`xpReward` int NOT NULL DEFAULT 200,
	`testCases` json,
	`sampleCommand` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `challenges_id` PRIMARY KEY(`id`),
	CONSTRAINT `challenges_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(100) NOT NULL,
	`titleBn` varchar(255) NOT NULL,
	`titleEn` varchar(255) NOT NULL,
	`descriptionBn` text,
	`descriptionEn` text,
	`level` enum('beginner','intermediate','advanced') NOT NULL,
	`order` int NOT NULL,
	`icon` varchar(50),
	`color` varchar(7),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `courses_id` PRIMARY KEY(`id`),
	CONSTRAINT `courses_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `dailyMissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titleBn` varchar(255) NOT NULL,
	`titleEn` varchar(255) NOT NULL,
	`descriptionBn` text,
	`descriptionEn` text,
	`xpReward` int NOT NULL DEFAULT 50,
	`condition` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `dailyMissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lessons` (
	`id` int AUTO_INCREMENT NOT NULL,
	`courseId` int NOT NULL,
	`slug` varchar(100) NOT NULL,
	`titleBn` varchar(255) NOT NULL,
	`titleEn` varchar(255) NOT NULL,
	`descriptionBn` text,
	`descriptionEn` text,
	`contentBn` text,
	`contentEn` text,
	`order` int NOT NULL,
	`xpReward` int NOT NULL DEFAULT 100,
	`difficulty` enum('easy','medium','hard') NOT NULL DEFAULT 'easy',
	`prerequisites` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lessons_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userBadges` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`badgeId` int NOT NULL,
	`earnedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `userBadges_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userChallengeSubmissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`challengeId` int NOT NULL,
	`completed` boolean NOT NULL DEFAULT false,
	`completedAt` timestamp,
	`xpEarned` int NOT NULL DEFAULT 0,
	`attempts` int NOT NULL DEFAULT 0,
	`submittedCode` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userChallengeSubmissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userDailyMissionProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`missionId` int NOT NULL,
	`completed` boolean NOT NULL DEFAULT false,
	`completedAt` timestamp,
	`xpEarned` int NOT NULL DEFAULT 0,
	`date` varchar(10) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `userDailyMissionProgress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userLessonProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`lessonId` int NOT NULL,
	`completed` boolean NOT NULL DEFAULT false,
	`completedAt` timestamp,
	`xpEarned` int NOT NULL DEFAULT 0,
	`attempts` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userLessonProgress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userStatistics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`lessonsCompleted` int NOT NULL DEFAULT 0,
	`challengesCompleted` int NOT NULL DEFAULT 0,
	`totalLearningMinutes` int NOT NULL DEFAULT 0,
	`lastLessonDate` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userStatistics_id` PRIMARY KEY(`id`),
	CONSTRAINT `userStatistics_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `totalXP` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `level` int DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `currentStreak` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `longestStreak` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `lastActivityDate` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `bio` text;--> statement-breakpoint
ALTER TABLE `users` ADD `avatar` varchar(500);