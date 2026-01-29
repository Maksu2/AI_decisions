"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./ProConSection.module.css";

/**
 * Argumenty — zwięzłe i neutralne.
 */
const proArguments = [
    {
        id: "speed",
        title: "Szybkość",
        description: "Przetwarza dane w ułamku sekundy.",
    },
    {
        id: "consistency",
        title: "Konsekwencja",
        description: "Nie ma złych dni — decyzje są przewidywalne.",
    },
    {
        id: "scale",
        title: "Skala",
        description: "Może obsłużyć miliony przypadków naraz.",
    },
];

const conArguments = [
    {
        id: "context",
        title: "Brak kontekstu",
        description: "Nie rozumie niuansów, które widzi człowiek.",
    },
    {
        id: "accountability",
        title: "Odpowiedzialność",
        description: "Gdy się myli — kto ponosi konsekwencje?",
    },
    {
        id: "bias",
        title: "Uprzedzenia",
        description: "Uczy się z danych, także z błędów przeszłości.",
    },
];

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

    const totalCards = proArguments.length + conArguments.length;
    const visibleCards = Math.floor(progress * (totalCards + 2));
    const columnOffset = Math.sin(progress * Math.PI) * 16;
    const headerOpacity = Math.min(1, progress * 8);

    return (
        <section ref={containerRef} className={styles.container}>
            <div className={styles.sticky}>
                <header
                    className={styles.header}
                    style={{
                        opacity: headerOpacity,
                        transform: `translateY(${progress > 0.02 ? 0 : 24}px)`,
                    }}
                >
                    <h2 className={styles.title}>Dwie strony medalu</h2>
                    <p className={styles.subtitle}>Szanse i zagrożenia</p>
                </header>

                <div className={styles.grid}>
                    <div
                        className={styles.column}
                        style={{ transform: `translateY(${-columnOffset}px)` }}
                    >
                        <span
                            className={styles.columnLabel}
                            style={{ opacity: visibleCards >= 1 ? 1 : 0 }}
                        >
                            Za
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
                                            transform: `translateY(${isVisible ? 0 : 32}px)`,
                                        }}
                                    >
                                        <h3 className={styles.cardTitle}>{arg.title}</h3>
                                        <p className={styles.cardDesc}>{arg.description}</p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>

                    <div className={styles.separator}>
                        <div
                            className={styles.line}
                            style={{
                                height: `${Math.min(100, progress * 150)}%`,
                                opacity: progress > 0.1 ? 1 : 0,
                            }}
                        />
                    </div>

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
                                            transform: `translateY(${isVisible ? 0 : 32}px)`,
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
