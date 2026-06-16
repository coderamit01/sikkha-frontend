import PageTitle from "@/components/frontend/PageTitle";
import TutorSidebar from "@/components/public/TutorSidebar";
import TutorList from "@/components/public/TutorList";
import { getAllTutors } from "@/services/tutor.service";
import { ITutorDetails } from "@/types/tutor.types";
import SearchTutor from "@/components/public/SearchTutor";
import { getAllCategory } from "@/services/category.service";
import { Category } from "@/types/category.types";
import { Env } from "@/env";

interface SearchParams {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  minRating?: string;
  search?: string;
}

export default async function TutorsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { category, minPrice, maxPrice, minRating, search } =
    await searchParams;
  const filters = {
    category,
    search,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    minRating: minRating ? Number(minRating) : undefined,
  };

  const data = await getAllTutors(filters);
  const tutors: ITutorDetails[] = data?.data?.tutors || [];

  const categoryData = await getAllCategory();
  const categories: Category[] = categoryData?.data || [];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <PageTitle
        title="Find your tutor"
        subText="Find the perfect tutor for your learning goals"
      />
      <div className="max-w-310 mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-3">
            <TutorSidebar
              categories={categories}
              currentFilters={{
                category,
                minPrice,
                maxPrice,
                minRating,
              }}
            />
          </div>
          <div className="col-span-12 lg:col-span-9">
            <SearchTutor search={search} />
            <TutorList tutors={tutors} />
          </div>
        </div>
      </div>
    </div>
  );
}
