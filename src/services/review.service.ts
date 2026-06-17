import { clientFetch, serverFetch } from "@/lib/fetchApi";


export const getAllReview = async () => {
  try {
    const data = await clientFetch(`/reviews`, {
      next: {revalidate: 60}
    })
    return data;
  } catch (error: any) {
    console.log("Review fetch failed:", error.message);
  }
}