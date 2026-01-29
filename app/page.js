import HeroSection from "@/components/HeroSection";
import NarrativeSection from "@/components/NarrativeSection";
import TransitionSection from "@/components/TransitionSection";
import ProConSection from "@/components/ProConSection";
import ReflectionSection from "@/components/ReflectionSection";
import ClosingSection from "@/components/ClosingSection";

/**
 * Główna strona — rozbudowana kompozycja z sekcjami przejściowymi.
 * 
 * Struktura narracji (z "oddychającymi" momentami):
 * 
 * 1. Hero — pytanie otwierające, efekt parallax
 * 2. Transition — wprowadzenie do tematu
 * 3. Narrative — rozbudowana sekcja z przykładami AI (13 momentów)
 * 4. Transition — moment refleksji przed argumentami
 * 5. ProCon — scroll-driven reveal argumentów
 * 6. Transition — przejście do kulminacji
 * 7. Reflection — interaktywna refleksja użytkownika
 * 8. Transition — przejście do zakończenia
 * 9. Closing — podsumowanie z efektami scroll-driven
 */
export default function Home() {
  return (
    <main>
      {/* Sekcja otwierająca */}
      <HeroSection />

      {/* Oddychający moment — wprowadzenie */}
      <TransitionSection
        text="Zanim odpowiesz, przyjrzyj się bliżej."
        variant="dim"
      />

      {/* Rozbudowana narracja z przykładami */}
      <NarrativeSection />

      {/* Moment ciszy przed argumentami */}
      <TransitionSection
        text="Każda odpowiedź rodzi nowe pytania."
        variant="default"
      />

      {/* Argumenty za i przeciw */}
      <ProConSection />

      {/* Przejście do refleksji */}
      <TransitionSection
        text="A co Ty o tym myślisz?"
        variant="accent"
      />

      {/* Interaktywna refleksja */}
      <ReflectionSection />

      {/* Przejście do zakończenia */}
      <TransitionSection
        text="Nie ma prostych odpowiedzi na złożone pytania."
        variant="dim"
      />

      {/* Podsumowanie */}
      <ClosingSection />
    </main>
  );
}
