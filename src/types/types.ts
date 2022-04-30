import { Period } from '../enums/enums';

export type Measurement = {
  weight: number;
  createdAt: Date;
  userId: string;
  id: string;
};

export type Intake = {
  calorie: number;
  fat: number;
  carbs: number;
  protein: number;
  userId: string;
  id: string;
  createdAt: Date;
};

export type Comment = {
  comment: string;
  userId: string;
  createdAt: Date;
  id: string;
};

export type Diet = {
  intake: Intake;
  period?: Period;
  creatorId: string;
  id: string;
  createdAt: Date;
  comments: Comment[];
  likedBy: User[];
  savedBy: User[];
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
};
