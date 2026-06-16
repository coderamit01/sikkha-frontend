"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types/category.types"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { createSubject } from "@/actions/subject.action";

const SubjectAddForm = ({ categories }: { categories: Category[] }) => {
  const [value, setValue] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) {
      toast.error("Please select a subject", { position: "top-right" });
      return;
    }
    startTransition(async () => {
      try {
        const result = await createSubject(value);
        if (result?.success) {
          toast.success("Subject Added successfully", {
            position: "top-right",
          });
          setValue("");
        } else {
          toast.error("Failed to add subject", { position: "top-right" });
        }
      } catch (error: any) {
        toast.error("Failed to add subject", { position: "top-right" });
      }
    })
  };

  return (
    <Card>
      <CardHeader className="text-start">
        <CardTitle className="text-xl">Add Subject</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <Select
            value={value}
            onValueChange={setValue}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Subject" />
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

          <Button
            onClick={handleCreate}
            size="default"
            className="py-5 cursor-pointer bg-brand hover:bg-brand-dark text-white mt-3">
            {isPending ? "Adding..." : "Add"}
          </Button>
        </form>
      </CardContent>
    </Card >
  )
};

export default SubjectAddForm;