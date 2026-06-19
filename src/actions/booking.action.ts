"use server"

import { serverFetch } from "@/lib/fetchApi";
import { BookingStatus } from "@/types/booking.types";
import { revalidatePath } from "next/cache";



export const createBooking = async (tutorId: string, availabilityId: string) => {
  try {
    const data = await serverFetch(`/bookings`, {
      method: "POST",
      body: JSON.stringify({ tutorId, availabilityId }),
    })
    revalidatePath("/tutors");
    return {
      success: true,
      data: data.data,
      message: "Booking created successfully"
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create booking"
    };
  }
}


export const updateBookingStatus = async (id: string, status: BookingStatus) => {
  try {
    const data = await serverFetch(`/bookings/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    })
    revalidatePath("/tutor/booking");
    return data;
  } catch (error: any) {
    console.log("Failed:", error.message);
  }
}

