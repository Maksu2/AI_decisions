"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./NarrativeSection.module.css";

/**
 * Rozbudowana sekwencja narracyjna — przykłady decyzji AI.
 * Każdy przykład to osobny "moment" z wolnym tempem pojawiania się.
 */
const narrativeSequence = [
    // Sekcja 1: Wprowadzenie
    {
        id: "intro",
        type: "intro",
        label: null,
        title: "Każdego dnia algorytmy podejmują miliony decyzji.",
        description: null,
    },
    {
        id: "intro-2",
        type: "thought",
        label: null,
        title: "Większości z nich nawet nie zauważasz.",
        description: null,
    },

    // Sekcja 2: Przykłady konkretne
    {
        id: "medical",
        type: "example",
        label: "Medycyna",
        title: "AI analizuje prześwietlenie.",
        description: "W niektórych szpitalach algorytm wykrywa nowotwory szybciej niż radiolog.",
    },
    {
        id: "medical-reflection",
        type: "question",
        label: null,
        title: "Ale czy maszyna rozumie strach pacjenta?",
        description: null,
    },

    {
        id: "finance",
        type: "example",
        label: "Finanse",
        title: "Algorytm ocenia Twoją zdolność kredytową.",
        description: "Banki używają AI do przewidywania ryzyka.",
    },
    {
        id: "finance-reflection",
        type: "thought",
        label: null,
        title: "Model nie widzi Twojej historii — widzi statystyki.",
        description: null,
    },

    {
        id: "transport",
        type: "example",
        label: "Transport",
        title: "Samochód autonomiczny podejmuje decyzję w ułamku sekundy.",
        description: "W sytuacji zagrożenia AI musi wybrać.",
    },
    {
        id: "transport-reflection",
        type: "question",
        label: null,
        title: "Kto ponosi odpowiedzialność za jej wybór?",
        description: null,
    },

    {
        id: "justice",
        type: "example",
        label: "Wymiar sprawiedliwości",
        title: "System sugeruje wyrok.",
        description: "W USA algorytmy oceniają ryzyko recydywy.",
    },
    {
        id: "justice-reflection",
        type: "question",
        label: null,
        title: "Czy dane historyczne mogą być sprawiedliwe?",
        description: null,
    },

    {
        id: "work",
        type: "example",
        label: "Rekrutacja",
        title: "AI przegląda Twoje CV.",
        description: "Zanim człowiek zobaczy Twoje zgłoszenie, algorytm już podjął wstępną decyzję.",
    },

    // Sekcja 3: Podsumowanie
    {
        id: "summary",
        type: "conclusion",
        label: null,
        title: "To nie jest przyszłość.",
        description: null,
    },
    {
        id: "summary-2",
        type: "conclusion-accent",
        label: null,
        title: "To dzieje się teraz.",
        description: null,
    },
];

/**
 * NarrativeSection — Rozbudowana sticky sekcja narracyjna.
 * 
 * Mechanizm:
 * - Bardzo długi kontener (wiele 100vh) dla wolnego tempa
 * - Każdy "moment" ma swój czas na ekranie
 * - Płynne przejścia fade między momentami
 * - Różne typy: example, question, thought, conclusion
 */
export default function NarrativeSection() {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [itemProgress, setItemProgress] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const rect = container.getBoundingClientRect();
            const containerHeight = container.offsetHeight;
            const viewportHeight = window.innerHeight;

            // Pozycja w sekcji (0 do 1)
            const scrolled = -rect.top;
            const scrollableHeight = containerHeight - viewportHeight;
            const totalProgress = Math.min(1, Math.max(0, scrolled / scrollableHeight));

            // Który element jest aktywny
            const totalItems = narrativeSequence.length;
            const progressPerItem = 1 / totalItems;
            const currentIndex = Math.min(
                totalItems - 1,
                Math.floor(totalProgress / progressPerItem)
            );

            // Progress w ramach aktywnego elementu (0-1)
            const itemStart = currentIndex * progressPerItem;
            const progressWithinItem = (totalProgress - itemStart) / progressPerItem;

            setActiveIndex(currentIndex);
            setItemProgress(Math.min(1, Math.max(0, progressWithinItem)));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const currentItem = narrativeSequence[activeIndex];

    // Opacity bazowana na pozycji w ramach elementu:
    // fade in (0-0.2), full (0.2-0.8), fade out (0.8-1)
    let opacity = 1;
    if (itemProgress < 0.15) {
        opacity = itemProgress / 0.15;
    } else if (itemProgress > 0.85) {
        opacity = (1 - itemProgress) / 0.15;
    }

    // Subtelny scale dla dynamiki
    const scale = 0.98 + itemProgress * 0.04;

    return (
        <section ref={containerRef} className={styles.container}>
            <div className={styles.sticky}>
                <div className={styles.content}>
                    {/* Label sekcji */}
                    <p className={styles.sectionLabel}>Gdzie dziś decyduje AI?</p>

                    {/* Aktywny moment */}
                    <div
                        className={styles.narrative}
                        style={{
                            opacity,
                            transform: `scale(${scale})`,
                        }}
                    >
                        <article className={`${styles.item} ${styles[currentItem.type]}`}>
                            {currentItem.label && (
                                <span className={styles.category}>{currentItem.label}</span>
                            )}
                            <h2 className={styles.title}>{currentItem.title}</h2>
                            {currentItem.description && (
                                <p className={styles.description}>{currentItem.description}</p>
                            )}
                        </article>
                    </div>

                    {/* Wskaźnik postępu — linia */}
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{
                                width: `${((activeIndex + itemProgress) / narrativeSequence.length) * 100}%`
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
