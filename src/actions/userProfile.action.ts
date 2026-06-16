"use server"
import { serverFetch } from "@/lib/fetchApi";
import { revalidatePath } from "next/cache";

export interface IUserProfilePayload {
  name?: string;
  bio?: string;
  image?: string;
}

export const updateUserProfile = async (payload: IUserProfilePayload) => {
  try {
    const data = await serverFetch(`/users/profile`, {
      method: "PUT",
      body: JSON.stringify(payload),
    })
    revalidatePath("/profile/edit");
    return { success: true, data };
  } catch (error: any) {
    console.error("Failed:", error.message);
    return { success: false, error: error.message };
  }
}
