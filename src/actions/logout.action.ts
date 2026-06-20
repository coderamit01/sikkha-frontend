"use server"

import { cookies } from "next/headers";
import { serverFetch } from "@/lib/fetchApi";

export const logOut = async () => {
  try {
    const data = await serverFetch("/auth/logout", {
      method: "POST"
    });

    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("session_token");
    return data;
  } catch (error: any) {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("session_token");
    return { success: false, message: error.message || "Logout failled" };
  }
}