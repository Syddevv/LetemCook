import User from "../models/User.js";

const toDayString = (d) =>
  new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
    .toISOString()
    .slice(0, 10);

export async function updateCookingStreak(userId) {
  const user = await User.findById(userId);
  if (!user) return;
  const last = user.lastActivityDate ? new Date(user.lastActivityDate) : null;
  const today = new Date();
  const todayStr = toDayString(today);
  const lastStr = last ? toDayString(last) : null;

  if (lastStr === todayStr) return; // already counted today

  const yesterday = new Date();
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yesterdayStr = toDayString(yesterday);

  if (lastStr === yesterdayStr) {
    user.cookingStreak = (user.cookingStreak || 0) + 1;
  } else {
    user.cookingStreak = 1;
  }

  user.lastActivityDate = today;
  await user.save();
}
