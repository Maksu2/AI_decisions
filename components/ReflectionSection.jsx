"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./ReflectionSection.module.css";

/**
 * Ikony SVG dla opcji wyboru.
 * Minimalistyczne, pasujące do estetyki Apple.
 */
const HumanIcon = () => (
    <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a8.5 8.5 0 0 1 13 0" />
    </svg>
);

const AIIcon = () => (
    <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="1.5" fill="currentColor" />
        <circle cx="15" cy="10" r="1.5" fill="currentColor" />
        <path d="M9 15h6" />
        <path d="M12 2v2" />
        <path d="M8 2v1" />
        <path d="M16 2v1" />
    </svg>
);

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

            if (rect.top < viewportHeight * 0.8 && rect.bottom > 0) {
                setIsVisible(true);
            }

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

    const entranceScale = 0.9 + scrollProgress * 0.15;
    const entranceOpacity = Math.min(1, scrollProgress * 2);

    return (
        <section
            ref={sectionRef}
            className={`${styles.section} ${isVisible ? styles.visible : ""}`}
        >
            <div
                className={styles.background}
                style={{ opacity: scrollProgress * 0.8 }}
            />

            <div
                className={styles.content}
                style={{
                    opacity: entranceOpacity,
                    transform: `scale(${entranceScale})`,
                }}
            >
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
                                <span className={styles.optionIcon}>
                                    <HumanIcon />
                                </span>
                                <span className={styles.optionLabel}>Człowiek</span>
                            </button>

                            <button
                                className={styles.option}
                                onClick={() => handleChoice("ai")}
                                aria-label="Wybierz: Sztuczna inteligencja"
                            >
                                <span className={styles.optionIcon}>
                                    <AIIcon />
                                </span>
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
