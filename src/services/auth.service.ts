import api from "@/lib/axios"
import { serverFetch } from "@/lib/fetchApi";
import { NextRequest } from "next/server";


export const getUser = async (req: NextRequest) => {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/me`, {
      headers: {
        cookie: req.headers.get("cookie") ?? "",
      }
    });
    if (!res.ok) return null;
    const data = await res.json();

    return data.data;
  } catch (error) {
    return null;
  }
}

export const logOut = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
}

export const getAllUser = async() => {
  try {
    const data = await serverFetch("/users", {
      method: "GET",
    });
    return data.data;
  } catch {
    return {success: false, message: "Login failled"};
  }
}