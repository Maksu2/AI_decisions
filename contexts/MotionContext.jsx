"use client";

import { createContext, useContext, useState, useEffect } from "react";

/**
 * MotionContext — Zarządzanie preferencjami animacji.
 * 
 * - Domyślnie respektuje prefers-reduced-motion z systemu
 * - Pozwala użytkownikowi nadpisać ustawienia
 * - Zapamiętuje wybór w localStorage
 */

const MotionContext = createContext({
    reducedMotion: false,
    setReducedMotion: () => { },
    isSystemPreference: true,
});

export function MotionProvider({ children }) {
    const [reducedMotion, setReducedMotion] = useState(false);
    const [isSystemPreference, setIsSystemPreference] = useState(true);
    const [mounted, setMounted] = useState(false);

    // Inicjalizacja po stronie klienta
    useEffect(() => {
        setMounted(true);

        // Sprawdź localStorage
        const stored = localStorage.getItem("reduced-motion");

        if (stored !== null) {
            // Użytkownik nadpisał ustawienia
            setReducedMotion(stored === "true");
            setIsSystemPreference(false);
        } else {
            // Użyj systemowych preferencji
            const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
            setReducedMotion(mediaQuery.matches);

            // Nasłuchuj zmian systemowych
            const handler = (e) => {
                if (isSystemPreference) {
                    setReducedMotion(e.matches);
                }
            };

            mediaQuery.addEventListener("change", handler);
            return () => mediaQuery.removeEventListener("change", handler);
        }
    }, [isSystemPreference]);

    // Aktualizuj klasę na body
    useEffect(() => {
        if (!mounted) return;

        if (reducedMotion) {
            document.body.classList.add("reduced-motion");
        } else {
            document.body.classList.remove("reduced-motion");
        }
    }, [reducedMotion, mounted]);

    const handleSetReducedMotion = (value) => {
        setReducedMotion(value);
        setIsSystemPreference(false);
        localStorage.setItem("reduced-motion", String(value));
    };

    const resetToSystemPreference = () => {
        localStorage.removeItem("reduced-motion");
        setIsSystemPreference(true);
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mediaQuery.matches);
    };

    return (
        <MotionContext.Provider
            value={{
                reducedMotion,
                setReducedMotion: handleSetReducedMotion,
                isSystemPreference,
                resetToSystemPreference,
            }}
        >
            {children}
        </MotionContext.Provider>
    );
}

export function useMotion() {
    return useContext(MotionContext);
}
