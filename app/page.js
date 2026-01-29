"use client";

import { useMotion } from "@/contexts/MotionContext";

// Animated components
import HeroSection from "@/components/HeroSection";
import NarrativeSection from "@/components/NarrativeSection";
import TransitionSection from "@/components/TransitionSection";
import ProConSection from "@/components/ProConSection";
import ReflectionSection from "@/components/ReflectionSection";
import ClosingSection from "@/components/ClosingSection";

// Static components (reduced motion)
import HeroSectionStatic from "@/components/static/HeroSectionStatic";
import NarrativeSectionStatic from "@/components/static/NarrativeSectionStatic";
import TransitionSectionStatic from "@/components/static/TransitionSectionStatic";
import ProConSectionStatic from "@/components/static/ProConSectionStatic";
import ReflectionSectionStatic from "@/components/static/ReflectionSectionStatic";
import ClosingSectionStatic from "@/components/static/ClosingSectionStatic";

/**
 * Główna strona — warunkowe renderowanie.
 * 
 * Reduced Motion = statyczna wersja strony:
 * - Brak sticky scroll storytelling
 * - Brak scroll-driven transforms
 * - Normalny przepływ dokumentu
 * - Ta sama treść, inne doświadczenie
 */
export default function Home() {
  const { reducedMotion } = useMotion();

  // Tryb Reduced Motion — statyczna, spokojna strona
  if (reducedMotion) {
    return (
      <main>
        <HeroSectionStatic />

        <TransitionSectionStatic
          text="Zanim odpowiesz, przyjrzyj się bliżej."
          variant="dim"
        />

        <NarrativeSectionStatic />

        <TransitionSectionStatic
          text="Każda odpowiedź rodzi nowe pytania."
          variant="default"
        />

        <ProConSectionStatic />

        <TransitionSectionStatic
          text="A co Ty o tym myślisz?"
          variant="accent"
        />

        <ReflectionSectionStatic />

        <TransitionSectionStatic
          text="Nie ma prostych odpowiedzi na złożone pytania."
          variant="dim"
        />

        <ClosingSectionStatic />
      </main>
    );
  }

  // Tryb z animacjami — scroll storytelling
  return (
    <main>
      <HeroSection />

      <TransitionSection
        text="Zanim odpowiesz, przyjrzyj się bliżej."
        variant="dim"
      />

      <NarrativeSection />

      <TransitionSection
        text="Każda odpowiedź rodzi nowe pytania."
        variant="default"
      />

      <ProConSection />

      <TransitionSection
        text="A co Ty o tym myślisz?"
        variant="accent"
      />

      <ReflectionSection />

      <TransitionSection
        text="Nie ma prostych odpowiedzi na złożone pytania."
        variant="dim"
      />

      <ClosingSection />
    </main>
  );
}
