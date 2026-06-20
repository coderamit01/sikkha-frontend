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
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Category } from "@/types/category.types";
import { useState, useTransition } from "react";
import { updateCategory } from "@/actions/category.action";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CategoryUpdateModal = ({
  isOpen,
  setIsOpen,
  category,
  allcategories,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  category: Category;
  allcategories: Category[];
}) => {
  const { id, name } = category;
  const [categoryId, setCategoryId] = useState(name);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCategory = allcategories.find((k) => k.id === categoryId);
    if (!selectedCategory) return;

    startTransition(async () => {
      try {
        const result = await updateCategory(selectedCategory.id, selectedCategory.name);
        console.log(result);
        if (result?.success) {
          toast.success("Category updated successfully", {
            position: "top-right",
          });
          setIsOpen(false);
        } else {
          toast.error("Failed to update category", { position: "top-right" });
        }
      } catch (error) {
        toast.error("Failed to update category", { position: "top-right" });
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
        </DialogHeader>

        <form>
          <Label htmlFor="category" className="pb-2">
            Name
          </Label>

          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectGroup>
                {allcategories.map((k) => (
                  <SelectItem key={k.id} value={k.id}>
                    {k.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
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