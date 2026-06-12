"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.intersectionRatio >= 0.25);
      },
      {
        threshold: [0, 0.25],
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);


  return (
    <div
      ref={ref}
      className={`
        transition-all duration-750 ease-in-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
    >
      {children}
    </div>
  );
}