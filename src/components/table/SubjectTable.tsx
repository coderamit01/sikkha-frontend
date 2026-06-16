"use client"
import { TableCell, TableRow } from "@/components/ui/table";
import { SquarePen, Trash2 } from "lucide-react";
import { Subject } from "@/types/subject.types"
import { useState } from "react";
import SubjectUpdateModal from "@/components/modal/SubjectUpdateModal";
import { Category } from "@/types/category.types";
import { deleteSubject } from "@/actions/subject.action";
import { toast } from "sonner";


const SubjectTable = ({ subject, categories }: { subject: Subject; categories: Category[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { id, category } = subject;

  const handleOpen = () => {
    setIsOpen(true);
  }

  const handleDelete = async () => {
    try {
      const result = await deleteSubject(id);
      if (result?.success) {
        toast.success("Subject deleted successfully", {
          position: "top-right",
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete subject", {
        position: "top-right",
      });
    }
  }

  return (
    <TableRow>
      <TableCell>{category.name}</TableCell>
      <TableCell className="text-right flex items-center gap-2 justify-end">
        <SquarePen
          onClick={handleOpen}
          className="w-6 h-6 cursor-pointer bg-slate-200 p-1 rounded"
        />
        <Trash2
          onClick={handleDelete}
          className={`w-6 h-6 cursor-pointer bg-red-100 text-red-600 p-1 rounded`}
        />

        <SubjectUpdateModal
          key={subject.id}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          subject={subject}
          categories={categories}
        />
      </TableCell>
    </TableRow>
  )
}

export default SubjectTable