"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const menus = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "Portfolio",
    href: "/portfolio",
  },
  {
    title: "FAQ",
    href: "/faq",
  },
  {
    title: "Book Appointment",
    href: "/#appointment",
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? " bg-black/85 shadow-[0_12px_36px_rgba(0,0,0,0.35)] backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-24 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-white">
         <Image src="/logo.png" alt="logo" width={1000} height={1000} className="h-14 w-20 object-contain md:h-[70px] md:w-[100px]" />
        </Link>

        {/* Menu */}
        <nav className="hidden lg:flex items-center gap-10">
          {menus.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-base text-[#FFFFFF] font-light transition hover:text-[#D89A2A]"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-2 sm:flex">
            <Button
          className="rounded-full text-base text-[#BB7B1D] bg-[#FFFFFF] px-6 h-10 hover:bg-[#FFFFFF]/80"
        >
          Login
        </Button>

        <Button
          className="rounded-full text-base text-white bg-[#BB7B1D] px-6 h-10 hover:bg-[#BB7B1D]/80"
        >
          Request a Quote
        </Button>
        </div>
      </div>
    </header>
  );
}
