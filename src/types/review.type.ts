import { IUser } from "@/types/user.types";

export interface ReviewPayload {
  bookingId: string;
  rating: number;
  comment: string;
}

export interface IReview {
  id: string,
  bookingId: string;
  studentId: string;
  tutorId: string;
  rating: number;
  comment: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  student: IUser
}
