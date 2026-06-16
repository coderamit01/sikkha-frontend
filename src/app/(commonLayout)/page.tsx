import CategorySection from "@/components/public/CategorySection";
import { Hero } from "@/components/public/Hero";
import { HowItWorks } from "@/components/public/HowItWorks";
import { Testimonials } from "@/components/public/Testimonials";
import { Tutors } from "@/components/public/Tutors";
import { getAllCategory } from "@/services/category.service";
import { getAllReview } from "@/services/review.service";
import { getAllTutorsPublic } from "@/services/tutor.service";


export default async function Home() {
  const TutorRes = await getAllTutorsPublic();
  const ReviewRes = await getAllReview();
  const categoryRes = await getAllCategory();

  const tutors = TutorRes?.data.tutors ?? [];
  const reviews = ReviewRes?.data ?? [];
  const categories = categoryRes?.data ?? [];

  const topTutors = (tutors ?? [])
    .sort(
      (a: { averageRating: number }, b: { averageRating: number }) =>
        b.averageRating - a.averageRating,
    )
    .slice(0, 4);

  return (
    <>
      <Hero />
      <CategorySection categories={categories} />
      <Tutors tutors={topTutors} />
      <HowItWorks />
      <Testimonials reviews={reviews} />
    </>
  );
}
