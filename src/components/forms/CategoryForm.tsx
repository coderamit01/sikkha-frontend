"use client";

import { createCategory } from "@/actions/category.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ICategory } from "@/types/category.types";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const CategoryForm = () => {
  const [value, setValue] = useState<ICategory>({ name: "" });
  const [isPending, startTransition] = useTransition();
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const result = await createCategory(value);
        if (result?.success) {
          toast.success("Category created successfully", {
            position: "top-right",
          });
          setValue({ name: "" });
        } else {
          toast.error("Failed to create category", { position: "top-right" });
        }
      } catch (error: any) {
        toast.error("Failed to create category", { position: "top-right" });
      }
    })
  };
  return (
    <Card>
      <CardHeader className="text-start">
        <CardTitle className="text-xl">Create Category</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup className="gap-2 pb-3">
            <FieldLabel htmlFor="categoryName">Category Name</FieldLabel>
            <Input
              id="categoryName"
              name="categoryName"
              value={value.name}
              onChange={(e) => setValue({ ...value, name: e.target.value })}
              placeholder="Enter category name"
              autoComplete="off"
              className="h-11"
            />
          </FieldGroup>

          <Button
            onClick={handleCreate}
            type="submit"
            size="default"
            className="py-5 cursor-pointer bg-brand hover:bg-brand-dark text-white"
          >
            {isPending ? "Creating..." : "Create"}
          </Button>
        </form>
      </CardContent>
    </Card >
  )
}

export default CategoryForm