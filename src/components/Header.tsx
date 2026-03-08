
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { Menu, X, Rocket, Calendar } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const CALENDLY_URL = "https://calendly.com/sofolitltd/30min";

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Work", href: "/work" },
    { name: "Blog", href: "/blog" },
    { name: "Process", href: "/#process" },
    { name: "Our Story", href: "/#story" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 flex justify-between items-center glass-card bg-background/70 backdrop-blur-xl border-b border-border/50">
      <Link href="/" className="text-2xl font-black tracking-tighter flex items-center gap-2 group">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
          <Rocket className="w-5 h-5 text-white" />
        </div>
        <span>SOFOL <span className="text-primary">IT</span></span>
      </Link>

      <div className="flex items-center gap-4 md:gap-8">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-muted-foreground">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "hover:text-primary transition-all relative py-2",
                pathname === link.href && "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="p-2 rounded-full border border-border bg-background/50 text-foreground">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l border-border/50 bg-background/95 backdrop-blur-xl">
                <SheetHeader className="text-left mb-8">
                  <SheetTitle className="text-2xl font-black tracking-tighter">
                    SOFOL <span className="text-primary">IT</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-xl font-bold hover:text-primary transition-colors",
                        pathname === link.href ? "text-primary" : "text-foreground"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <hr className="border-border/50" />
                  <a 
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-4 rounded-2xl bg-primary text-white font-black text-center shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-5 h-5" /> Book a Call
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <a 
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full border border-primary/20 hover:border-primary bg-primary/5 hover:bg-primary text-foreground hover:text-white font-bold transition-all"
          >
            <Calendar className="w-4 h-4" /> Book a Call
          </a>
        </div>
      </div>
    </nav>
  );
};
