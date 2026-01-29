"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./HeroSection.module.css";

/**
 * Sekcja Hero — pełnoekranowa sekcja otwierająca z głównym pytaniem.
 * 
 * Efekty:
 * - Tekst pojawia się z animacją fade-in po załadowaniu
 * - Przy scrollowaniu: parallax (opacity + scale) dla immersyjnego wrażenia
 * - Subtelna strzałka zachęcająca do przewinięcia
 */
export default function HeroSection() {
    const [scrollY, setScrollY] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        // Animacja wejścia po załadowaniu
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                // Tylko gdy sekcja jest widoczna
                if (rect.bottom > 0) {
                    setScrollY(window.scrollY);
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Parallax: opacity maleje, skala rośnie przy scrollowaniu
    const opacity = Math.max(0, 1 - scrollY / 600);
    const scale = 1 + scrollY * 0.0003;

    return (
        <section ref={sectionRef} className={styles.hero}>
            <div
                className={`${styles.content} ${isLoaded ? styles.loaded : ""}`}
                style={{
                    opacity,
                    transform: `scale(${scale})`,
                }}
            >
                <h1 className={styles.title}>
                    Czy sztuczna inteligencja
                    <br />
                    <span className={styles.highlight}>powinna decydować za nas?</span>
                </h1>
                <p className={styles.subtitle}>
                    Przewiń, aby odkryć różne perspektywy
                </p>
            </div>

            {/* Strzałka zachęcająca do scrollowania */}
            <div className={styles.scrollIndicator} style={{ opacity }}>
                <div className={styles.arrow} />
            </div>
        </section>
    );
}
