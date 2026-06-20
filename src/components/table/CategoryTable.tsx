"use client";
import { Category } from "@/types/category.types";
import { TableCell, TableRow } from "@/components/ui/table";
import { SquarePen, Trash2 } from "lucide-react";
import { removeCategory } from "@/actions/category.action";
import { toast } from "sonner";
import { useState } from "react";

const CategoryTable = ({ category,allcategories }: { category: Category, allcategories: Category[]  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { id, name } = category;
  const handleDelete = async () => {
    try {
      const result = await removeCategory(id);
      if (result?.success) {
        toast.success("Category deleted successfully", {
          position: "top-right",
        });
      } else {
        toast.error("Failed to delete category", { position: "top-right" });
      }
    } catch (error) {
      toast.error("Failed to delete category", { position: "top-right" });
    }
  };
  const handleOpen = () => {
    setIsOpen(true);
  };
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell className="text-right flex items-center gap-2 justify-end">
        <Trash2
          onClick={handleDelete}
          className={`w-6 h-6 cursor-pointer bg-red-100 text-red-600 p-1 rounded`}
        />

      </TableCell>
    </TableRow>
  );
};

export default CategoryTable;
