import { Categories } from "@/components/public/Categories";
import { Hero } from "@/components/public/Hero";
import { HowItWorks } from "@/components/public/HowItWorks";
import { Testimonials } from "@/components/public/Testimonials";
import { Tutors } from "@/components/public/Tutors";
import { CategoriesLoader } from "@/components/loader/CategoriesLoader";
import { getAllCategory } from "@/services/category.service";
import { getAllReview } from "@/services/review.service";
import { getAllTutors } from "@/services/tutor.service";
import { Suspense } from "react";

async function CategoriesSection() {
  const categoryRes = await getAllCategory();
  const categories = categoryRes?.data ?? [];
  return <Categories categories={categories} />;
}

export default async function Home() {
  const TutorRes = await getAllTutors();
  const ReviewRes = await getAllReview();

  const tutors = TutorRes?.data.tutors ?? [];
  const reviews = ReviewRes?.data ?? [];

  const topTutors = (tutors ?? [])
    .sort(
      (a: { averageRating: number }, b: { averageRating: number }) =>
        b.averageRating - a.averageRating,
    )
    .slice(0, 4);

  return (
    <>
      <Hero />
      <Suspense fallback={<CategoriesLoader />}>
        <CategoriesSection />
      </Suspense>
      <Tutors tutors={topTutors} />
      <HowItWorks />
      <Testimonials reviews={reviews} />
    </>
  );
}
