export type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  points: number;
  streak: number;
  badges: string[];
};

export type Habit = {
  id: number;
  userId: number;
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: string;
  completedCount: number;
  currentStreak: number;
  lastCompletedAt?: string | null;
};

export type Completion = {
  id: number;
  habitId: number;
  userId: number;
  completedAt: string;
  pointsEarned: number;
};

export type BadgeCatalog = {
  id: string;
  title: string;
  description: string;
  icon?: string;
  points: number;
};
