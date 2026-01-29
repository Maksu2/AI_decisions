"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./ReflectionSection.module.css";

/**
 * Odpowiedzi refleksyjne po wyborze.
 */
const responses = {
    human: {
        title: "Odpowiedzialność zostaje przy nas.",
        text: "Wielu uważa, że ostateczna decyzja powinna należeć do człowieka — bo tylko my możemy ponieść moralne konsekwencje naszych wyborów. Ale czy zawsze mamy czas i wiedzę, by decydować mądrze?",
    },
    ai: {
        title: "Zaufanie w dane i algorytmy.",
        text: "Część osób wierzy, że AI — wolna od emocji i zmęczenia — może podejmować bardziej obiektywne decyzje. Ale czy obiektywność wyuczona z przeszłości jest naprawdę sprawiedliwa?",
    },
    neither: {
        title: "Może odpowiedź nie jest binarna.",
        text: 'Najważniejsze pytanie to nie "kto", ale "jak". Być może przyszłość leży w mądrej współpracy — AI jako narzędzie, człowiek jako strażnik wartości.',
    },
};

/**
 * ReflectionSection — Kulminacyjny element interaktywny.
 * 
 * Wzmocnione wejście animacyjne — sekcja pojawia się jako punkt kulminacyjny.
 */
export default function ReflectionSection() {
    const sectionRef = useRef(null);
    const [choice, setChoice] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const handleScroll = () => {
            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Kiedy sekcja wchodzi w viewport
            if (rect.top < viewportHeight * 0.8 && rect.bottom > 0) {
                setIsVisible(true);
            }

            // Progress dla efektów parallax
            const center = rect.top + rect.height / 2;
            const distanceFromCenter = center - viewportHeight / 2;
            const normalizedProgress = 0.5 - distanceFromCenter / viewportHeight;
            setScrollProgress(Math.min(1, Math.max(0, normalizedProgress)));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleChoice = (option) => {
        setChoice(option);
    };

    const handleReset = () => {
        setChoice(null);
    };

    // Efekty wejścia
    const entranceScale = 0.9 + scrollProgress * 0.15;
    const entranceOpacity = Math.min(1, scrollProgress * 2);

    return (
        <section
            ref={sectionRef}
            className={`${styles.section} ${isVisible ? styles.visible : ""}`}
        >
            {/* Tło z gradientem */}
            <div
                className={styles.background}
                style={{
                    opacity: scrollProgress * 0.8,
                }}
            />

            <div
                className={styles.content}
                style={{
                    opacity: entranceOpacity,
                    transform: `scale(${entranceScale})`,
                }}
            >
                {/* Pytanie */}
                {!choice && (
                    <div className={styles.question}>
                        <span className={styles.preTitle}>Czas na Twoją refleksję</span>
                        <h2 className={styles.title}>
                            Kto powinien mieć<br />ostatnie słowo?
                        </h2>
                        <p className={styles.subtitle}>To nie głosowanie. To refleksja.</p>

                        <div className={styles.options}>
                            <button
                                className={styles.option}
                                onClick={() => handleChoice("human")}
                                aria-label="Wybierz: Człowiek"
                            >
                                <span className={styles.optionIcon}>👤</span>
                                <span className={styles.optionLabel}>Człowiek</span>
                            </button>

                            <button
                                className={styles.option}
                                onClick={() => handleChoice("ai")}
                                aria-label="Wybierz: Sztuczna inteligencja"
                            >
                                <span className={styles.optionIcon}>🤖</span>
                                <span className={styles.optionLabel}>AI</span>
                            </button>

                            <button
                                className={`${styles.option} ${styles.optionSmall}`}
                                onClick={() => handleChoice("neither")}
                                aria-label="Wybierz: Trudno powiedzieć"
                            >
                                <span className={styles.optionLabel}>Trudno powiedzieć</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Odpowiedź */}
                {choice && (
                    <div className={styles.response}>
                        <h3 className={styles.responseTitle}>{responses[choice].title}</h3>
                        <p className={styles.responseText}>{responses[choice].text}</p>
                        <button className={styles.reset} onClick={handleReset}>
                            Rozważ ponownie
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
