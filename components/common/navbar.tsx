"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LogoutConfirmationModal from "@/components/common/logout-confirmation-modal";
import { cn } from "@/lib/utils";
import { LogOut, Menu, User, X } from "lucide-react";

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
    href: "/appointment",
  },
];

function getInitials(name?: string | null, email?: string | null) {
  const value = name?.trim() || email?.trim() || "User";
  const parts = value.split(/\s+/);

  if (parts.length > 1) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  return value.slice(0, 2).toUpperCase();
}

function UserMenu({ onNavigate }: { onNavigate?: () => void }) {
  const router = useRouter();
  const { data: session } = useSession();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const userName = session?.user?.fullName || session?.user?.name || "My Account";
  const userEmail = session?.user?.email;
  const profileImage = session?.user?.profileImage || session?.user?.image;

  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDropdownOpen]);

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    onNavigate?.();
    router.push("/profile");
  };

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    setIsLogoutOpen(true);
  };

  return (
    <>
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          aria-label="Open account menu"
          onClick={() => setIsDropdownOpen((current) => !current)}
          className="flex h-11 min-w-11 cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/10 px-1.5 pr-3 text-white transition hover:border-[#D89A2A] hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D89A2A]/70"
        >
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#BB7B1D] bg-cover bg-center text-xs font-semibold text-white"
            style={profileImage ? { backgroundImage: `url(${profileImage})` } : undefined}
          >
            {!profileImage ? getInitials(userName, userEmail) : null}
          </span>
          <span className="hidden max-w-28 truncate text-sm font-medium sm:block">
            {userName}
          </span>
        </button>

        {isDropdownOpen ? (
          <div className="absolute right-0 top-full z-[90] mt-2 min-w-52 rounded-lg border border-white/10 bg-[#151515] p-1.5 text-white shadow-2xl">
            <div className="border-b border-white/10 px-3 py-2">
              <p className="truncate text-sm font-medium">{userName}</p>
              {userEmail ? (
                <p className="truncate text-xs text-white/60">{userEmail}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={handleProfileClick}
              className="mt-1 flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-left text-sm outline-none transition hover:bg-white/10 focus:bg-white/10"
            >
              <User className="h-4 w-4 text-[#D89A2A]" />
              Profile
            </button>
            <button
              type="button"
              onClick={handleLogoutClick}
              className="flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-200 outline-none transition hover:bg-red-500/10 focus:bg-red-500/10"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        ) : null}
      </div>

      <LogoutConfirmationModal
        open={isLogoutOpen}
        onOpenChange={setIsLogoutOpen}
      />
    </>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

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
        isScrolled || isMenuOpen
          ? " bg-black/85 shadow-[0_12px_36px_rgba(0,0,0,0.35)] backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-5 sm:h-24 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-white"
          onClick={() => setIsMenuOpen(false)}
        >
         <Image src="/logo.png" alt="logo" width={1000} height={1000} className="h-12 w-[72px] object-contain sm:h-14 sm:w-20 md:h-[70px] md:w-[100px]" />
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
        <div className="hidden items-center gap-2 lg:flex">
          {isLoggedIn ? (
            <UserMenu />
          ) : (
            <Link
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-full bg-white px-6 text-base font-medium text-[#BB7B1D] transition hover:bg-white/80"
            >
              Login
            </Link>
          )}

          <Link
            href="/request-quote"
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#BB7B1D] px-6 text-base font-medium text-white transition hover:bg-[#BB7B1D]/80"
          >
            Request a Quote
          </Link>
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen((current) => !current)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition hover:border-[#D89A2A] hover:text-[#D89A2A] lg:hidden"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      <div
        className={cn(
          "grid overflow-hidden border-t border-white/10 bg-black/95 px-5 transition-[grid-template-rows] duration-300 lg:hidden",
          isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0">
          <nav className="flex flex-col gap-1 py-4">
            {menus.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-light text-white transition hover:bg-white/10 hover:text-[#D89A2A]"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="grid gap-3 pb-5 sm:grid-cols-2">
            {isLoggedIn ? (
              <div className="flex justify-center sm:justify-start">
                <UserMenu onNavigate={() => setIsMenuOpen(false)} />
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-medium text-[#BB7B1D] transition hover:bg-white/80"
              >
                Login
              </Link>
            )}
            <Link
              href="/request-quote"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#BB7B1D] px-5 text-sm font-medium text-white transition hover:bg-[#BB7B1D]/80"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
