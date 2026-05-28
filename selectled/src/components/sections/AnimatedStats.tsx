"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}

const stats: Stat[] = [
  { value: 10, suffix: "+ anos", label: "de mercado" },
  { value: 5000, suffix: "+", prefix: "+", label: "eventos realizados" },
  { value: 500, suffix: "+", prefix: "+", label: "clientes ativos" },
  { value: 3, suffix: "", label: "sedes próprias" },
];

function AnimatedNumber({ value, suffix, prefix }: { value: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString("pt-BR")}{suffix}
    </span>
  );
}

export function AnimatedStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="text-center p-6 bg-[#141414] border border-[#2C2C2E] rounded-2xl"
        >
          <div
            className="text-4xl lg:text-5xl font-bold text-white mb-2"
            style={{ fontFamily: "var(--font-space)" }}
          >
            <AnimatedNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
          </div>
          <p className="text-sm text-[#6E6E73]">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
