"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Category } from "@/types/category.types";
import { useState, useTransition } from "react";
import { updateCategory } from "@/actions/category.action";

const CategoryUpdateModal = ({
  isOpen,
  setIsOpen,
  category,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  category: Category;
}) => {
  const { id, name } = category;
  const [value, setValue] = useState(name);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const result = await updateCategory(id, value);
        if (result?.success) {
          toast.success("Category updated successfully", { position: "top-right" })
          setIsOpen(false);
        } else {
          toast.error("Failed to update category", { position: "top-right" })
        }
      } catch (error) {
        toast.error("Failed to update category", { position: "top-right" })
      }
    });
  }


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
        </DialogHeader>

        <form>
          <Label htmlFor="name" className="pb-2">Name</Label>
          <Input
            id="name"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">Cancel</Button>
            </DialogClose>
            <Button
              onClick={handleSubmit}
              disabled={isPending}
              className="cursor-pointer bg-brand text-white hover:bg-brand-dark"
            >
              {isPending ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryUpdateModal;


