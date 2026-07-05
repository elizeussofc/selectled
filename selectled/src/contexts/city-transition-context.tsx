"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export type TransitionPhase = "idle" | "playing" | "revealing";

export const TRANSITION_FADE_MS = 700;
const VIDEO_DURATION_MS = 6000;
const REVEAL_LEAD_MS = 1000;
const REVEAL_AT_MS = VIDEO_DURATION_MS - REVEAL_LEAD_MS;

interface CityTransitionContextValue {
  phase: TransitionPhase;
  startTransition: (slug: string) => void;
}

const CityTransitionContext = createContext<CityTransitionContextValue | null>(null);

export function CityTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startTransition = useCallback(
    (slug: string) => {
      document.cookie = `preferred-city=${slug}; max-age=${60 * 60 * 24 * 30}; path=/`;

      if (revealTimer.current) clearTimeout(revealTimer.current);
      if (idleTimer.current) clearTimeout(idleTimer.current);

      setPhase("playing");
      router.push(`/${slug}`);

      revealTimer.current = setTimeout(() => {
        setPhase("revealing");
        idleTimer.current = setTimeout(() => setPhase("idle"), TRANSITION_FADE_MS);
      }, REVEAL_AT_MS);
    },
    [router]
  );

  return (
    <CityTransitionContext.Provider value={{ phase, startTransition }}>
      {children}

      {phase !== "idle" && (
        <div
          className="fixed inset-0 z-[999] bg-black"
          style={{
            opacity: phase === "revealing" ? 0 : 1,
            transition: phase === "revealing" ? `opacity ${TRANSITION_FADE_MS}ms ease` : undefined,
          }}
        >
          <video
            className="w-full h-full object-cover"
            src="/videos/page-transition.webm"
            autoPlay
            muted
            playsInline
          />
        </div>
      )}
    </CityTransitionContext.Provider>
  );
}

export function useCityTransition() {
  const ctx = useContext(CityTransitionContext);
  if (!ctx) throw new Error("useCityTransition must be used within CityTransitionProvider");
  return ctx;
}
