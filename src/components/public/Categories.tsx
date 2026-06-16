import { Category } from "@/types/category.types";
import { BookOpen } from "lucide-react";

export function Categories({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {categories.map((category) => (
        <div className="cat-card" key={category.id}>
          <div className="ico w-14 h-14 bg-green-50 rounded-2xl grid place-items-center mb-5">
            <BookOpen className="text-brand" />
          </div>
          <h3 className="font-display font-bold text-[15px] md:text-[17px] text-ink mb-1">
            {category.name}
          </h3>
        </div>
      ))}
    </div>
  );
}
