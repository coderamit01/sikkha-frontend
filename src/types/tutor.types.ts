import { Gender, IUser } from "@/types/user.types";
import { IReview } from "./review.type";
import { IAvailability } from "./availability.types";
import { Category } from "@/types/category.types";

export interface ITutorRegister {
  name: string,
  email: string,
  gender: Gender,
  password: string
}

export interface ITutor {
  name: string;
  email: string;
  gender: Gender;
  image: string | null;
}
interface TutorBooking {
  id: string;
  studentId: string;
  tutorId: string;
  availabilityId: string;
  averageRating: number
  scheduleAt: Date | string;
  totalPrice: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  availability: IAvailability;
}

export interface ITutorDetails {
  id: string;
  contactNumber: string | null;
  gender: Gender;
  userId: string;
  hourlyRate: number | string; 
  yearsExperience: number | string;
  averageRating: number | string;
  isAvailable: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  reviews: IReview[],
  availablity: IAvailability[],
  bookings: TutorBooking[],
  category: Category[],
  user: IUser
}