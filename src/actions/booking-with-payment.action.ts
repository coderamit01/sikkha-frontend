"use server"

import { createBooking } from "@/actions/booking.action";
import { createPaymentAction } from "@/actions/payment.action";

export const createBookingWithPayment = async (
  tutorId: string,
  availabilityId: string
) => {
  try {
    const bookingResult = await createBooking(tutorId, availabilityId);

    if (!bookingResult.success || !bookingResult.data) {
      return {
        success: false,
        message: bookingResult.message || "Failed to create booking"
      };
    }

    const bookingId = bookingResult.data.id;;

    const paymentResult = await createPaymentAction({ bookingId });

    if (!paymentResult.success) {
      return {
        success: false,
        message: paymentResult.message || "Failed to initiate payment",
        booking: bookingResult.data,
      };
    }
    return {
      success: true,
      message: "Booking created and payment initiated successfully",
      booking: bookingResult.data,
      payment: {
        clientSecret: paymentResult.data?.clientSecret,
        paymentId: paymentResult.data?.paymentId,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred while creating booking and payment"
    };
  }
};
