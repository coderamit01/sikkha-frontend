import { clientFetch, serverFetch } from "@/lib/fetchApi";

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
export const getMyCategories = async() => {
  try {
      const data = await serverFetch("/categories/me",{
        cache: "no-cache",
      })
      return data;
    } catch (error:any) {
      return {success:false, message: error.message}
    }
}

export const getAllCategoryPublic = async() => {
  try {
      const data = await clientFetch("/categories",{
        next: {revalidate: 60}
      })
      return data;
    } catch (error:any) {
      console.log("Categories fetch failed:", error.message);
    }
}