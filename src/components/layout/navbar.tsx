"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export interface NavItem {
  name: string;
  path: string;
}

const navLink: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "Tutors", path: "/tutors" },
  { name: "About Us", path: "/about-us" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  const isActive = (url: string) => {
    return pathName === url;
  };
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-md">
      <div className="max-w-310 mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h2 className="text-2xl font-semibold">
            <Link href="/" className="flex items-center gap-2 group">
              Skill<span className="text-brand">Bridge</span>
            </Link>
          </h2>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLink.map((item, id) => (
              <Link
                key={id}
                href={item.path}
                className={`text-base font-semibold hover:text-brand transition-colors ${isActive(item.path) ? "text-brand" : "text-gray-700"}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button
              asChild
              variant="ghost"
              className="text-base font-semibold text-gray-700 hover:text-brand hover:bg-green-50"
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              className="rounded-full bg-brand hover:bg-brand-dark text-white px-6 py-2.5 text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              <Link href="/signup">Register</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-4 py-4 space-y-4">
              {navLink.map((item, id) => (
                <Link
                  key={id}
                  href={item.path}
                  className="block text-base font-semibold text-gray-700 hover:text-brand"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <Button
                  asChild
                  variant="outline"
                  className="w-full font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="w-full rounded-full bg-brand hover:bg-brand-dark text-white font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/signup">Register</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
