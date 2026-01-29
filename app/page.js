import HeroSection from "@/components/HeroSection";
import NarrativeSection from "@/components/NarrativeSection";
import TransitionSection from "@/components/TransitionSection";
import ProConSection from "@/components/ProConSection";
import ReflectionSection from "@/components/ReflectionSection";
import ClosingSection from "@/components/ClosingSection";

/**
 * Główna strona — scroll storytelling.
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
        text="Nie ma prostych odpowiedzi."
        variant="dim"
      />

      <ClosingSection />
    </main>
  );
}
