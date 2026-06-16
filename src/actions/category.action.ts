"use server"

import { serverFetch } from "@/lib/fetchApi";
import { ICategory } from "@/types/category.types";
import { revalidatePath } from "next/cache";

export const createCategory = async (payload: ICategory) => {
  try {
    const data = await serverFetch("/categories", {
      method: "POST",
      body: JSON.stringify(payload),
    })
    revalidatePath("/categories")
    return data;
  } catch (error: any) {
    console.log("Categories fetch failed:", error.message);
  }
}

export const updateCategory = async (id: string, name: string) => {
  try {
    const data = await serverFetch(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify({name})
    })
    revalidatePath("/categories")
    return data;
  } catch (error: any) {
    console.log("Categories update failed:", error.message);
  }
}

export const deleteCategory = async (id: string) => {
  try {
    const data = await serverFetch(`/categories/${id}`, {
      method: "DELETE",
    })
    revalidatePath("/categories")
    return data;
  } catch (error: any) {
    console.log("Categories delete failed:", error.message);
  }
}