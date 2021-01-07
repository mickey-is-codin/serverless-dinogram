import { useEffect } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';

export const useCurrentTimeMount = () => {
  useEffect(() => {
    // on mount
    return () => {
      // on unmount
      const triggers = ScrollTrigger.getAll();
      triggers.forEach((trigger) => {			
        trigger.kill();
      });
    };
  }, []);
};