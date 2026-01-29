"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./HeroSection.module.css";

/**
 * HeroSection — Pełnoekranowa sekcja otwierająca.
 * 
 * Subtelny parallax i animacja wejścia.
 */
export default function HeroSection() {
    const [scrollY, setScrollY] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                if (rect.bottom > 0) {
                    setScrollY(window.scrollY);
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const opacity = Math.max(0, 1 - scrollY / 500);
    const scale = 1 + scrollY * 0.0002;

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
                    Przewiń, aby poznać różne perspektywy
                </p>
            </div>

            <div className={styles.scrollIndicator} style={{ opacity }}>
                <div className={styles.arrow} />
            </div>
        </section>
    );
}
