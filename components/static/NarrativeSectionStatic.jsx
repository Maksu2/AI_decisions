import styles from "./NarrativeSectionStatic.module.css";

/**
 * NarrativeSectionStatic — Statyczna wersja narracji.
 * 
 * Wyświetla wszystkie momenty narracyjne jako normalne sekcje,
 * bez sticky, bez scroll-driven transforms, bez fade transitions.
 */

const narrativeSequence = [
    {
        id: "intro",
        type: "intro",
        title: "Każdego dnia algorytmy podejmują miliony decyzji.",
    },
    {
        id: "intro-2",
        type: "thought",
        title: "Większości z nich nawet nie zauważasz.",
    },
    {
        id: "medical",
        type: "example",
        label: "Medycyna",
        title: "AI analizuje prześwietlenie.",
        description: "W niektórych szpitalach algorytm wykrywa nowotwory szybciej niż radiolog.",
    },
    {
        id: "medical-reflection",
        type: "question",
        title: "Ale czy maszyna rozumie strach pacjenta?",
    },
    {
        id: "finance",
        type: "example",
        label: "Finanse",
        title: "Algorytm ocenia Twoją zdolność kredytową.",
        description: "Banki używają AI do przewidywania ryzyka.",
    },
    {
        id: "finance-reflection",
        type: "thought",
        title: "Model nie widzi Twojej historii — widzi statystyki.",
    },
    {
        id: "transport",
        type: "example",
        label: "Transport",
        title: "Samochód autonomiczny podejmuje decyzję w ułamku sekundy.",
        description: "W sytuacji zagrożenia AI musi wybrać.",
    },
    {
        id: "transport-reflection",
        type: "question",
        title: "Kto ponosi odpowiedzialność za jej wybór?",
    },
    {
        id: "justice",
        type: "example",
        label: "Wymiar sprawiedliwości",
        title: "System sugeruje wyrok.",
        description: "W USA algorytmy oceniają ryzyko recydywy.",
    },
    {
        id: "justice-reflection",
        type: "question",
        title: "Czy dane historyczne mogą być sprawiedliwe?",
    },
    {
        id: "work",
        type: "example",
        label: "Rekrutacja",
        title: "AI przegląda Twoje CV.",
        description: "Zanim człowiek zobaczy Twoje zgłoszenie, algorytm już podjął wstępną decyzję.",
    },
    {
        id: "summary",
        type: "conclusion",
        title: "To nie jest przyszłość.",
    },
    {
        id: "summary-2",
        type: "conclusion-accent",
        title: "To dzieje się teraz.",
    },
];

export default function NarrativeSectionStatic() {
    return (
        <section className={styles.section}>
            <p className={styles.sectionLabel}>Gdzie dziś decyduje AI?</p>

            <div className={styles.content}>
                {narrativeSequence.map((item) => (
                    <article
                        key={item.id}
                        className={`${styles.item} ${styles[item.type] || ""}`}
                    >
                        {item.label && (
                            <span className={styles.category}>{item.label}</span>
                        )}
                        <h2 className={styles.title}>{item.title}</h2>
                        {item.description && (
                            <p className={styles.description}>{item.description}</p>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
}
