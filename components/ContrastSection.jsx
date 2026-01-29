"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./ContrastSection.module.css";

/**
 * ContrastSection — Dwa sposoby istnienia decyzji.
 * Spokojny monolog, nie lista.
 */

const humanExperience = [
    { text: "Decyzja zapada powoli.", emphasis: "lead" },
    { text: "Czujesz jej ciężar.", emphasis: "normal" },
    { text: "Możesz zmienić zdanie.", emphasis: "soft" },
    { text: "Błąd jest twój.", emphasis: "normal" },
    { text: "Wiesz, kto odpowiada.", emphasis: "final" },
];

const systemExperience = [
    { text: "Decyzja zapada natychmiast.", emphasis: "lead" },
    { text: "Nikt jej nie czuje.", emphasis: "normal" },
    { text: "Zmiana wymaga nowego kodu.", emphasis: "soft" },
    { text: "Błąd jest statystyką.", emphasis: "normal" },
    { text: "Nikt nie odpowiada.", emphasis: "final" },
];

export default function ContrastSection() {
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

    const isHumanPhase = progress < 0.42;
    const isSystemPhase = progress > 0.58;
    const isTransition = !isHumanPhase && !isSystemPhase;

    // Wolniejszy reveal — każda linia ma swój moment
    const humanProgress = Math.min(1, progress / 0.42);
    const systemProgress = Math.min(1, Math.max(0, (progress - 0.58) / 0.42));

    // Opóźnione wejście dla każdej linii
    const getLineVisibility = (index, phaseProgress) => {
        const lineDelay = index * 0.18;
        const lineProgress = Math.min(1, Math.max(0, (phaseProgress - lineDelay) / 0.2));
        return lineProgress;
    };

    const humanHeaderOpacity = isHumanPhase ? Math.min(1, humanProgress * 5) : isTransition ? 1 - (progress - 0.42) * 6 : 0;
    const systemHeaderOpacity = isSystemPhase ? Math.min(1, systemProgress * 5) : isTransition ? (progress - 0.42) * 6 : 0;

    return (
        <section ref={containerRef} className={styles.container}>
            <div className={styles.sticky}>
                <div className={styles.content}>
                    {/* Człowiek — cieplejsza, bardziej obecna */}
                    <div
                        className={`${styles.perspective} ${styles.human}`}
                        style={{ opacity: isHumanPhase || isTransition ? 1 : 0 }}
                    >
                        <h2
                            className={styles.header}
                            style={{ opacity: humanHeaderOpacity }}
                        >
                            Gdy decyduje człowiek
                        </h2>
                        <div className={styles.lines}>
                            {humanExperience.map((line, index) => {
                                const visibility = getLineVisibility(index, humanProgress);
                                return (
                                    <p
                                        key={index}
                                        className={`${styles.line} ${styles[line.emphasis]}`}
                                        style={{
                                            opacity: visibility,
                                            transform: `translateY(${(1 - visibility) * 8}px)`,
                                        }}
                                    >
                                        {line.text}
                                    </p>
                                );
                            })}
                        </div>
                    </div>

                    {/* System — chłodniejsza, bardziej zdystansowana */}
                    <div
                        className={`${styles.perspective} ${styles.system}`}
                        style={{ opacity: isSystemPhase || isTransition ? 1 : 0 }}
                    >
                        <h2
                            className={styles.header}
                            style={{ opacity: systemHeaderOpacity }}
                        >
                            Gdy decyduje system
                        </h2>
                        <div className={styles.lines}>
                            {systemExperience.map((line, index) => {
                                const visibility = getLineVisibility(index, systemProgress);
                                return (
                                    <p
                                        key={index}
                                        className={`${styles.line} ${styles[line.emphasis]} ${styles.systemLine}`}
                                        style={{
                                            opacity: visibility * 0.85, // Niższy kontrast dla systemu
                                            transform: `translateY(${(1 - visibility) * 8}px)`,
                                        }}
                                    >
                                        {line.text}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
