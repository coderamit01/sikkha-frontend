import { CategoriesLoader } from "@/components/loader/CategoriesLoader";
import { Categories } from "@/components/public/Categories";
import { Category } from "@/types/category.types";
import { Suspense } from "react";

const CategorySection = ({ categories }: { categories: Category[] }) => {
  return (
    <section id="categories" className="section">
      <div className="max-w-310 mx-auto px-4 py-15 lg:py-18">
        <div className="flex justify-center mb-14">
          <div>
            <h2 className="text-3xl md:text-[44px] font-semibold leading-[1.08] mt-4 text-center">
              Categories We <span className="text-brand">Offer</span>
            </h2>
          </div>
        </div>
        <Suspense fallback={<CategoriesLoader />}>
          <Categories categories={categories} />;
        </Suspense>
      </div>
    </section>
  )
}

export default CategorySection;