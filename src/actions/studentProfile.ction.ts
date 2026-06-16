"use server"
import { serverFetch } from "@/lib/fetchApi";
import { IUpdatePayload } from "@/types/user.types";
import { revalidatePath } from "next/cache";

export const updateUser = async (id: string, payload: IUpdatePayload) => {
  try {
    const data = await serverFetch(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    })
    revalidatePath("/profile/edit");
    return data;
  } catch (error: any) {
    console.log("Failed:", error.message);
  }
}