"use server"

import { serverFetch } from "@/lib/fetchApi";
import { revalidatePath } from "next/cache";

export const updateUserStatus = async (userId:string) => {
  try {
    const data = await serverFetch(`/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(userId),
    })
    revalidatePath("/profile/edit");
    return data;
  } catch (error: any) {
     return { success: false, error: error.message };
  }
}