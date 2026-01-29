"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./ClosingSection.module.css";

/**
 * ClosingSection — Podsumowanie narracji z efektami scroll-driven.
 * 
 * Elementy pojawiają się sekwencyjnie podczas scrollowania,
 * dając cytatowi i wnioskowi więcej przestrzeni do "wybrzmienia".
 */
export default function ClosingSection() {
    const sectionRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const handleScroll = () => {
            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Progress bazowany na pozycji sekcji w viewport
            const scrolled = viewportHeight - rect.top;
            const total = viewportHeight + rect.height;
            const rawProgress = scrolled / total;

            setProgress(Math.min(1, Math.max(0, rawProgress)));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Animacje bazowane na progress:
    // Quote pojawia się pierwsze (0-0.4)
    // Conclusion pojawia się drugie (0.3-0.7)
    // Footer pojawia się ostatni (0.6-1)

    const quoteProgress = Math.min(1, progress * 2.5);
    const conclusionProgress = Math.min(1, Math.max(0, (progress - 0.3) * 2.5));
    const footerProgress = Math.min(1, Math.max(0, (progress - 0.6) * 2.5));

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.content}>
                {/* Cytat */}
                <blockquote
                    className={styles.quote}
                    style={{
                        opacity: quoteProgress,
                        transform: `translateY(${(1 - quoteProgress) * 40}px)`,
                    }}
                >
                    <span className={styles.quoteMark}>"</span>
                    Technologia to narzędzie.<br />
                    Mądrość to wiedzieć, kiedy z niego skorzystać.
                </blockquote>

                {/* Wniosek */}
                <p
                    className={styles.conclusion}
                    style={{
                        opacity: conclusionProgress,
                        transform: `translateY(${(1 - conclusionProgress) * 30}px)`,
                    }}
                >
                    Sztuczna inteligencja nie jest ani zbawcą, ani zagrożeniem.
                    Jest lustrem, w którym odbijają się nasze wartości, uprzedzenia i nadzieje.
                    Pytanie nie brzmi, czy AI powinna decydować — ale jak chcemy żyć
                    w świecie, który sami tworzymy.
                </p>

                {/* Footer */}
                <div
                    className={styles.footer}
                    style={{
                        opacity: footerProgress,
                        transform: `translateY(${(1 - footerProgress) * 20}px)`,
                    }}
                >
                    <p className={styles.credit}>
                        Projekt szkolny • 2026
                    </p>
                </div>
            </div>
        </section>
    );
}
