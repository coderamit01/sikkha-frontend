import { serverFetch } from "@/lib/fetchApi";


export const getAllReview = async () => {
  try {
    const data = await serverFetch(`/reviews`, {
      method: "GET",
      cache: "no-cache",
    })
    return data;
  } catch (error: any) {
    console.log("Review fetch failed:", error.message);
  }
}