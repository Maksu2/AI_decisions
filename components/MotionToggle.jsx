"use client";

import { useMotion } from "@/contexts/MotionContext";
import styles from "./MotionToggle.module.css";

/**
 * MotionToggle — Przełącznik reduced motion.
 * 
 * Tekst zawsze "Reduced motion" — zmienia się tylko stan.
 */
export default function MotionToggle() {
    const { reducedMotion, setReducedMotion } = useMotion();

    const handleToggle = () => {
        setReducedMotion(!reducedMotion);
    };

    return (
        <button
            className={`${styles.toggle} ${reducedMotion ? styles.active : ""}`}
            onClick={handleToggle}
            aria-pressed={reducedMotion}
            aria-label={reducedMotion ? "Wyłącz tryb reduced motion" : "Włącz tryb reduced motion"}
        >
            {/* Ikona */}
            <span className={styles.icon} aria-hidden="true">
                {reducedMotion ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                    </svg>
                )}
            </span>

            {/* Tekst identyczny w obu trybach */}
            <span className={styles.label}>Reduced motion</span>
        </button>
    );
}
