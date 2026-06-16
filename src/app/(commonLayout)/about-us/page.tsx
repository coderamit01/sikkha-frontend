import { BookOpen, Target, Sparkles, Lightbulb, Shield } from "lucide-react";
import titleBg from "@/assets/title_bg.webp";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <section
        className="relative overflow-hidden  text-white bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${titleBg.src})` }}
      >
        <div className="max-w-310 mx-auto">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative container mx-auto px-4 py-24 md:py-32">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                About Skill Bridge
              </h1>
              <p className="text-xl md:text-2xl text-slate-100 mb-8">
                Empowering students to reach their full potential through
                personalized tutoring
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 120"
              className="w-full h-auto text-slate-50"
              fill="currentColor"
            >
              <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
            </svg>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-310 mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <BookOpen className="w-4 h-4" />
                Our Tutoring
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Personalized Learning for Every Student
              </h2>
              <p className="text-lg text-slate-600 mb-4">
                Founded in 2020, LearnHub started with a simple belief: every
                student deserves access to quality education tailored to their
                unique learning style.
              </p>
              <p className="text-slate-600 mb-6">
                We provide one-on-one and small group tutoring across
                mathematics, sciences, languages, and test preparation. Our
                tutors are certified educators, university professors, and
                subject matter experts who are passionate about teaching.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-slate-700">1-on-1 Sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-slate-700">Small Groups (3-5)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-slate-700">24/7 Doubt Solving</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-linear-to-br from-teal-50 to-teal-100 rounded-2xl p-8 shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-md text-center">
                    <div className="text-3xl font-bold text-teal-600">
                      5,000+
                    </div>
                    <div className="text-sm text-slate-500">
                      Students Taught
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-md text-center">
                    <div className="text-3xl font-bold text-teal-600">98%</div>
                    <div className="text-sm text-slate-500">Success Rate</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-md text-center">
                    <div className="text-3xl font-bold text-teal-600">200+</div>
                    <div className="text-sm text-slate-500">Expert Tutors</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-md text-center">
                    <div className="text-3xl font-bold text-teal-600">15+</div>
                    <div className="text-sm text-slate-500">Subjects</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-310 mx-auto px-4">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Our Guiding Principles
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Everything we do is driven by our mission to transform education
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  Our Mission
                </h3>
                <p className="text-slate-600 mb-4">
                  To democratize access to quality education by providing
                  affordable, personalized tutoring that adapts to each
                  student's unique learning journey.
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />
                    <span>Build confidence through mastery-based learning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />
                    <span>Bridge learning gaps with targeted support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />
                    <span>Foster a love for lifelong learning</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                  <Lightbulb className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  Our Vision
                </h3>
                <p className="text-slate-600 mb-4">
                  A world where every student, regardless of background or
                  learning pace, has the tools and support to excel academically
                  and beyond.
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />
                    <span>Reach 1 million students by 2030</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />
                    <span>Expand to 50 cities worldwide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />
                    <span>Create AI-powered personalized learning tools</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-310 mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Our Core Values
            </h2>
            <p className="text-slate-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Excellence",
                desc: "We strive for the highest quality in every session",
                icon: Star,
              },
              {
                title: "Empathy",
                desc: "We understand and respect each student's journey",
                icon: Heart,
              },
              {
                title: "Innovation",
                desc: "We embrace new methods to enhance learning",
                icon: Zap,
              },
              {
                title: "Integrity",
                desc: "We're honest, transparent, and student-first",
                icon: Shield,
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="text-center p-6 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">{value.title}</h4>
                <p className="text-sm text-slate-500">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Star(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}

function Heart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
}

function Zap(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );
}
