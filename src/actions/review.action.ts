"use server"

import { serverFetch } from "@/lib/fetchApi";
import { ReviewPayload } from "@/types/review.type";


export const createReview = async (payload: ReviewPayload) => {
  try {
    const data = await serverFetch("/reviews", {
      method: "POST",
      body: JSON.stringify(payload)
    })
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}