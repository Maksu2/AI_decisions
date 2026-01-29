"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./NarrativeSection.module.css";

/**
 * Sekwencja narracyjna — zróżnicowane tempo scrollowania.
 * Pytania i refleksje dłużej na ekranie, przykłady szybciej.
 */
const narrativeSequence = [
    // Wprowadzenie
    {
        id: "intro",
        type: "intro",
        weight: 1.6,
        title: "Każdego dnia algorytmy podejmują miliony decyzji.",
    },
    {
        id: "intro-2",
        type: "thought",
        weight: 1.4,
        title: "Większości z nich nie zauważasz.",
    },

    // Przykłady
    {
        id: "medical",
        type: "example",
        weight: 1.0,
        label: "Medycyna",
        title: "AI analizuje prześwietlenie.",
        description: "Algorytm wykrywa nowotwory szybciej niż radiolog.",
    },
    {
        id: "medical-reflection",
        type: "question",
        weight: 1.5,
        title: "Czy maszyna rozumie strach pacjenta?",
    },

    {
        id: "finance",
        type: "example",
        weight: 0.9,
        label: "Finanse",
        title: "Algorytm ocenia Twoją zdolność kredytową.",
        description: "Banki przewidują ryzyko na podstawie danych.",
    },
    {
        id: "finance-reflection",
        type: "thought",
        weight: 1.3,
        title: "Model widzi statystyki — nie historię.",
    },

    {
        id: "transport",
        type: "example",
        weight: 1.0,
        label: "Transport",
        title: "Autonomiczny samochód decyduje w ułamku sekundy.",
        description: "W sytuacji zagrożenia musi wybrać.",
    },
    {
        id: "transport-reflection",
        type: "question",
        weight: 1.6,
        title: "Kto odpowiada za decyzję maszyny?",
    },

    {
        id: "justice",
        type: "example",
        weight: 1.0,
        label: "Sprawiedliwość",
        title: "System sugeruje wyrok.",
        description: "Algorytmy oceniają ryzyko recydywy.",
    },
    {
        id: "justice-reflection",
        type: "question",
        weight: 1.5,
        title: "Czy przeszłość może być sprawiedliwa?",
    },

    {
        id: "work",
        type: "example",
        weight: 1.0,
        label: "Rekrutacja",
        title: "AI przegląda Twoje CV.",
        description: "Algorytm decyduje, zanim człowiek je zobaczy.",
    },

    // Kulminacja
    {
        id: "summary",
        type: "conclusion",
        weight: 1.8,
        title: "To nie przyszłość.",
    },
    {
        id: "summary-2",
        type: "conclusion-accent",
        weight: 2.2,
        title: "To teraźniejszość.",
    },
];

const totalWeight = narrativeSequence.reduce((sum, item) => sum + item.weight, 0);

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

    // Fade in/out
    let opacity = 1;
    if (itemProgress < 0.1) {
        opacity = itemProgress / 0.1;
    } else if (itemProgress > 0.9) {
        opacity = (1 - itemProgress) / 0.1;
    }

    // Subtelny scale
    const scale = 0.98 + itemProgress * 0.04;

    // Progress bar
    let totalProgressForBar = 0;
    for (let i = 0; i < activeIndex; i++) {
        totalProgressForBar += narrativeSequence[i].weight / totalWeight;
    }
    totalProgressForBar += (narrativeSequence[activeIndex].weight / totalWeight) * itemProgress;

    return (
        <section ref={containerRef} className={styles.container}>
            <div className={styles.sticky}>
                <div className={styles.content}>
                    <p className={styles.sectionLabel}>Gdzie decyduje AI?</p>

                    <div
                        className={styles.narrative}
                        style={{
                            opacity,
                            transform: `scale(${scale})`,
                        }}
                    >
                        <article className={`${styles.item} ${styles[currentItem.type] || ""}`}>
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
