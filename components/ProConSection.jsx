"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./ProConSection.module.css";

/**
 * Argumenty za i przeciw — teraz z dynamicznym scroll reveal.
 */
const proArguments = [
    {
        id: "speed",
        title: "Szybkość",
        description: "AI przetwarza dane w ułamku sekundy, gdy liczy się każda chwila.",
    },
    {
        id: "consistency",
        title: "Konsekwencja",
        description: "Algorytm nie ma złych dni — jego decyzje są przewidywalne.",
    },
    {
        id: "scale",
        title: "Skala",
        description: "Jeden system może obsłużyć miliony przypadków jednocześnie.",
    },
];

const conArguments = [
    {
        id: "context",
        title: "Brak kontekstu",
        description: "AI nie rozumie niuansów życia, które człowiek widzi intuicyjnie.",
    },
    {
        id: "accountability",
        title: "Odpowiedzialność",
        description: "Gdy algorytm się myli, kto ponosi konsekwencje?",
    },
    {
        id: "bias",
        title: "Uprzedzenia",
        description: "AI uczy się z danych — także z błędów i stereotypów przeszłości.",
    },
];

/**
 * ProConSection — Scroll-driven reveal argumentów.
 * 
 * Mechanizm:
 * - Sticky header z tytułem
 * - Karty pojawiają się jedna po drugiej podczas scrollowania
 * - Kolumny przesuwają się względem siebie dla efektu dialogu
 */
export default function ProConSection() {
    const containerRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const rect = container.getBoundingClientRect();
            const containerHeight = container.offsetHeight;
            const viewportHeight = window.innerHeight;

            const scrolled = -rect.top;
            const scrollableHeight = containerHeight - viewportHeight;
            const rawProgress = scrolled / scrollableHeight;

            setProgress(Math.min(1, Math.max(0, rawProgress)));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Ile kart jest widocznych (0-6)
    const totalCards = proArguments.length + conArguments.length;
    const visibleCards = Math.floor(progress * (totalCards + 2)); // +2 dla nagłówka

    // Przesunięcie kolumn względem siebie
    const columnOffset = Math.sin(progress * Math.PI) * 20;

    // Czy nagłówek jest widoczny
    const headerVisible = progress > 0.02;
    const headerOpacity = Math.min(1, progress * 10);

    return (
        <section ref={containerRef} className={styles.container}>
            <div className={styles.sticky}>
                {/* Nagłówek */}
                <header
                    className={styles.header}
                    style={{
                        opacity: headerOpacity,
                        transform: `translateY(${headerVisible ? 0 : 30}px)`,
                    }}
                >
                    <h2 className={styles.title}>Dwie strony medalu</h2>
                    <p className={styles.subtitle}>
                        Każda technologia niesie ze sobą szanse i zagrożenia
                    </p>
                </header>

                {/* Grid z kolumnami */}
                <div className={styles.grid}>
                    {/* Kolumna PRO */}
                    <div
                        className={styles.column}
                        style={{ transform: `translateY(${-columnOffset}px)` }}
                    >
                        <span
                            className={styles.columnLabel}
                            style={{ opacity: visibleCards >= 1 ? 1 : 0 }}
                        >
                            Za przekazaniem decyzji AI
                        </span>
                        <div className={styles.cards}>
                            {proArguments.map((arg, index) => {
                                const cardIndex = index + 1;
                                const isVisible = visibleCards >= cardIndex + 1;
                                const cardProgress = Math.min(1, Math.max(0,
                                    (progress * (totalCards + 2) - cardIndex) / 1.5
                                ));

                                return (
                                    <article
                                        key={arg.id}
                                        className={styles.card}
                                        style={{
                                            opacity: isVisible ? cardProgress : 0,
                                            transform: `translateY(${isVisible ? 0 : 40}px) scale(${0.95 + cardProgress * 0.05})`,
                                        }}
                                    >
                                        <h3 className={styles.cardTitle}>{arg.title}</h3>
                                        <p className={styles.cardDesc}>{arg.description}</p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>

                    {/* Separator */}
                    <div className={styles.separator}>
                        <div
                            className={styles.line}
                            style={{
                                height: `${Math.min(100, progress * 150)}%`,
                                opacity: progress > 0.1 ? 1 : 0,
                            }}
                        />
                    </div>

                    {/* Kolumna CON */}
                    <div
                        className={styles.column}
                        style={{ transform: `translateY(${columnOffset}px)` }}
                    >
                        <span
                            className={`${styles.columnLabel} ${styles.labelCon}`}
                            style={{ opacity: visibleCards >= 1 ? 1 : 0 }}
                        >
                            Przeciw
                        </span>
                        <div className={styles.cards}>
                            {conArguments.map((arg, index) => {
                                const cardIndex = proArguments.length + index + 1;
                                const isVisible = visibleCards >= cardIndex + 1;
                                const cardProgress = Math.min(1, Math.max(0,
                                    (progress * (totalCards + 2) - cardIndex) / 1.5
                                ));

                                return (
                                    <article
                                        key={arg.id}
                                        className={`${styles.card} ${styles.cardCon}`}
                                        style={{
                                            opacity: isVisible ? cardProgress : 0,
                                            transform: `translateY(${isVisible ? 0 : 40}px) scale(${0.95 + cardProgress * 0.05})`,
                                        }}
                                    >
                                        <h3 className={styles.cardTitle}>{arg.title}</h3>
                                        <p className={styles.cardDesc}>{arg.description}</p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
