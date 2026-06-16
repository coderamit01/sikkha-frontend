import { serverFetch } from "@/lib/fetchApi";

export const getAvailability = async () => {
  try {
    const data = await serverFetch("/tutors/availability", {
      method: "GET",
      cache: "no-cache",
    })
    return data;
  } catch (error: any) {
    console.log("Failled to fetch availability:", error.message);
  }
}
