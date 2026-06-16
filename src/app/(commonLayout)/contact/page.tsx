import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Users,
  Award,
} from "lucide-react";

import titleBg from "@/assets/title_bg.webp";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <section
        className="relative overflow-hidden  text-white bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${titleBg.src})` }}
      >
        <div className="max-w-310 mx-auto">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative container mx-auto px-4 py-20 md:py-28">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Get in Touch
              </h1>
              <p className="text-xl text-slate-50">
                We'd love to hear from you. Send us a message and we'll respond
                within 24 hours.
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

      <section className="max-w-310 mx-auto px-4 mt-10 relative z-10">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Call Us</h3>
            <p className="text-slate-500 text-sm">Mon-Fri 9am-6pm</p>
            <p className="text-teal-600 font-medium mt-2">+1 (555) 123-4567</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Email Us</h3>
            <p className="text-slate-500 text-sm">24/7 Support</p>
            <p className="text-teal-600 font-medium mt-2">hello@learnhub.com</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Visit Us</h3>
            <p className="text-slate-500 text-sm">Come say hello</p>
            <p className="text-teal-600 font-medium mt-2">
              123 Education St, NY 10001
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-310 mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <MessageSquare className="w-4 h-4" />
                Send a Message
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                Let's Start a Conversation
              </h2>
              <p className="text-slate-600 mb-8">
                Whether you have a question about our tutoring programs, want to
                schedule a session, or just want to say hello — we're here for
                you.
              </p>

              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Subject *
                  </label>
                  <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition bg-white">
                    <option>General Inquiry</option>
                    <option>Tutoring Programs</option>
                    <option>Become a Tutor</option>
                    <option>Partnership Opportunities</option>
                    <option>Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>

            <div>
              <div className="bg-slate-50 rounded-2xl p-6 md:p-8 mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-teal-600" />
                  Hours of Operation
                </h3>
                <div className="space-y-3 text-slate-600">
                  <div className="flex justify-between pb-2 border-b border-slate-200">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-200">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 md:p-8 mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  Quick Response
                </h3>
                <p className="text-slate-600 mb-4">
                  For urgent matters, you can reach us via phone during business
                  hours. Emails are typically answered within 24 hours.
                </p>
                <div className="flex items-center gap-3 text-teal-600">
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">
                    Emergency Hotline: +1 (555) 999-8888
                  </span>
                </div>
              </div>

              <div className="bg-slate-200 rounded-2xl overflow-hidden h-64 relative">
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                  <div className="text-center">
                    <MapPin className="w-10 h-10 text-teal-600 mx-auto mb-2" />
                    <p className="text-slate-500 text-sm">Interactive Map</p>
                    <p className="text-slate-400 text-xs">
                      123 Education Street, New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-310 mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600">
                Find quick answers to common questions below
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  q: "How do I book a tutoring session?",
                  a: "You can book a session through our online portal or by calling our support team during business hours.",
                },
                {
                  q: "Do you offer free trial sessions?",
                  a: "Yes! We offer a free 30-minute trial session for all new students to meet their tutor.",
                },
                {
                  q: "What subjects do you cover?",
                  a: "We cover Math, Science, English, Foreign Languages, Test Prep (SAT/ACT), and more.",
                },
                {
                  q: "Can I cancel or reschedule?",
                  a: "Yes, you can cancel or reschedule up to 24 hours before your session at no charge.",
                },
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold text-slate-800 mb-2">{faq.q}</h4>
                  <p className="text-slate-500 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
