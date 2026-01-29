"use client";

import styles from "./HeroSectionStatic.module.css";

/**
 * HeroSectionStatic — Wersja bez animacji dla Reduced Motion.
 */
export default function HeroSectionStatic() {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Czy <span className={styles.highlight}>AI</span> powinna<br />
                    decydować za ludzi?
                </h1>
                <p className={styles.subtitle}>
                    Refleksja o granicy między pomocą a kontrolą
                </p>
            </div>
        </section>
    );
}
