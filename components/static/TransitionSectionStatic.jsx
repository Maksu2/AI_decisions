import styles from "./TransitionSectionStatic.module.css";

/**
 * TransitionSectionStatic — Statyczny moment przejściowy.
 * 
 * Bez efektów scroll/parallax, po prostu elegancki cytat.
 */
export default function TransitionSectionStatic({ text, variant = "default" }) {
    return (
        <section className={`${styles.section} ${styles[variant]}`}>
            <p className={styles.text}>{text}</p>
        </section>
    );
}
