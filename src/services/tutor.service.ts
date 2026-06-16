import { clientFetch, serverFetch } from "@/lib/fetchApi";
import { ITutorRegister } from "@/types/tutor.types";
import { string } from "zod";


export const getAllTutors = async (filters?: {
  category?: string | string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  search?: string;
}) => {
  try {
    const queryParams = new URLSearchParams();
    if (filters?.category) {
      const categories = Array.isArray(filters.category) ? filters.category : [filters.category];
      categories.forEach((cat: string) => { queryParams.append("category", cat) })
    }
    if (filters?.minPrice) queryParams.append("minPrice", String(filters.minPrice));
    if (filters?.maxPrice) queryParams.append("maxPrice", String(filters.maxPrice));
    if (filters?.minRating) queryParams.append("minRating", String(filters.minRating));
    if (filters?.search) queryParams.append("search", filters.search);

    const queryString = queryParams.toString();
    const url = queryString ? `/tutors?${queryString}` : "/tutors";

    const data = await serverFetch(url, {
      method: "GET",
      cache: "no-cache",
    })
    return data;
  } catch (error: any) {
    console.log("Tutor fetch failed:", error.message);
  }
}
export const getTutorByID = async (id: string) => {
  try {
    const data = await serverFetch(`/tutors/${id}`, {
      method: "GET",
      cache: "no-cache",
    })
    return data;
  } catch (error: any) {
    console.log("Tutor fetch failed:", error.message);
  }
}

export const createTtutor = async (payload: ITutorRegister) => {
  try {
    const data = await clientFetch("/users/create-tutor", {
      method: "POST",
      body: JSON.stringify(payload),
    })
    return data;
  } catch (error: any) {
    console.log("Creating tutor failed:", error.message);
  }
}
