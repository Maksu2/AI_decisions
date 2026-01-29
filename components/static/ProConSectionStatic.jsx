import styles from "./ProConSectionStatic.module.css";

/**
 * ProConSectionStatic — Statyczna wersja argumentów.
 * 
 * Bez scroll-driven reveal, wszystkie karty widoczne od razu.
 */

const proArguments = [
    { id: "speed", title: "Szybkość", description: "AI przetwarza dane w ułamku sekundy, gdy liczy się każda chwila." },
    { id: "consistency", title: "Konsekwencja", description: "Algorytm nie ma złych dni — jego decyzje są przewidywalne." },
    { id: "scale", title: "Skala", description: "Jeden system może obsłużyć miliony przypadków jednocześnie." },
];

const conArguments = [
    { id: "context", title: "Brak kontekstu", description: "AI nie rozumie niuansów życia, które człowiek widzi intuicyjnie." },
    { id: "accountability", title: "Odpowiedzialność", description: "Gdy algorytm się myli, kto ponosi konsekwencje?" },
    { id: "bias", title: "Uprzedzenia", description: "AI uczy się z danych — także z błędów i stereotypów przeszłości." },
];

export default function ProConSectionStatic() {
    return (
        <section className={styles.section}>
            <header className={styles.header}>
                <h2 className={styles.title}>Dwie strony medalu</h2>
                <p className={styles.subtitle}>
                    Każda technologia niesie ze sobą szanse i zagrożenia
                </p>
            </header>

            <div className={styles.grid}>
                {/* Kolumna PRO */}
                <div className={styles.column}>
                    <span className={styles.columnLabel}>Za przekazaniem decyzji AI</span>
                    <div className={styles.cards}>
                        {proArguments.map((arg) => (
                            <article key={arg.id} className={styles.card}>
                                <h3 className={styles.cardTitle}>{arg.title}</h3>
                                <p className={styles.cardDesc}>{arg.description}</p>
                            </article>
                        ))}
                    </div>
                </div>

                {/* Kolumna CON */}
                <div className={styles.column}>
                    <span className={`${styles.columnLabel} ${styles.labelCon}`}>Przeciw</span>
                    <div className={styles.cards}>
                        {conArguments.map((arg) => (
                            <article key={arg.id} className={`${styles.card} ${styles.cardCon}`}>
                                <h3 className={styles.cardTitle}>{arg.title}</h3>
                                <p className={styles.cardDesc}>{arg.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
