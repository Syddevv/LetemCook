import User from "../models/User.js";

// Helper to get YYYY-MM-DD in UTC
const toDayString = (d) =>
  new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
    .toISOString()
    .slice(0, 10);

export async function updateCookingStreak(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) return;

    const today = new Date();
    const todayStr = toDayString(today);

    const last = user.lastActivityDate ? new Date(user.lastActivityDate) : null;
    const lastStr = last ? toDayString(last) : null;

    // --- THE FIX IS HERE ---
    // Only stop if activity was today AND the streak is already started (> 0).
    // If streak is 0, we assume this is the first real action, so we proceed.
    if (lastStr === todayStr && user.cookingStreak > 0) {
      return;
    }

    const yesterday = new Date();
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    const yesterdayStr = toDayString(yesterday);

    if (lastStr === yesterdayStr) {
      user.cookingStreak = (user.cookingStreak || 0) + 1;
    } else {
      // If it wasn't yesterday (or it's the very first time), set to 1
      user.cookingStreak = 1;
    }

    user.lastActivityDate = today;
    await user.save();
    console.log(`Streak updated for user ${userId}: ${user.cookingStreak}`);
  } catch (error) {
    console.error("Error updating streak:", error);
  }
}
