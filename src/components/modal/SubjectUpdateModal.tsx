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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Subject } from "@/types/subject.types";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { updateSubject } from "@/actions/subject.action";
import { Category } from "@/types/category.types";



const SubjectUpdateModal = ({
  isOpen,
  setIsOpen,
  subject,
  categories
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  subject: Subject;
  categories: Category[];
}) => {

  const [value, setValue] = useState(subject.category.id);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const result = await updateSubject(subject.id, value);

        if (result?.success) {
          toast.success("Subject updated successfully", { position: "top-right" })
          setIsOpen(false);
        } else {
          toast.error("Failed to update subject", { position: "top-right" })
        }
      } catch (error) {
        toast.error("Failed to update subject", { position: "top-right" })
      }
    })
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Update Subject</DialogTitle>
        </DialogHeader>

        <form>
          <div className="py-3 w-full">
            <Select
              value={value}
              onValueChange={setValue}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={subject.category.name} />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  {categories.map((k) => (
                    <SelectItem key={k.id} value={k.id}>
                      {k.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
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
  )
}

export default SubjectUpdateModal