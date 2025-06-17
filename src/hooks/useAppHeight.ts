import { useEffect } from 'react';

export function useAppHeights() {
  useEffect(() => {
    const setAppHeight = () => {
      const height = window.innerHeight ;
      document.documentElement.style.setProperty('--app-height', `${height}px`);
    };

    setAppHeight();

    window.addEventListener('resize', setAppHeight);
    window.addEventListener('orientationchange', setAppHeight);

    return () => {
      window.removeEventListener('resize', setAppHeight);
      window.removeEventListener('orientationchange', setAppHeight);
    };
  }, []);
}
