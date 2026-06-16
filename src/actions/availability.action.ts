"use server"

import { serverFetch } from "@/lib/fetchApi";
import { IAvailabilityPayload } from "@/types/availability.types";
import { revalidatePath } from "next/cache";


export const createAvailability = async (paylod: IAvailabilityPayload) => {
  try {
    const data = await serverFetch("/tutors/availability", {
      method: "POST",
      body: JSON.stringify(paylod),
    })
     revalidatePath("/tutor/availability")
    return data;
  } catch (error: any) {
    console.log("Failled to create availability:", error.message);
  }
}

export const updateAvailability = async (id:string,paylod: Partial<IAvailabilityPayload>) => {
  try {
    const data = await serverFetch(`/tutors/availability/${id}`, {
      method: "PUT",
      body: JSON.stringify(paylod),
    })
    revalidatePath("/tutor/availability")
    return data;
  } catch (error: any) {
    console.log("Failled to update availability:", error.message);
  }
}

export const deleteAvailability = async (id: string) => {
  try {
    const data = await serverFetch(`/tutors/availability/${id}`, {
      method: "DELETE",
    })
     revalidatePath("/tutor/availability")
    return data;
  } catch (error: any) {
    console.log("Failled to create availability:", error.message);
  }
}