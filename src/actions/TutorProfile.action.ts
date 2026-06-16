"use server"
import { serverFetch } from "@/lib/fetchApi";
import { revalidatePath } from "next/cache";

export interface ITutorProfilePayload {
  contactNumber?: string;
  gender?: string;
  hourlyRate?: number | string;
  yearsExperience?: number | string;
  isAvailable?: boolean;
}

export const updateTutor = async (payload: ITutorProfilePayload) => {
  try {
    const data = await serverFetch(`/tutors/profile`, {
      method: "PUT",
      body: JSON.stringify(payload),
    })
    revalidatePath("/tutor/profile");
    return { success: true, data };
  } catch (error: any) {
    console.error("Failed:", error.message);
    return { success: false, error: error.message };
  }
}