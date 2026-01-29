"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./ClosingSection.module.css";

/**
 * ClosingSection — Spokojne podsumowanie narracji.
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

    const quoteProgress = Math.min(1, progress * 2.2);
    const conclusionProgress = Math.min(1, Math.max(0, (progress - 0.3) * 2.5));
    const footerProgress = Math.min(1, Math.max(0, (progress - 0.6) * 2.5));

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.content}>
                <blockquote
                    className={styles.quote}
                    style={{
                        opacity: quoteProgress,
                        transform: `translateY(${(1 - quoteProgress) * 24}px)`,
                    }}
                >
                    <span className={styles.quoteMark}>"</span>
                    Technologia to narzędzie.<br />
                    Mądrość to wiedzieć, kiedy go użyć.
                </blockquote>

                <p
                    className={styles.conclusion}
                    style={{
                        opacity: conclusionProgress,
                        transform: `translateY(${(1 - conclusionProgress) * 20}px)`,
                    }}
                >
                    AI nie jest zbawcą ani zagrożeniem. Jest lustrem — odbija nasze wartości,
                    uprzedzenia i nadzieje. Pytanie nie brzmi, czy powinna decydować,
                    ale jak chcemy żyć w świecie, który tworzymy.
                </p>

                <div
                    className={styles.footer}
                    style={{
                        opacity: footerProgress,
                        transform: `translateY(${(1 - footerProgress) * 12}px)`,
                    }}
                >
                    <p className={styles.credit}>Projekt szkolny • 2026</p>
                </div>
            </div>
        </section>
    );
}
