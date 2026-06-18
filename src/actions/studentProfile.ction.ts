"use server"
import { serverFetch } from "@/lib/fetchApi";
import { revalidatePath } from "next/cache";

export const updateUser = async (updateUserId:string,formData: FormData) => {
  try {
    const data = await serverFetch(`/users/profile/${updateUserId}`, {
      method: "PUT",
      body: formData,
    })
    revalidatePath("/profile/edit");
    return data;
  } catch (error: any) {
     return { success: false, error: error.message };
  }
}

export const updateUserStatus = async (userId:string, isBanned: boolean) => {
  try {
    const data = await serverFetch(`/users/profile/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ isBanned }),
    })
    revalidatePath("/admin/users");
    return data;
  } catch (error: any) {
     return { success: false, error: error.message };
  }
}