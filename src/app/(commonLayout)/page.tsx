import { Categories } from "@/components/public/Categories";
import { Hero } from "@/components/public/Hero";
import { HowItWorks } from "@/components/public/HowItWorks";
import { Testimonials } from "@/components/public/Testimonials";
import { Tutors } from "@/components/public/Tutors";
import { getAllCategory } from "@/services/category.service";
import { getAllReview } from "@/services/review.service";
import { getAllTutors } from "@/services/tutor.service";

export default async function Home() {
  const categoryRes = await getAllCategory();
  const TutorRes = await getAllTutors();
  const ReviewRes = await getAllReview();

  const categories = categoryRes?.data ?? [];
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
      <Categories categories={categories} />
      <Tutors tutors={topTutors} />
      <HowItWorks />
      <Testimonials reviews={reviews} />
    </>
  );
}
