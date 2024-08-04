"use client";

import { useScrollDirection } from "@/hooks";

export default function Header() {
  const isVisible = useScrollDirection() !== 1; // 1 = down

  return (
    <header className={`sticky top-0 backdrop-blur-sm ${isVisible ? "duration-200" : "-translate-y-full duration-100"}`}>
      <p>Header</p>
    </header>
  );
}
