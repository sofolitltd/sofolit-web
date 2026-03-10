"use client";

import React, { useState, useEffect } from "react";
import LinkNext from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { Menu, Rocket, Calendar } from "lucide-react";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const CALENDLY_URL = "https://calendly.com/sofolitltd/30min";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <div className="fixed top-2 left-0 w-full z-50 flex justify-center px-4 pointer-events-none">
      <nav className={cn(
        "w-full max-w-5xl px-8 py-3 flex justify-between items-center transition-all duration-500 pointer-events-auto",
        "bg-background/80 backdrop-blur-xl border border-border/50 shadow-2xl rounded-full",
        isScrolled ? "scale-[0.98] border-primary/20 py-2.5" : "scale-100"
      )}>
        <LinkNext href="/" className="text-xl font-black tracking-tighter flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <span className="hidden sm:inline">SOFOL <span className="text-primary">IT</span></span>
        </LinkNext>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden lg:flex items-center gap-6 text-sm font-bold text-muted-foreground">
            {navLinks.map((link) => (
              <LinkNext
                key={link.name}
                href={link.href}
                className={cn(
                  "hover:text-primary transition-all relative py-1 px-1",
                  pathname === link.href && "text-primary"
                )}
              >
                {link.name}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full animate-in fade-in zoom-in duration-300" />
                )}
              </LinkNext>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button className="p-2 rounded-full border border-border bg-background/50 text-foreground">
                    <Menu className="w-5 h-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-xl">
                  <SheetHeader className="text-left mb-8">
                    <SheetTitle className="text-2xl font-black tracking-tighter">
                      SOFOL <span className="text-primary">IT</span>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6">
                    {navLinks.map((link) => (
                      <LinkNext
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "text-xl font-bold hover:text-primary transition-colors",
                          pathname === link.href ? "text-primary" : "text-foreground"
                        )}
                      >
                        {link.name}
                      </LinkNext>
                    ))}
                    <hr className="border-border/50" />
                    <a 
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
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
              className="hidden sm:flex items-center gap-2 px-6 py-2 rounded-full bg-primary text-white font-bold text-sm hover:shadow-[0_0_20px_rgba(51,150,230,0.4)] transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4" /> Book a Call
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};
