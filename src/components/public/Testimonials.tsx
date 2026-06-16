import { IReview } from "@/types/review.type";
import { StarIcon } from "./Icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Testimonials({ reviews }: { reviews: IReview[] }) {
  return (
    <section className="section test-bg">
      <div className="max-w-310 mx-auto px-4 py-15 lg:py-18">
        <div className="flex justify-center mb-14">
          <h2 className="text-3xl md:text-[44px] leading-[1.08] mt-4 font-semibold">
            Student <span className="text-brand">stories</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-8 border border-line shadow-sm-soft flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg-soft"
            >
              <div className="flex gap-0.5 text-amber">
                {Array.from({ length: review.rating }).map((_, k) => (
                  <StarIcon
                    key={k}
                    width={16}
                    height={16}
                    className="text-yellow-500"
                  />
                ))}
              </div>
              <p className="font-display text-[18px] leading-snug text-ink font-medium tracking-tight flex-1">
                &ldquo;{review.comment}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-line">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={review?.student?.image}
                    className="rounded-full"
                  />
                  <AvatarFallback className="bg-[#25a5a21c] text-brand font-bold">
                    {review?.student?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-display text-[15px] font-bold text-ink leading-tight">
                    {review?.student?.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
