import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

export function useScrollDirection<T extends HTMLElement>(
  scrollRef: RefObject<T | null>,
  threshold = 10) {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let lastScrollTop = el.scrollTop;

    const handleScroll = () => {
      const currentScrollTop = el.scrollTop;
      // console.log({ currentScrollTop, lastScrollTop })
      const diff = currentScrollTop - lastScrollTop;

      if (Math.abs(diff) > threshold) {
        setScrollDirection(diff > 0 ? 'down' : 'up');
        lastScrollTop = currentScrollTop;
      }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [scrollRef, threshold]);

  return scrollDirection;
}
