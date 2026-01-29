"use client";

import { useState } from "react";
import styles from "./ReflectionSectionStatic.module.css";

/**
 * ReflectionSectionStatic — Statyczna wersja refleksji.
 * Zachowuje interaktywność przycisków, ale bez scroll-driven entrance.
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

/* Ikony SVG */
const HumanIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a8.5 8.5 0 0 1 13 0" />
    </svg>
);

const AIIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="1.5" fill="currentColor" />
        <circle cx="15" cy="10" r="1.5" fill="currentColor" />
        <path d="M9 15h6" />
        <path d="M12 2v2" />
    </svg>
);

export default function ReflectionSectionStatic() {
    const [choice, setChoice] = useState(null);

    return (
        <section className={styles.section}>
            <div className={styles.content}>
                {!choice && (
                    <div className={styles.question}>
                        <span className={styles.preTitle}>Czas na Twoją refleksję</span>
                        <h2 className={styles.title}>
                            Kto powinien mieć<br />ostatnie słowo?
                        </h2>
                        <p className={styles.subtitle}>To nie głosowanie. To refleksja.</p>

                        <div className={styles.options}>
                            <button className={styles.option} onClick={() => setChoice("human")}>
                                <span className={styles.optionIcon}><HumanIcon /></span>
                                <span className={styles.optionLabel}>Człowiek</span>
                            </button>

                            <button className={styles.option} onClick={() => setChoice("ai")}>
                                <span className={styles.optionIcon}><AIIcon /></span>
                                <span className={styles.optionLabel}>AI</span>
                            </button>

                            <button className={`${styles.option} ${styles.optionSmall}`} onClick={() => setChoice("neither")}>
                                <span className={styles.optionLabel}>Trudno powiedzieć</span>
                            </button>
                        </div>
                    </div>
                )}

                {choice && (
                    <div className={styles.response}>
                        <h3 className={styles.responseTitle}>{responses[choice].title}</h3>
                        <p className={styles.responseText}>{responses[choice].text}</p>
                        <button className={styles.reset} onClick={() => setChoice(null)}>
                            Rozważ ponownie
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
