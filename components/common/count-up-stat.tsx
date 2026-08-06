"use client";

import { useEffect, useRef, useState } from "react";

type CountUpStatProps = {
  end: number;
  label: string;
  suffix?: string;
  duration?: number;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
  valueAs?: "h3" | "p";
};

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

export default function CountUpStat({
  end,
  label,
  suffix = "",
  duration = 1300,
  className,
  valueClassName,
  labelClassName,
  valueAs = "p",
}: CountUpStatProps) {
  const [value, setValue] = useState(0);
  const statRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const node = statRef.current;
    if (!node || hasAnimatedRef.current) return;

    const runAnimation = () => {
      if (hasAnimatedRef.current) return;

      hasAnimatedRef.current = true;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion || duration <= 0) {
        setValue(end);
        return;
      }

      const startedAt = window.performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const easedProgress = easeOutCubic(progress);

        setValue(Math.round(end * easedProgress));

        if (progress < 1) {
          frameRef.current = window.requestAnimationFrame(tick);
        }
      };

      frameRef.current = window.requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      runAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          runAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [duration, end]);

  const displayValue = `${value}${suffix}`;

  return (
    <div ref={statRef} className={className} aria-label={`${end}${suffix} ${label}`}>
      {valueAs === "h3" ? (
        <h3 className={valueClassName}>{displayValue}</h3>
      ) : (
        <p className={valueClassName}>{displayValue}</p>
      )}
      <p className={labelClassName}>{label}</p>
    </div>
  );
}
