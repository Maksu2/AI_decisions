"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hook do śledzenia widoczności elementu w viewporcie.
 * Używany do animacji reveal przy scrollowaniu.
 * 
 * @param {Object} options - Opcje Intersection Observer
 * @param {number} options.threshold - Próg widoczności (0-1)
 * @param {string} options.rootMargin - Margines obszaru obserwacji
 * @returns {[React.RefObject, boolean]} - Ref do elementu i stan widoczności
 */
export function useScrollReveal(options = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Raz widoczny = zawsze widoczny (animacja tylko raz)
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element);
                }
            },
            {
                threshold: options.threshold ?? 0.2,
                rootMargin: options.rootMargin ?? "0px",
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [options.threshold, options.rootMargin]);

    return [ref, isVisible];
}

/**
 * Hook do śledzenia postępu scrollowania w obrębie sekcji.
 * Używany w sticky narrative section.
 * 
 * @param {React.RefObject} containerRef - Ref do kontenera
 * @returns {number} - Postęp scrollowania (0-1)
 */
export function useScrollProgress(containerRef) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const rect = container.getBoundingClientRect();
            const containerHeight = container.offsetHeight;
            const viewportHeight = window.innerHeight;

            // Oblicz postęp: 0 gdy sekcja zaczyna wchodzić, 1 gdy wychodzi
            const scrolled = viewportHeight - rect.top;
            const total = containerHeight + viewportHeight;
            const rawProgress = scrolled / total;

            setProgress(Math.min(1, Math.max(0, rawProgress)));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Inicjalna wartość

        return () => window.removeEventListener("scroll", handleScroll);
    }, [containerRef]);

    return progress;
}
