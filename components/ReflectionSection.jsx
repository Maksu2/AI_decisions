"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./ReflectionSection.module.css";

/**
 * ReflectionSection — Sekwencja myśli prowadząca do puenty.
 * Bez metakomentarzy, prosto do sedna.
 */

const reflectionSequence = [
    { type: "question", text: "Kto powinien mieć ostatnie słowo?" },
    { type: "thought", text: "Człowiek zna kontekst. Bywa zmęczony." },
    { type: "thought", text: "System jest szybki. Nie rozumie." },
    { type: "insight", text: "Nie chodzi o to, kto decyduje." },
    { type: "conclusion", text: "Chodzi o to, kto ponosi konsekwencje." },
];

export default function ReflectionSection() {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [itemProgress, setItemProgress] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const rect = container.getBoundingClientRect();
            const containerHeight = container.offsetHeight;
            const viewportHeight = window.innerHeight;

            const scrolled = -rect.top;
            const scrollableHeight = containerHeight - viewportHeight;
            const totalProgress = Math.min(1, Math.max(0, scrolled / scrollableHeight));

            const totalItems = reflectionSequence.length;
            const progressPerItem = 1 / totalItems;
            const currentIndex = Math.min(
                totalItems - 1,
                Math.floor(totalProgress / progressPerItem)
            );

            const itemStart = currentIndex * progressPerItem;
            const progressWithinItem = (totalProgress - itemStart) / progressPerItem;

            setActiveIndex(currentIndex);
            setItemProgress(Math.min(1, Math.max(0, progressWithinItem)));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const currentItem = reflectionSequence[activeIndex];

    let opacity = 1;
    if (itemProgress < 0.12) {
        opacity = itemProgress / 0.12;
    } else if (itemProgress > 0.88) {
        opacity = (1 - itemProgress) / 0.12;
    }

    return (
        <section ref={containerRef} className={styles.container}>
            <div className={styles.sticky}>
                <div className={styles.content}>
                    <p
                        className={`${styles.text} ${styles[currentItem.type]}`}
                        style={{ opacity }}
                    >
                        {currentItem.text}
                    </p>
                </div>
            </div>
        </section>
    );
}
