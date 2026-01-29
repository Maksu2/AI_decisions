import styles from "./ClosingSectionStatic.module.css";

/**
 * ClosingSectionStatic — Statyczne podsumowanie.
 */
export default function ClosingSectionStatic() {
    return (
        <section className={styles.section}>
            <div className={styles.content}>
                <blockquote className={styles.quote}>
                    <span className={styles.quoteMark}>"</span>
                    Technologia to narzędzie.<br />
                    Mądrość to wiedzieć, kiedy z niego skorzystać.
                </blockquote>

                <p className={styles.conclusion}>
                    Sztuczna inteligencja nie jest ani zbawcą, ani zagrożeniem.
                    Jest lustrem, w którym odbijają się nasze wartości, uprzedzenia i nadzieje.
                    Pytanie nie brzmi, czy AI powinna decydować — ale jak chcemy żyć
                    w świecie, który sami tworzymy.
                </p>

                <div className={styles.footer}>
                    <p className={styles.credit}>Projekt szkolny • 2026</p>
                </div>
            </div>
        </section>
    );
}
