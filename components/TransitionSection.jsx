"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./TransitionSection.module.css";

/**
 * TransitionSection — "Oddychający" moment ciszy.
 * 
 * Pełnoekranowa sekcja z jednym zdaniem/pytaniem, które pojawia się
 * i znika wraz ze scrollem. Używany między głównymi blokami
 * dla stworzenia rytmu i pauzy w narracji.
 * 
 * @param {string} text - Główny tekst do wyświetlenia
 * @param {string} subtext - Opcjonalny podtekst
 * @param {string} variant - "default" | "accent" | "dim" - wariant kolorystyczny
 */
export default function TransitionSection({ text, subtext, variant = "default" }) {
    const sectionRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const handleScroll = () => {
            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Progress: 0 gdy sekcja wchodzi od dołu, 1 gdy wychodzi u góry
            // Ćrodek (0.5) = pełna widoczność
            const center = rect.top + rect.height / 2;
            const distanceFromCenter = center - viewportHeight / 2;
            const normalizedDistance = distanceFromCenter / viewportHeight;

            // Mapuj na progress: 0->0.5->1 gdy sekcja przechodzi przez viewport
            const rawProgress = 0.5 - normalizedDistance;
            setProgress(Math.min(1, Math.max(0, rawProgress)));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Efekty bazowane na progress:
    // - opacity: peak at 0.5, fade at edges
    // - scale: subtle grow toward center
    // - translateY: slight parallax
    const opacity = 1 - Math.abs(progress - 0.5) * 2.5;
    const scale = 0.95 + progress * 0.1;
    const translateY = (0.5 - progress) * 30;

    return (
        <section
            ref={sectionRef}
            className={`${styles.section} ${styles[variant]}`}
        >
            <div
                className={styles.content}
                style={{
                    opacity: Math.max(0, opacity),
                    transform: `translateY(${translateY}px) scale(${scale})`,
                }}
            >
                <p className={styles.text}>{text}</p>
                {subtext && <p className={styles.subtext}>{subtext}</p>}
            </div>
        </section>
    );
}
