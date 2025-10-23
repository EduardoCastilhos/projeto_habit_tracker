import type { Habit, User, BadgeCatalog } from '../types';


const difficultyPoints: Record<string, number> = {
  easy: 5,
  medium: 10,
  hard: 20
};


export function pointsForCompletion(habit: Habit) {
  return difficultyPoints[habit.difficulty] || 5;
}


export function isConsecutive(prevIso?: string, nowIso?: string) {
  if (!prevIso || !nowIso) return false;
  const prev = new Date(prevIso);
  const now = new Date(nowIso);
  const diffDays = Math.round((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - Date.UTC(prev.getFullYear(), prev.getMonth(), prev.getDate())) / (1000 * 60 * 60 * 24));
  return diffDays === 1;
}


export function evaluateBadges(user: User, habit: Habit, badgesCatalog: BadgeCatalog[]): string[] {
  const earned: string[] = [];
  if (habit.currentStreak >= 3 && !user.badges.includes('bronze_first_3')) earned.push('bronze_first_3');
  if (habit.currentStreak >= 7 && !user.badges.includes('silver_week_master')) earned.push('silver_week_master');
  if (habit.currentStreak >= 30 && !user.badges.includes('gold_month_master')) earned.push('gold_month_master');
  return earned;
}