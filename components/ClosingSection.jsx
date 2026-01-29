"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./ClosingSection.module.css";

/**
 * ClosingSection — Domknięcie narracji.
 * Nie podsumowanie, lecz pozostawienie z jedną myślą.
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

            const scrolled = viewportHeight - rect.top;
            const total = viewportHeight + rect.height;
            const rawProgress = scrolled / total;

            setProgress(Math.min(1, Math.max(0, rawProgress)));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const quoteProgress = Math.min(1, progress * 2.5);
    const footerProgress = Math.min(1, Math.max(0, (progress - 0.5) * 2));

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.content}>
                <p
                    className={styles.closing}
                    style={{
                        opacity: quoteProgress,
                        transform: `translateY(${(1 - quoteProgress) * 20}px)`,
                    }}
                >
                    Technologia to narzędzie.<br />
                    Pytanie brzmi, w czyich rękach.
                </p>

                <div
                    className={styles.footer}
                    style={{
                        opacity: footerProgress,
                        transform: `translateY(${(1 - footerProgress) * 10}px)`,
                    }}
                >
                    <p className={styles.credit}>Projekt szkolny • 2026</p>
                </div>
            </div>
        </section>
    );
}
