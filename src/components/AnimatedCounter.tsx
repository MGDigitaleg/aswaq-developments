import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string; // e.g. "20+", "3B+", "400+"
  duration?: number;
  className?: string;
}

const AnimatedCounter = ({ value, duration = 2000, className }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Parse the value: extract prefix, number, suffix
    const match = value.match(/^([^\d]*)(\d+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const prefix = match[1];
    const target = parseInt(match[2], 10);
    const suffix = match[3];

    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return <span ref={ref} className={className}>{display}</span>;
};

export default AnimatedCounter;
