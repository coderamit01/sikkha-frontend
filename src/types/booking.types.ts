import { IReview } from "@/types/review.type";
import { ITutor, ITutorDetails } from "@/types/tutor.types";
import { Gender, IStudent } from "@/types/user.types";
import { IAvailability } from "./availability.types";

export enum BookingStatus {
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface BookingPayload {
  tutorId: string,
  availabilityId: string
}

export interface IBooking {
  id: string;
  studentId: string;
  tutorId: string;
  availabilityId: string;
  averageRating: number
  scheduleAt: Date | string;
  status: BookingStatus;
  totalPrice: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  tutor: ITutorDetails;
  student: IStudent;
  availability: IAvailability;
  review: IReview;
}
