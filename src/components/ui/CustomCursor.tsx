"use client";

import React, { useEffect, useRef, useState } from "react";

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (dotRef.current && ringRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        ringRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovered(
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.classList.contains("cursor-pointer")
      );
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <>
      <div 
        ref={ringRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/30 pointer-events-none z-[1000] hidden md:block -ml-4 -mt-4 transition-all duration-300 ease-out ${
          isHovered ? "scale-150 bg-primary/5 border-primary/50" : "scale-100"
        }`}
      />
      <div 
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-primary pointer-events-none z-[1000] hidden md:block -ml-[3px] -mt-[3px] transition-transform duration-100 ease-out ${
          isHovered ? "scale-150" : "scale-100"
        }`}
      />
    </>
  );
};
