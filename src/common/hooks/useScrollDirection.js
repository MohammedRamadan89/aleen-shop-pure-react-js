import { useState, useEffect, useRef } from "react";

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY.current ? "down" : "up";

      if (
        direction !== scrollDirection &&
        (currentScrollY - lastScrollY.current > 5 || 
         lastScrollY.current - currentScrollY > 5)
      ) {
        setScrollDirection(direction);
      }

      lastScrollY.current = currentScrollY > 0 ? currentScrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, [scrollDirection]);

  return scrollDirection;
};

export default useScrollDirection;