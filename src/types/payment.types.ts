import { IBooking } from "./booking.types";

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED'
}

export interface IPayment {
  id: string;
  bookingId: string;
  studentId: string;
  stripePaymentIntentId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
  booking: IBooking;
}

export interface CreatePaymentRequest {
  bookingId: string;
}

export interface CreatePaymentResponse {
  clientSecret: string;
  paymentId: string;
}

export interface GetPaymentsResponse {
  payments: IPayment[];
}
