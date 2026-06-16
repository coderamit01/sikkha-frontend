"use server";

import { serverFetch } from "@/lib/fetchApi";
import { revalidatePath } from "next/cache";

export const createSubject = async (categoryId: string) => {
  try {
    const data = await serverFetch(`/tutor-subjects`, {
      method: "POST",
      body: JSON.stringify({ categoryId }),
    })
    revalidatePath("/tutor/subject")
    return data;
  } catch (error: any) {
    console.log("Failled to create subject:", error.message);
  }
}

export const updateSubject = async (subjectId: string, categoryId: string) => {
  try {
    const data = await serverFetch(`/tutor-subjects/${subjectId}`, {
      method: "PUT",
      body: JSON.stringify({ categoryId }),
    })
    revalidatePath("/tutor/subject")
    return data;
  } catch (error: any) {
    console.log("Failled to update subject:", error.message);
  }
}

export const deleteSubject = async (id: string) => {
  try {
    const data = await serverFetch(`/tutor-subjects/${id}`, {
      method: "DELETE",
    })
    revalidatePath("/tutor/subject")
    return data;
  } catch (error: any) {
    console.log("Failled to create subject:", error.message);
  }
}