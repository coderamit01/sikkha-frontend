import { serverFetch } from "@/lib/fetchApi";

export const getAllCategory = async() => {
  try {
      const data = await serverFetch("/categories",{
        cache: "no-cache",
      })
      return data;
    } catch (error:any) {
      console.log("Categories fetch failed:", error.message);
    }
}