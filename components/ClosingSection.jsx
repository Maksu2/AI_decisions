"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./ClosingSection.module.css";

/**
 * ClosingSection — Domknięcie.
 * Spokojne, bez moralizowania, z jasną odpowiedzialnością.
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

    const line1Progress = Math.min(1, progress * 3);
    const line2Progress = Math.min(1, Math.max(0, (progress - 0.25) * 3));
    const footerProgress = Math.min(1, Math.max(0, (progress - 0.6) * 2.5));

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.content}>
                <p
                    className={styles.line1}
                    style={{
                        opacity: line1Progress,
                        transform: `translateY(${(1 - line1Progress) * 16}px)`,
                    }}
                >
                    Technologia to narzędzie.
                </p>
                <p
                    className={styles.line2}
                    style={{
                        opacity: line2Progress,
                        transform: `translateY(${(1 - line2Progress) * 16}px)`,
                    }}
                >
                    Odpowiedzialność za nie — nie.
                </p>

                <div
                    className={styles.footer}
                    style={{
                        opacity: footerProgress,
                        transform: `translateY(${(1 - footerProgress) * 10}px)`,
                    }}
                >
                    <p className={styles.credit}>2026</p>
                </div>
            </div>
        </section>
    );
}
