import {
  ArrowIcon, StarIcon, HeartIcon, UsersIcon, CheckIcon, SparkIcon,
} from "./Icons";
import { FaceArt } from "./FaceArt";
import Link from "next/link";
import Image from "next/image";
import StudyImage from "@/assets/study.png"

export function Hero() {
  return (
    <section className="hero-glow relative overflow-hidden pt-14">
      <div className="max-w-310 mx-auto px-4 pb-10 lg:pb-20">
        <div className="wrap grid lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
          <div>
            <span className="eyebrow"><span className="dot" />Trusted by 50,000+ learners worldwide</span>
            <h1 className="mt-6 text-[clamp(42px,7vw,72px)] leading-[1.02] font-bold tracking-[-0.035em]">
              Find the right <span className="accent-underline">tutor.</span>
              <br />Learn at your pace.
            </h1>
            <p className="mt-6 text-[19px] text-slate-800 max-w-130">
              Connect with vetted experts across 200+ subjects. Personalized 1-on-1 sessions, transparent pricing, and progress you can actually see.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link className="btn btn-primary btn-icon-r" href="/tutors">
                Find a Tutor <ArrowIcon width={18} height={18} />
              </Link>
              <Link className="btn border border-slate-400 hover:bg-brand hover:text-white px-4 py-2.5" href="/signup">Become a Tutor</Link>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <div className="flex">
                {(["av-1", "av-2", "av-3", "av-4", "av-5"] as const).map((c, i) => (
                  <div
                    key={c}
                    className={`w-9 h-9 rounded-full border-2 border-[#fafbfa] ${c}`}
                    style={{ marginLeft: i === 0 ? 0 : -10 }}
                  />
                ))}
              </div>
              <div className="text-sm text-muted">
                <b className="text-ink font-semibold">4.9 / 5</b> · from 12,400+ verified reviews
              </div>
            </div>
          </div>

          <div className="">
            <Image src={StudyImage} alt="Study Image" />           
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  className, bg, color, icon, value, label, delay,
}: {
  className: string; bg: string; color: string; icon: React.ReactNode;
  value: string; label: string; delay: string;
}) {
  return (
    <div
      className={`absolute bg-white border border-line rounded-2.5xl px-[18px] py-3.5 shadow-md-soft flex items-center gap-3 animate-float ${className}`}
      style={{ animationDelay: delay }}
    >
      <div className="w-10 h-10 rounded-xl grid place-items-center" style={{ background: bg, color }}>
        {icon}
      </div>
      <div>
        <div className="font-display text-[18px] font-bold text-ink leading-none">{value}</div>
        <div className="text-xs text-muted mt-0.5">{label}</div>
      </div>
    </div>
  );
}
