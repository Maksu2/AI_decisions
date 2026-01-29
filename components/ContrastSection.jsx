"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./ContrastSection.module.css";

/**
 * ContrastSection — Dwa sposoby istnienia decyzji.
 * Narracja, nie lista.
 */

const humanExperience = [
    "Decyzja zapada powoli.",
    "Czujesz jej ciężar.",
    "Możesz zmienić zdanie.",
    "Błąd jest twój.",
    "Wiesz, kto odpowiada.",
];

const systemExperience = [
    "Decyzja zapada natychmiast.",
    "Nikt jej nie czuje.",
    "Zmiana wymaga nowego kodu.",
    "Błąd jest statystyką.",
    "Nikt nie odpowiada.",
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

    const isHumanPhase = progress < 0.45;
    const isSystemPhase = progress > 0.55;
    const isTransition = !isHumanPhase && !isSystemPhase;

    const humanProgress = Math.min(1, progress / 0.45);
    const systemProgress = Math.min(1, Math.max(0, (progress - 0.55) / 0.45));

    const visibleHumanLines = Math.floor(humanProgress * (humanExperience.length + 0.5));
    const visibleSystemLines = Math.floor(systemProgress * (systemExperience.length + 0.5));

    const humanHeaderOpacity = isHumanPhase ? 1 : isTransition ? 1 - (progress - 0.45) * 10 : 0;
    const systemHeaderOpacity = isSystemPhase ? 1 : isTransition ? (progress - 0.45) * 10 : 0;

    return (
        <section ref={containerRef} className={styles.container}>
            <div className={styles.sticky}>
                <div className={styles.content}>
                    {/* Człowiek */}
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
                            {humanExperience.map((line, index) => (
                                <p
                                    key={index}
                                    className={styles.line}
                                    style={{
                                        opacity: visibleHumanLines > index ? 1 : 0,
                                        transform: `translateY(${visibleHumanLines > index ? 0 : 12}px)`,
                                    }}
                                >
                                    {line}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* System */}
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
                            {systemExperience.map((line, index) => (
                                <p
                                    key={index}
                                    className={styles.line}
                                    style={{
                                        opacity: visibleSystemLines > index ? 1 : 0,
                                        transform: `translateY(${visibleSystemLines > index ? 0 : 12}px)`,
                                    }}
                                >
                                    {line}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
