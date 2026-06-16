"use server"

import { serverFetch } from "@/lib/fetchApi";

export const logOut = async () => {
  try {
    const data = await serverFetch("/auth/logout", {
      method: "POST"
    })
    return data;
  } catch (error: any) {
    console.log("Categories update failed:", error.message);
  }
}