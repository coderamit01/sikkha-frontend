import { StarIcon, HeartIcon } from "./Icons";
import { ITutorDetails } from "@/types/tutor.types";
import Image from "next/image";
import Link from "next/link";
import DummyTutor from "@/assets/tutor.webp";

export function Tutors({ tutors }: { tutors: ITutorDetails[] }) {
  return (
    <section id="tutors" className="section bg-[#fbfcfb]">
      <div className="max-w-310 mx-auto px-4 py-15 lg:py-18">
        <div className="flex justify-center mb-14">
          <div>
            <h2 className="text-3xl md:text-[44px] font-semibold leading-[1.08] mt-4">
              Featured <span className="text-brand">Tutors</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutors.map((t) => (
            <article className="tutor-card" key={t.name}>
              <div
                className={`relative w-full aspect-square rounded-2.5xl overflow-hidden mb-4 ${t.image}`}
              >
                <Image
                  src={t.image || DummyTutor}
                  alt={t.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-display font-bold text-[15px] md:text-[17px] text-ink">
                  {t.name}
                </h3>
                <div className="flex items-center gap-1 text-[13px] font-semibold text-ink shrink-0">
                  <StarIcon width={13} height={13} className="text-amber" />
                  {t.averageRating}
                </div>
              </div>
              <div className="flex items-center justify-between mt-auto pt-3.5 border-t border-line">
                <div className="font-display text-[20px] font-bold text-ink">
                  ${t.hourlyRate}
                  <small className="text-[13px] text-muted font-medium">
                    {" "}
                    / hr
                  </small>
                </div>
                <Link href={`/tutors/${t.id}`} className="book-btn">
                  Book session
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
