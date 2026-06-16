
import { Env } from "@/env";
import { cookies } from "next/headers";

const API_URL = `${Env.runtimeEnv.BACKEND_URL}/api/v1`;

export const getMe = async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: {
        cookie: cookieStore.toString(),
      },
    });
    if(!res.ok) return {data: null};
    return res.json();
  } catch (error:any) {
    console.log("Failed to load user", error.message);
    return null;
  }
};