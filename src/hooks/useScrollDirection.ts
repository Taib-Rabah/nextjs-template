import { useEffect, useState } from "react";

let prevScrollY = 0;

export type ScrollDirection = -1 | 0 | 1; // -1 = up, 0 = none, 1 = down

export default function useScrollDirection(): ScrollDirection {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(0);

  useEffect(() => {
    prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const newScrollDirection = currentScrollY > prevScrollY ? 1 : -1;
      setScrollDirection(newScrollDirection);
      prevScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollDirection;
}
