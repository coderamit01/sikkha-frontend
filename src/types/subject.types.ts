import { Category } from "@/types/category.types";

export interface Subject {
  id: string;
  tutorId: string;
  categoryId: string;
  category: Category
  createdAt: Date | string;
  updatedAt: Date | string;
}