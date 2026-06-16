import { IBooking } from "@/types/booking.types"
import { IReview } from "@/types/review.type"
import { ITutorDetails } from "@/types/tutor.types"

export enum Role {
  STUDENT = "STUDENT",
  TUTOR = "TUTOR",
  ADMIN = "ADMIN",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE"
}


export interface IStudent {
  name: string;
  email: string;
  image: string;
}

export interface IRegisterPayload {
  name: string
  email: string
  password: string
  role: Role
}
export interface ILoginPayload {
  email: string
  password: string
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  bio: string;
  role: Role;
  isBanned: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  tutor?: ITutorDetails;
  bookingsAsStudent: IBooking[];
  reviews: IReview[];
}

export interface IUpdatePayload {
  name?: string,
  email?: string,
  bio?: string,
  image?: string,
  contactNumber?: string,
  gender?: Gender,
  hourlyRate?: number | string,
  yearsExperience?: number | string,
  isAvailable?: boolean
}