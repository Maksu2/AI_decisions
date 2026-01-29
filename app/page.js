import HeroSection from "@/components/HeroSection";
import NarrativeSection from "@/components/NarrativeSection";
import TransitionSection from "@/components/TransitionSection";
import ContrastSection from "@/components/ContrastSection";
import ReflectionSection from "@/components/ReflectionSection";
import ClosingSection from "@/components/ClosingSection";

/**
 * Strona główna — esej wizualny o decyzjach AI.
 * 
 * Struktura narracyjna:
 * 1. Hero — pytanie główne
 * 2. Narracja — przykłady z konsekwencjami
 * 3. Kontrast — dwa sposoby istnienia decyzji
 * 4. Refleksja — sekwencja myśli
 * 5. Zakończenie — domknięcie bez odpowiedzi
 */
export default function Home() {
  return (
    <main>
      <HeroSection />

      <TransitionSection
        text="Zanim odpowiesz, przyjrzyj się bliżej."
        variant="dim"
      />

      <NarrativeSection />

      <TransitionSection
        text="Każda decyzja ma dwie strony."
        variant="default"
      />

      <ContrastSection />

      <TransitionSection
        text="Zostaje jedno pytanie."
        variant="accent"
      />

      <ReflectionSection />

      <ClosingSection />
    </main>
  );
}
