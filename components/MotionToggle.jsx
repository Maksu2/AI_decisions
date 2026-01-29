"use client";

import { useMotion } from "@/contexts/MotionContext";
import styles from "./MotionToggle.module.css";

/**
 * MotionToggle — Dyskretny przełącznik reduced motion.
 * 
 * - Subtelny, estetycznie spójny z resztą strony
 * - Pozycjonowany w rogu, nie dominuje wizualnie
 * - Pokazuje aktualny stan i źródło (system/manual)
 */
export default function MotionToggle() {
    const { reducedMotion, setReducedMotion, isSystemPreference } = useMotion();

    const handleToggle = () => {
        setReducedMotion(!reducedMotion);
    };

    return (
        <button
            className={`${styles.toggle} ${reducedMotion ? styles.active : ""}`}
            onClick={handleToggle}
            aria-pressed={reducedMotion}
            aria-label={reducedMotion ? "Włącz animacje" : "Wyłącz animacje"}
            title={reducedMotion ? "Animacje wyłączone" : "Animacje włączone"}
        >
            <svg
                className={styles.icon}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {reducedMotion ? (
                    /* Ikona pause — animacje wyłączone */
                    <>
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                    </>
                ) : (
                    /* Ikona motion — animacje włączone */
                    <>
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                    </>
                )}
            </svg>
            {isSystemPreference && (
                <span className={styles.systemIndicator} aria-hidden="true">
                    •
                </span>
            )}
        </button>
    );
}
