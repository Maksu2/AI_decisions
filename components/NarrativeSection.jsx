"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./NarrativeSection.module.css";

/**
 * Sekwencja narracyjna — fakty i ich konsekwencje.
 * 
 * Każda scena prowadzi do jednozdaniowego zderzenia faktu z konsekwencją.
 * Mniej pytań, więcej napięć.
 */
const narrativeSequence = [
    // Wprowadzenie
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
        title: "Większości z nich nie zauważasz.",
    },

    // Medycyna — fakt + konsekwencja
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
        weight: 1.4,
        title: "Wykrywa nowotwór szybciej niż lekarz — ale nie powie pacjentowi, że będzie dobrze.",
    },

    // Finanse
    {
        id: "finance",
        type: "example",
        weight: 0.9,
        label: "Finanse",
        title: "System ocenia Twoją zdolność kredytową.",
    },
    {
        id: "finance-consequence",
        type: "consequence",
        weight: 1.3,
        title: "Widzi historię spłat, nie widzi, że właśnie znalazłeś pracę.",
    },

    // Transport
    {
        id: "transport",
        type: "example",
        weight: 1.0,
        label: "Transport",
        title: "Autonomiczny samochód podejmuje decyzję w ułamku sekundy.",
    },
    {
        id: "transport-consequence",
        type: "consequence",
        weight: 1.5,
        title: "Wybiera, kogo chronić. Nikt nie wie, według jakich zasad.",
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
        weight: 1.4,
        title: "Uczy się z przeszłości — także z jej niesprawiedliwości.",
    },

    // Rekrutacja
    {
        id: "work",
        type: "example",
        weight: 1.0,
        label: "Rekrutacja",
        title: "AI przegląda Twoje CV.",
    },
    {
        id: "work-consequence",
        type: "consequence",
        weight: 1.3,
        title: "Zanim człowiek je zobaczy, algorytm już zdecydował.",
    },

    // Kulminacja
    {
        id: "summary",
        type: "conclusion",
        weight: 2.0,
        title: "To nie jest przyszłość.",
    },
    {
        id: "summary-2",
        type: "conclusion-accent",
        weight: 2.5,
        title: "To jest teraz.",
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

    // Fade
    let opacity = 1;
    if (itemProgress < 0.1) {
        opacity = itemProgress / 0.1;
    } else if (itemProgress > 0.9) {
        opacity = (1 - itemProgress) / 0.1;
    }

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
