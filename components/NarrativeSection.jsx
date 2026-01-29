"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./NarrativeSection.module.css";

/**
 * Rozbudowana sekwencja narracyjna — przykłady decyzji AI.
 * 
 * Każdy element ma przypisaną "wagę" wpływającą na to,
 * ile czasu scrollowania zajmuje. Dzięki temu pytania 
 * i refleksje trwają dłużej, a przykłady przechodzą szybciej.
 */
const narrativeSequence = [
    // Sekcja 1: Wprowadzenie — wolne tempo
    {
        id: "intro",
        type: "intro",
        weight: 1.5, // Dłuższe
        label: null,
        title: "Każdego dnia algorytmy podejmują miliony decyzji.",
        description: null,
    },
    {
        id: "intro-2",
        type: "thought",
        weight: 1.3,
        label: null,
        title: "Większości z nich nawet nie zauważasz.",
        description: null,
    },

    // Sekcja 2: Przykłady — zróżnicowane tempo
    {
        id: "medical",
        type: "example",
        weight: 1.0, // Standardowe
        label: "Medycyna",
        title: "AI analizuje prześwietlenie.",
        description: "W niektórych szpitalach algorytm wykrywa nowotwory szybciej niż radiolog.",
    },
    {
        id: "medical-reflection",
        type: "question",
        weight: 1.4, // Dłuższe — pytanie wymaga zastanowienia
        label: null,
        title: "Ale czy maszyna rozumie strach pacjenta?",
        description: null,
    },

    {
        id: "finance",
        type: "example",
        weight: 0.9, // Nieco szybsze
        label: "Finanse",
        title: "Algorytm ocenia Twoją zdolność kredytową.",
        description: "Banki używają AI do przewidywania ryzyka.",
    },
    {
        id: "finance-reflection",
        type: "thought",
        weight: 1.2,
        label: null,
        title: "Model nie widzi Twojej historii — widzi statystyki.",
        description: null,
    },

    {
        id: "transport",
        type: "example",
        weight: 1.0,
        label: "Transport",
        title: "Samochód autonomiczny podejmuje decyzję w ułamku sekundy.",
        description: "W sytuacji zagrożenia AI musi wybrać.",
    },
    {
        id: "transport-reflection",
        type: "question",
        weight: 1.5, // Ważne pytanie — więcej czasu
        label: null,
        title: "Kto ponosi odpowiedzialność za jej wybór?",
        description: null,
    },

    {
        id: "justice",
        type: "example",
        weight: 1.0,
        label: "Wymiar sprawiedliwości",
        title: "System sugeruje wyrok.",
        description: "W USA algorytmy oceniają ryzyko recydywy.",
    },
    {
        id: "justice-reflection",
        type: "question",
        weight: 1.4,
        label: null,
        title: "Czy dane historyczne mogą być sprawiedliwe?",
        description: null,
    },

    {
        id: "work",
        type: "example",
        weight: 1.1,
        label: "Rekrutacja",
        title: "AI przegląda Twoje CV.",
        description: "Zanim człowiek zobaczy Twoje zgłoszenie, algorytm już podjął wstępną decyzję.",
    },

    // Sekcja 3: Podsumowanie — bardzo wolne tempo dla wybrzmienia
    {
        id: "summary",
        type: "conclusion",
        weight: 1.6,
        label: null,
        title: "To nie jest przyszłość.",
        description: null,
    },
    {
        id: "summary-2",
        type: "conclusion-accent",
        weight: 2.0, // Najdłuższe — kulminacja
        label: null,
        title: "To dzieje się teraz.",
        description: null,
    },
];

// Oblicz całkowitą wagę dla normalizacji
const totalWeight = narrativeSequence.reduce((sum, item) => sum + item.weight, 0);

/**
 * NarrativeSection — Sticky sekcja narracyjna z ważonym rytmem.
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

            const scrolled = -rect.top;
            const scrollableHeight = containerHeight - viewportHeight;
            const totalProgress = Math.min(1, Math.max(0, scrolled / scrollableHeight));

            // Znajdź aktywny element na podstawie wag
            let accumulatedWeight = 0;
            let currentIndex = 0;
            let progressWithinItem = 0;

            for (let i = 0; i < narrativeSequence.length; i++) {
                const itemWeightNormalized = narrativeSequence[i].weight / totalWeight;

                if (totalProgress < accumulatedWeight + itemWeightNormalized) {
                    currentIndex = i;
                    progressWithinItem = (totalProgress - accumulatedWeight) / itemWeightNormalized;
                    break;
                }

                accumulatedWeight += itemWeightNormalized;
                currentIndex = i;
                progressWithinItem = 1;
            }

            setActiveIndex(currentIndex);
            setItemProgress(Math.min(1, Math.max(0, progressWithinItem)));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const currentItem = narrativeSequence[activeIndex];

    // Opacity: fade in/out na krawędziach
    let opacity = 1;
    if (itemProgress < 0.12) {
        opacity = itemProgress / 0.12;
    } else if (itemProgress > 0.88) {
        opacity = (1 - itemProgress) / 0.12;
    }

    // Subtelny scale
    const scale = 0.97 + itemProgress * 0.06;

    // Oblicz całkowity postęp dla paska
    let totalProgressForBar = 0;
    for (let i = 0; i < activeIndex; i++) {
        totalProgressForBar += narrativeSequence[i].weight / totalWeight;
    }
    totalProgressForBar += (narrativeSequence[activeIndex].weight / totalWeight) * itemProgress;

    return (
        <section ref={containerRef} className={styles.container}>
            <div className={styles.sticky}>
                <div className={styles.content}>
                    <p className={styles.sectionLabel}>Gdzie dziś decyduje AI?</p>

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

                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{ width: `${totalProgressForBar * 100}%` }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
