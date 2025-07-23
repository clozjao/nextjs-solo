import { useEffect, useState, useRef } from "react";
import type { RefObject } from "react";

export function useScrollDirection<T extends HTMLElement>(
  scrollRef: RefObject<T | null>,
  threshold = 10
) {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );

  const lastScrollTopRef = useRef<number>(0);
  const lastDirectionRef = useRef<"up" | "down" | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    lastScrollTopRef.current = el.scrollTop;

    const handleScroll = () => {
      const currentScrollTop = el.scrollTop;
      const diff = currentScrollTop - lastScrollTopRef.current;
      const maxScrollTop = el.scrollHeight - el.clientHeight;

      if (
        Math.abs(diff) > threshold &&
        currentScrollTop > 0 &&
        currentScrollTop < maxScrollTop
      ) {
        const direction: "up" | "down" = diff > 0 ? "down" : "up";

        if (direction !== lastDirectionRef.current) {
          setScrollDirection(direction);
          lastDirectionRef.current = direction;
        }

        lastScrollTopRef.current = currentScrollTop;
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, [scrollRef, threshold]);

  return scrollDirection;
}
