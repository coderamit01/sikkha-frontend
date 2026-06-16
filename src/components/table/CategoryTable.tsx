"use client";
import { Category } from "@/types/category.types";
import { TableCell, TableRow } from "@/components/ui/table";
import { SquarePen, Trash2 } from "lucide-react";
import { deleteCategory } from "@/actions/category.action";
import { toast } from "sonner";
import { useState } from "react";
import CategoryUpdateModal from "@/components/modal/CategoryUpdateModal";

const CategoryTable = ({ category }: { category: Category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { id, name } = category;
  const handleDelete = async () => {
    try {
      const result = await deleteCategory(id);
      if (result?.success) {
        toast.success("Category deleted successfully", { position: "top-right" })
      } else {
        toast.error("Failed to delete category", { position: "top-right" })
      }
    } catch (error) {
      toast.error("Failed to delete category", { position: "top-right" })
    }
  }
  const handleOpen = () => {
    setIsOpen(true);
  }
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell className="text-right flex items-center gap-2 justify-end">
        <SquarePen
          onClick={handleOpen}
          className="w-6 h-6 cursor-pointer bg-slate-200 p-1 rounded"
        />
        <Trash2
          onClick={handleDelete}
          className={`w-6 h-6 cursor-pointer bg-red-100 text-red-600 p-1 rounded`}
        />

        <CategoryUpdateModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          category={category}
        />
      </TableCell>
    </TableRow>
  );
};

export default CategoryTable;
