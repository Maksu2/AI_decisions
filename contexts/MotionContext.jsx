"use client";

import { createContext, useContext, useState, useEffect } from "react";

/**
 * MotionContext — Zarządzanie preferencjami animacji.
 * 
 * - Domyślnie animacje są WŁĄCZONE (reducedMotion = false)
 * - Użytkownik może włączyć reduced motion
 * - Wybór zapisywany w localStorage
 */

const MotionContext = createContext({
    reducedMotion: false,
    setReducedMotion: () => { },
});

export function MotionProvider({ children }) {
    // Domyślnie animacje włączone
    const [reducedMotion, setReducedMotion] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Inicjalizacja po stronie klienta
    useEffect(() => {
        setMounted(true);

        // Sprawdź localStorage
        const stored = localStorage.getItem("reduced-motion");

        if (stored !== null) {
            setReducedMotion(stored === "true");
        }
        // Ignoruj systemowe preferencje — zawsze domyślnie animacje włączone
    }, []);

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
        localStorage.setItem("reduced-motion", String(value));
    };

    return (
        <MotionContext.Provider
            value={{
                reducedMotion,
                setReducedMotion: handleSetReducedMotion,
            }}
        >
            {children}
        </MotionContext.Provider>
    );
}

export function useMotion() {
    return useContext(MotionContext);
}
