"use server"
import { serverFetch } from "@/lib/fetchApi";
import { IUpdatePayload } from "@/types/user.types";
import { revalidatePath } from "next/cache";

export const updateUser = async (formData: FormData) => {
  try {
    const data = await serverFetch(`/users/profile`, {
      method: "PUT",
      body: formData,
    })
    revalidatePath("/profile/edit");
    return data;
  } catch (error: any) {
    console.log("Failed:", error.message);
  }
}