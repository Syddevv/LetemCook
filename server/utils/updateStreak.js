import User from "../models/User.js";
import { formatInTimeZone } from "date-fns-tz";

const TIME_ZONE = "Asia/Manila";

const getDayStringInZone = (date) => {
  return formatInTimeZone(date, TIME_ZONE, "yyyy-MM-dd");
};

export async function updateCookingStreak(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) return;

    // Get the current moment in time
    const today = new Date();
    // Get the string representation of "today" in your zone (e.g., "2025-11-18")
    const todayStr = getDayStringInZone(today);

    // Get the last activity date
    const last = user.lastActivityDate ? new Date(user.lastActivityDate) : null;
    // Get the string representation of "last active day" in your zone
    const lastStr = last ? getDayStringInZone(last) : null;

    // If the last activity day is the same as this activity day, do nothing
    if (lastStr === todayStr) {
      console.log("Streak already updated for today.");
      return;
    }

    // Get "yesterday" in your timezone.
    // We do this by getting "today" in the zone, then subtracting one day.
    const todayInZone = new Date(
      today.toLocaleString("en-US", { timeZone: TIME_ZONE })
    );
    const yesterdayInZone = new Date(todayInZone);
    yesterdayInZone.setDate(yesterdayInZone.getDate() - 1);

    const yesterdayStr = formatInTimeZone(
      yesterdayInZone,
      TIME_ZONE,
      "yyyy-MM-dd"
    );

    if (lastStr === yesterdayStr) {
      // It was yesterday, so increment the streak
      user.cookingStreak = (user.cookingStreak || 0) + 1;
    } else {
      // It was more than a day ago, reset to 1
      user.cookingStreak = 1;
    }

    // We still save the *actual* UTC timestamp of the activity
    user.lastActivityDate = today;
    await user.save();
  } catch (error) {
    console.error("Error updating cooking streak:", error);
  }
}
