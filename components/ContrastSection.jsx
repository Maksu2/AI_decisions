"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./ContrastSection.module.css";

/**
 * ContrastSection — Zderzenie dwóch sposobów istnienia decyzji.
 * 
 * Nie porównanie zalet i wad, lecz pokazanie różnicy w odczuciu,
 * odpowiedzialności i konsekwencjach.
 */

const humanPerspective = [
    "Decyzja zapada powoli.",
    "Czujesz jej ciężar.",
    "Możesz zmienić zdanie.",
    "Błąd jest Twoim błędem.",
    "Odpowiedzialność ma twarz.",
];

const systemPerspective = [
    "Decyzja zapada natychmiast.",
    "Nikt jej nie czuje.",
    "Zmiana wymaga korekty kodu.",
    "Błąd jest statystyką.",
    "Odpowiedzialność jest rozproszona.",
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

    // Fazy: 0-0.45 = human, 0.45-0.55 = transition, 0.55-1 = system
    const isHumanPhase = progress < 0.45;
    const isSystemPhase = progress > 0.55;
    const isTransition = !isHumanPhase && !isSystemPhase;

    // Oblicz widoczność poszczególnych linii
    const humanLineCount = humanPerspective.length;
    const systemLineCount = systemPerspective.length;

    const humanProgress = Math.min(1, progress / 0.45);
    const systemProgress = Math.min(1, Math.max(0, (progress - 0.55) / 0.45));

    const visibleHumanLines = Math.floor(humanProgress * (humanLineCount + 1));
    const visibleSystemLines = Math.floor(systemProgress * (systemLineCount + 1));

    // Opacity dla nagłówków
    const humanHeaderOpacity = isHumanPhase ? 1 : isTransition ? 1 - (progress - 0.45) * 10 : 0;
    const systemHeaderOpacity = isSystemPhase ? 1 : isTransition ? (progress - 0.45) * 10 : 0;

    return (
        <section ref={containerRef} className={styles.container}>
            <div className={styles.sticky}>
                <div className={styles.content}>
                    {/* Perspektywa ludzka */}
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
                            {humanPerspective.map((line, index) => (
                                <p
                                    key={index}
                                    className={styles.line}
                                    style={{
                                        opacity: visibleHumanLines > index ? 1 : 0,
                                        transform: `translateY(${visibleHumanLines > index ? 0 : 16}px)`,
                                    }}
                                >
                                    {line}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Perspektywa systemowa */}
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
                            {systemPerspective.map((line, index) => (
                                <p
                                    key={index}
                                    className={styles.line}
                                    style={{
                                        opacity: visibleSystemLines > index ? 1 : 0,
                                        transform: `translateY(${visibleSystemLines > index ? 0 : 16}px)`,
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
