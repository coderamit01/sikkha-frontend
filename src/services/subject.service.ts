import { serverFetch } from "@/lib/fetchApi";

export const getAllSubject = async () => {
  try {
    const data = await serverFetch("/tutor-subjects", {
      cache: "no-cache",
    })

    return data;
  } catch (error: any) {
    console.log("Subject fetch failed:", error.message);
  }
}