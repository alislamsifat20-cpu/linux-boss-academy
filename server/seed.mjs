import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL environment variable is not set");
  process.exit(1);
}

async function seed() {
  const connection = await mysql.createConnection(DATABASE_URL);

  try {
    console.log("Seeding database...");

    // Insert courses
    const courses = [
      {
        slug: "beginner",
        titleBn: "শুরুর পথ",
        titleEn: "Beginner Path",
        descriptionBn: "Linux এর মূল ধারণা শিখুন এবং প্রথম পদক্ষেপ নিন",
        descriptionEn: "Learn the basics of Linux and take your first steps",
        level: "beginner",
        order: 1,
        icon: "🌱",
        color: "#10b981",
      },
      {
        slug: "intermediate",
        titleBn: "অভিজ্ঞ পর্যায়",
        titleEn: "Intermediate Path",
        descriptionBn: "আরও উন্নত Linux দক্ষতা অর্জন করুন",
        descriptionEn: "Master more advanced Linux skills",
        level: "intermediate",
        order: 2,
        icon: "⚡",
        color: "#f59e0b",
      },
      {
        slug: "advanced",
        titleBn: "উন্নত স্তর",
        titleEn: "Advanced Path",
        descriptionBn: "Linux এর শক্তিশালী বৈশিষ্ট্য এবং সিস্টেম প্রশাসন শিখুন",
        descriptionEn: "Learn powerful Linux features and system administration",
        level: "advanced",
        order: 3,
        icon: "🚀",
        color: "#ef4444",
      },
    ];

    for (const course of courses) {
      await connection.execute(
        `INSERT INTO courses (slug, titleBn, titleEn, descriptionBn, descriptionEn, level, \`order\`, icon, color)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          course.slug,
          course.titleBn,
          course.titleEn,
          course.descriptionBn,
          course.descriptionEn,
          course.level,
          course.order,
          course.icon,
          course.color,
        ]
      );
    }

    console.log("✓ Courses inserted");

    // Get course IDs
    const [courseRows] = await connection.execute("SELECT id, slug FROM courses");
    const courseMap = {};
    courseRows.forEach((row) => {
      courseMap[row.slug] = row.id;
    });

    // Insert lessons
    const lessons = [
      // Beginner lessons
      {
        courseId: courseMap["beginner"],
        slug: "linux-intro",
        titleBn: "Linux কি?",
        titleEn: "What is Linux?",
        descriptionBn: "Linux অপারেটিং সিস্টেম সম্পর্কে জানুন",
        descriptionEn: "Learn about the Linux operating system",
        contentBn: "Linux একটি মুক্ত এবং খোলা উৎসের অপারেটিং সিস্টেম। এটি বিশ্বব্যাপী লক্ষ লক্ষ ডিভাইসে ব্যবহৃত হয়।",
        contentEn: "Linux is a free and open-source operating system used by millions of devices worldwide.",
        order: 1,
        xpReward: 100,
        difficulty: "easy",
      },
      {
        courseId: courseMap["beginner"],
        slug: "terminal-basics",
        titleBn: "টার্মিনাল বেসিক",
        titleEn: "Terminal Basics",
        descriptionBn: "টার্মিনাল কমান্ড লাইন ব্যবহার করতে শিখুন",
        descriptionEn: "Learn to use the terminal command line",
        contentBn: "টার্মিনাল হল একটি শক্তিশালী টুল যা আপনাকে আপনার কম্পিউটার নিয়ন্ত্রণ করতে দেয়।",
        contentEn: "The terminal is a powerful tool that lets you control your computer.",
        order: 2,
        xpReward: 150,
        difficulty: "easy",
      },
      {
        courseId: courseMap["beginner"],
        slug: "file-navigation",
        titleBn: "ফাইল নেভিগেশন",
        titleEn: "File Navigation",
        descriptionBn: "ফাইল সিস্টেমে নেভিগেট করতে শিখুন",
        descriptionEn: "Learn to navigate the file system",
        contentBn: "pwd, ls, cd কমান্ড ব্যবহার করে ফাইল সিস্টেমে চলাফেরা করুন।",
        contentEn: "Use pwd, ls, cd commands to move around the file system.",
        order: 3,
        xpReward: 150,
        difficulty: "easy",
      },
      // Intermediate lessons
      {
        courseId: courseMap["intermediate"],
        slug: "file-permissions",
        titleBn: "ফাইল পারমিশন",
        titleEn: "File Permissions",
        descriptionBn: "ফাইল পারমিশন এবং মালিকানা বুঝুন",
        descriptionEn: "Understand file permissions and ownership",
        contentBn: "chmod, chown কমান্ড ব্যবহার করে ফাইল পারমিশন পরিবর্তন করুন।",
        contentEn: "Use chmod and chown commands to change file permissions.",
        order: 1,
        xpReward: 200,
        difficulty: "medium",
      },
      {
        courseId: courseMap["intermediate"],
        slug: "bash-scripting",
        titleBn: "Bash স্ক্রিপ্টিং",
        titleEn: "Bash Scripting",
        descriptionBn: "Bash স্ক্রিপ্ট লিখতে শিখুন",
        descriptionEn: "Learn to write Bash scripts",
        contentBn: "Bash স্ক্রিপ্ট লিখে জটিল কাজ স্বয়ংক্রিয় করুন।",
        contentEn: "Automate complex tasks by writing Bash scripts.",
        order: 2,
        xpReward: 250,
        difficulty: "medium",
      },
      // Advanced lessons
      {
        courseId: courseMap["advanced"],
        slug: "system-admin",
        titleBn: "সিস্টেম অ্যাডমিনিস্ট্রেশন",
        titleEn: "System Administration",
        descriptionBn: "Linux সিস্টেম পরিচালনা করতে শিখুন",
        descriptionEn: "Learn to manage Linux systems",
        contentBn: "ব্যবহারকারী, গ্রুপ এবং সেবা পরিচালনা করুন।",
        contentEn: "Manage users, groups, and services.",
        order: 1,
        xpReward: 300,
        difficulty: "hard",
      },
      {
        courseId: courseMap["advanced"],
        slug: "networking",
        titleBn: "নেটওয়ার্কিং",
        titleEn: "Networking",
        descriptionBn: "Linux নেটওয়ার্কিং কমান্ড শিখুন",
        descriptionEn: "Learn Linux networking commands",
        contentBn: "ifconfig, netstat, ssh কমান্ড ব্যবহার করে নেটওয়ার্ক পরিচালনা করুন।",
        contentEn: "Manage networks using ifconfig, netstat, and ssh commands.",
        order: 2,
        xpReward: 300,
        difficulty: "hard",
      },
    ];

    for (const lesson of lessons) {
      await connection.execute(
        `INSERT INTO lessons (courseId, slug, titleBn, titleEn, descriptionBn, descriptionEn, contentBn, contentEn, \`order\`, xpReward, difficulty)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          lesson.courseId,
          lesson.slug,
          lesson.titleBn,
          lesson.titleEn,
          lesson.descriptionBn,
          lesson.descriptionEn,
          lesson.contentBn,
          lesson.contentEn,
          lesson.order,
          lesson.xpReward,
          lesson.difficulty,
        ]
      );
    }

    console.log("✓ Lessons inserted");

    // Insert challenges
    const challenges = [
      {
        slug: "list-files",
        titleBn: "ফাইল তালিকা করুন",
        titleEn: "List Files",
        descriptionBn: "বর্তমান ডিরেক্টরির সমস্ত ফাইল তালিকা করুন",
        descriptionEn: "List all files in the current directory",
        instructionBn: "ls কমান্ড ব্যবহার করে বর্তমান ডিরেক্টরির সমস্ত ফাইল তালিকা করুন",
        instructionEn: "Use the ls command to list all files in the current directory",
        difficulty: "easy",
        xpReward: 100,
        sampleCommand: "ls",
      },
      {
        slug: "change-directory",
        titleBn: "ডিরেক্টরি পরিবর্তন করুন",
        titleEn: "Change Directory",
        descriptionBn: "একটি নির্দিষ্ট ডিরেক্টরিতে যান",
        descriptionEn: "Navigate to a specific directory",
        instructionBn: "cd কমান্ড ব্যবহার করে /tmp ডিরেক্টরিতে যান",
        instructionEn: "Use the cd command to navigate to the /tmp directory",
        difficulty: "easy",
        xpReward: 100,
        sampleCommand: "cd /tmp",
      },
      {
        slug: "create-file",
        titleBn: "ফাইল তৈরি করুন",
        titleEn: "Create File",
        descriptionBn: "একটি নতুন ফাইল তৈরি করুন",
        descriptionEn: "Create a new file",
        instructionBn: "touch কমান্ড ব্যবহার করে myfile.txt নাম একটি ফাইল তৈরি করুন",
        instructionEn: "Use the touch command to create a file named myfile.txt",
        difficulty: "easy",
        xpReward: 100,
        sampleCommand: "touch myfile.txt",
      },
      {
        slug: "find-files",
        titleBn: "ফাইল খুঁজুন",
        titleEn: "Find Files",
        descriptionBn: "একটি নির্দিষ্ট নামের ফাইল খুঁজুন",
        descriptionEn: "Find files with a specific name",
        instructionBn: "find কমান্ড ব্যবহার করে .txt এক্সটেনশন সহ সমস্ত ফাইল খুঁজুন",
        instructionEn: "Use the find command to locate all .txt files",
        difficulty: "medium",
        xpReward: 200,
        sampleCommand: "find . -name '*.txt'",
      },
      {
        slug: "grep-text",
        titleBn: "টেক্সট খুঁজুন",
        titleEn: "Search Text",
        descriptionBn: "ফাইলে একটি নির্দিষ্ট টেক্সট খুঁজুন",
        descriptionEn: "Search for specific text in files",
        instructionBn: "grep কমান্ড ব্যবহার করে একটি ফাইলে 'Linux' শব্দ খুঁজুন",
        instructionEn: "Use grep command to search for 'Linux' in a file",
        difficulty: "medium",
        xpReward: 200,
        sampleCommand: "grep 'Linux' filename.txt",
      },
    ];

    for (const challenge of challenges) {
      await connection.execute(
        `INSERT INTO challenges (slug, titleBn, titleEn, descriptionBn, descriptionEn, instructionBn, instructionEn, difficulty, xpReward, sampleCommand)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          challenge.slug,
          challenge.titleBn,
          challenge.titleEn,
          challenge.descriptionBn,
          challenge.descriptionEn,
          challenge.instructionBn,
          challenge.instructionEn,
          challenge.difficulty,
          challenge.xpReward,
          challenge.sampleCommand,
        ]
      );
    }

    console.log("✓ Challenges inserted");

    // Insert badges
    const badges = [
      {
        slug: "first-step",
        nameBn: "প্রথম পদক্ষেপ",
        nameEn: "First Step",
        descriptionBn: "আপনার প্রথম পাঠ সম্পূর্ণ করুন",
        descriptionEn: "Complete your first lesson",
        icon: "🎉",
        condition: "lessons:1",
      },
      {
        slug: "lesson-master",
        nameBn: "পাঠ মাস্টার",
        nameEn: "Lesson Master",
        descriptionBn: "১০টি পাঠ সম্পূর্ণ করুন",
        descriptionEn: "Complete 10 lessons",
        icon: "📚",
        condition: "lessons:10",
      },
      {
        slug: "challenge-champion",
        nameBn: "চ্যালেঞ্জ চ্যাম্পিয়ন",
        nameEn: "Challenge Champion",
        descriptionBn: "৫টি চ্যালেঞ্জ সম্পূর্ণ করুন",
        descriptionEn: "Complete 5 challenges",
        icon: "🏆",
        condition: "challenges:5",
      },
      {
        slug: "xp-collector",
        nameBn: "XP সংগ্রাহক",
        nameEn: "XP Collector",
        descriptionBn: "১০০০ XP অর্জন করুন",
        descriptionEn: "Earn 1000 XP",
        icon: "⭐",
        condition: "xp:1000",
      },
      {
        slug: "week-warrior",
        nameBn: "সপ্তাহ যোদ্ধা",
        nameEn: "Week Warrior",
        descriptionBn: "৭ দিনের স্ট্রিক বজায় রাখুন",
        descriptionEn: "Maintain a 7-day streak",
        icon: "🔥",
        condition: "streak:7",
      },
    ];

    for (const badge of badges) {
      await connection.execute(
        `INSERT INTO badges (slug, nameBn, nameEn, descriptionBn, descriptionEn, icon, condition)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          badge.slug,
          badge.nameBn,
          badge.nameEn,
          badge.descriptionBn,
          badge.descriptionEn,
          badge.icon,
          badge.condition,
        ]
      );
    }

    console.log("✓ Badges inserted");

    // Insert daily missions
    const dailyMissions = [
      {
        titleBn: "একটি পাঠ সম্পূর্ণ করুন",
        titleEn: "Complete a Lesson",
        descriptionBn: "আজ অন্তত একটি পাঠ সম্পূর্ণ করুন",
        descriptionEn: "Complete at least one lesson today",
        xpReward: 50,
        condition: "lesson:1",
      },
      {
        titleBn: "একটি চ্যালেঞ্জ সমাধান করুন",
        titleEn: "Solve a Challenge",
        descriptionBn: "আজ একটি চ্যালেঞ্জ সমাধান করুন",
        descriptionEn: "Solve a challenge today",
        xpReward: 75,
        condition: "challenge:1",
      },
      {
        titleBn: "প্ল্যাটফর্মে লগইন করুন",
        titleEn: "Login Daily",
        descriptionBn: "প্রতিদিন লগইন করে আপনার স্ট্রিক বজায় রাখুন",
        descriptionEn: "Login daily to maintain your streak",
        xpReward: 25,
        condition: "login:1",
      },
    ];

    for (const mission of dailyMissions) {
      await connection.execute(
        `INSERT INTO dailyMissions (titleBn, titleEn, descriptionBn, descriptionEn, xpReward, condition)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          mission.titleBn,
          mission.titleEn,
          mission.descriptionBn,
          mission.descriptionEn,
          mission.xpReward,
          mission.condition,
        ]
      );
    }

    console.log("✓ Daily missions inserted");
    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

seed();
