"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./NarrativeSection.module.css";

/**
 * Sekwencja narracyjna — fakty i konsekwencje.
 * Precyzyjna, rzeczowa, bez abstrakcji.
 */
const narrativeSequence = [
    {
        id: "intro",
        type: "intro",
        weight: 1.8,
        title: "Każdego dnia algorytmy podejmują miliony decyzji.",
    },
    {
        id: "intro-2",
        type: "thought",
        weight: 1.5,
        title: "Większości nie zauważasz.",
    },

    // Medycyna
    {
        id: "medical",
        type: "example",
        weight: 1.0,
        label: "Medycyna",
        title: "Algorytm analizuje prześwietlenie.",
    },
    {
        id: "medical-consequence",
        type: "consequence",
        weight: 1.5,
        title: "Znajduje nowotwór szybciej niż lekarz. Nie umie powiedzieć, że będzie dobrze.",
    },

    // Finanse
    {
        id: "finance",
        type: "example",
        weight: 0.9,
        label: "Finanse",
        title: "System ocenia zdolność kredytową.",
    },
    {
        id: "finance-consequence",
        type: "consequence",
        weight: 1.4,
        title: "Widzi historię spłat. Nie widzi, że właśnie dostałeś pracę.",
    },

    // Transport
    {
        id: "transport",
        type: "example",
        weight: 1.0,
        label: "Transport",
        title: "Autonomiczny samochód decyduje w ułamku sekundy.",
    },
    {
        id: "transport-consequence",
        type: "consequence",
        weight: 1.6,
        title: "Wybiera, kogo chronić. Zasady ustala programista.",
    },

    // Sprawiedliwość
    {
        id: "justice",
        type: "example",
        weight: 1.0,
        label: "Sprawiedliwość",
        title: "Algorytm sugeruje wyrok.",
    },
    {
        id: "justice-consequence",
        type: "consequence",
        weight: 1.5,
        title: "Uczy się z przeszłości. Przeszłość nie była sprawiedliwa.",
    },

    // Rekrutacja
    {
        id: "work",
        type: "example",
        weight: 1.0,
        label: "Rekrutacja",
        title: "AI przegląda CV.",
    },
    {
        id: "work-consequence",
        type: "consequence",
        weight: 1.4,
        title: "Człowiek zobaczy tylko tych, których algorytm przepuścił.",
    },

    // Kulminacja
    {
        id: "summary",
        type: "conclusion",
        weight: 2.2,
        title: "To nie przyszłość.",
    },
    {
        id: "summary-2",
        type: "conclusion-accent",
        weight: 2.8,
        title: "To teraz.",
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

    let opacity = 1;
    if (itemProgress < 0.1) {
        opacity = itemProgress / 0.1;
    } else if (itemProgress > 0.9) {
        opacity = (1 - itemProgress) / 0.1;
    }

    let totalProgressForBar = 0;
    for (let i = 0; i < activeIndex; i++) {
        totalProgressForBar += narrativeSequence[i].weight / totalWeight;
    }
    totalProgressForBar += (narrativeSequence[activeIndex].weight / totalWeight) * itemProgress;

    return (
        <section ref={containerRef} className={styles.container}>
            <div className={styles.sticky}>
                <div className={styles.content}>
                    <div
                        className={styles.narrative}
                        style={{ opacity }}
                    >
                        <article className={`${styles.item} ${styles[currentItem.type] || ""}`}>
                            {currentItem.label && (
                                <span className={styles.category}>{currentItem.label}</span>
                            )}
                            <h2 className={styles.title}>{currentItem.title}</h2>
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
