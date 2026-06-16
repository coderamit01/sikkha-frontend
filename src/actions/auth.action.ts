"use server"

import { serverFetch } from "@/lib/fetchApi";
import { ILoginPayload, IRegisterPayload } from "@/types/user.types";
import { cookies } from "next/headers";


export const userLogin = async (payload: ILoginPayload) => {
  try {
    const data = await serverFetch(`/auth/login`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data;
  } catch {
    return { success: false, message: "Login failled" };
  }
};



export const userRegister = async (payload: IRegisterPayload) => {
  try {
    const data = await serverFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data;
  } catch {
    return { success: false, message: "Registration failled" };
  }
};



export const setAuthTokens = async ({
  accessToken,
  refreshToken,
  sessionToken,
}: {
  accessToken: string;
  refreshToken: string;
  sessionToken: string;
}) => {

  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set("session_token", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

}