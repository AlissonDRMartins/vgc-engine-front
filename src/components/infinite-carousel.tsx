import { motion, useAnimationFrame } from "framer-motion";
import {
  useRef,
  useState,
  useEffect,
  Children,
  isValidElement,
  cloneElement,
} from "react";

interface InfiniteCarouselProps {
  children: React.ReactNode;
  speed?: number;
}

export const InfiniteCarousel = ({
  children,
  speed = 0.5,
}: InfiniteCarouselProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (wrapper && inner) {
      const hasOverflow = inner.scrollWidth > wrapper.clientWidth;
      setShouldAnimate(hasOverflow);
    }
  }, [children]);

  useAnimationFrame(() => {
    if (shouldAnimate && innerRef.current) {
      const width = innerRef.current.scrollWidth / 2;
      setX((prev) => {
        const next = prev - speed;
        return Math.abs(next) >= width ? 0 : next;
      });
    }
  });

  const originalChildren = Children.toArray(children);
  const duplicatedChildren = originalChildren.map((child, index) =>
    isValidElement(child)
      ? cloneElement(child, { key: `dupe-${index}` })
      : child
  );

  const content = shouldAnimate
    ? [...originalChildren, ...duplicatedChildren]
    : originalChildren;

  return (
    <div
      ref={wrapperRef}
      className="overflow-hidden w-full flex justify-center"
    >
      <motion.div
        ref={innerRef}
        style={{ x }}
        className="flex gap-2 whitespace-nowrap will-change-transform"
      >
        {content}
      </motion.div>
    </div>
  );
};
