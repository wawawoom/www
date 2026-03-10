import { useEffect, useRef, useState } from "react";

import type Lamp from "../../interface/lamp.interface";
import LampCard from "../LampCard/LampCard";
import "./Collection.css";

interface CollectionProps {
  lamps: Lamp[];
  onOpenModal: (lamp: Lamp) => void;
}

const Collection = (props: CollectionProps) => {
  const { lamps, onOpenModal } = props;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    // Initial check
    updateScrollButtons();

    // Listen to scroll events
    container.addEventListener("scroll", updateScrollButtons);

    // Listen to resize events
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [lamps]);

  const getScrollAmount = (): number => {
    if (!scrollContainerRef.current) return 0;

    const container = scrollContainerRef.current;
    const firstCard = container.querySelector(".lamp-card") as HTMLElement;

    if (!firstCard) return 0;

    const cardWidth = firstCard.offsetWidth;
    const gap = parseFloat(
      getComputedStyle(container).getPropertyValue("gap") || "20"
    );

    return cardWidth * 6 + gap * 6;
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="collection">
      <button
        className="collection-nav collection-nav-prev"
        onClick={scrollLeft}
        data-active={canScrollLeft}
      >
        ‹
      </button>

      <div className="collection-images" ref={scrollContainerRef}>
        {lamps.map((lamp) => (
          <LampCard key={lamp.id} {...lamp} onOpenModal={onOpenModal} />
        ))}
      </div>

      <button
        className="collection-nav collection-nav-next"
        onClick={scrollRight}
        data-active={canScrollRight}
      >
        ›
      </button>
    </section>
  );
};

export default Collection;
