# Czy AI powinna decydować za ludzi?

Interaktywny esej wizualny w stylu Apple, eksplorujący rolę sztucznej inteligencji w podejmowaniu ludzkich decyzji.

---

## O projekcie

Strona nie ma niczego udowadniać ani przekonywać. Jej celem jest prowadzenie użytkownika przez ciąg myśli, który kończy się refleksją — nie odpowiedzią.

**Forma:** Scroll storytelling  
**Ton:** Refleksyjny, neutralny, dojrzały  
**Estetyka:** Minimalizm inspirowany Apple

---

## Stack technologiczny

| Kategoria | Technologia | Wersja |
|-----------|-------------|--------|
| Framework | Next.js (App Router) | 16.1.6 |
| Bundler | Turbopack | wbudowany |
| Język | JavaScript (ES2022+) | — |
| Style | CSS Modules | — |
| Hosting | Vercel | — |

### Brak zewnętrznych bibliotek

Projekt celowo nie używa żadnych zewnętrznych bibliotek do animacji (np. Framer Motion, GSAP). Wszystkie efekty scroll-driven są zbudowane natywnie przy użyciu:

- `position: sticky`
- `IntersectionObserver` (przez custom hook `useScrollReveal`)
- `window.scroll` event listener
- CSS `transform` + `opacity`

---

## Typografia

### Font główny: Geist Sans

```javascript
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});
```

**Geist** to font zaprojektowany przez Vercel, zoptymalizowany pod czytelność na ekranach. Używany zarówno do nagłówków, jak i body text.

### Fallback stack

```css
--font-display: var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Hierarchia rozmiarów

| Zmienna | Rozmiar | Użycie |
|---------|---------|--------|
| `--text-hero` | clamp(3.5rem, 10vw, 8rem) | Główne pytanie na hero |
| `--text-section` | clamp(2rem, 5vw, 4rem) | Nagłówki sekcji |
| `--text-heading` | clamp(1.4rem, 2.5vw, 2.2rem) | Podtytuły |
| `--text-body` | clamp(1rem, 1.25vw, 1.15rem) | Tekst podstawowy |
| `--text-small` | 0.8125rem | Etykiety, kategorie |

### Wagi fontów

- `400` — normal (consequence, thought)
- `500` — medium (lead lines)
- `600` — semibold (titles, conclusions)

### Letter-spacing

- `-0.03em` — tight (nagłówki)
- `-0.01em` — normal (body)
- `0.15em` — wide (etykiety uppercase)

---

## Paleta kolorów

| Zmienna | Wartość | Użycie |
|---------|---------|--------|
| `--color-bg` | #0a0a0a | Tło strony |
| `--color-bg-elevated` | #141414 | Elementy podniesione |
| `--color-text` | #fafafa | Tekst główny (biały) |
| `--color-text-muted` | #a0a0a0 | Tekst drugorzędny |
| `--color-text-subtle` | #666666 | Tekst wyciszony |
| `--color-accent` | #3b82f6 | Akcent (niebieski) |

---

## Animacje

### Easing functions

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
--ease-gentle: cubic-bezier(0.25, 0.1, 0.25, 1);
```

### Duracje

| Zmienna | Czas | Użycie |
|---------|------|--------|
| `--duration-micro` | 0.12s | Hover, focus |
| `--duration-fast` | 0.25s | Małe elementy |
| `--duration-medium` | 0.5s | Średnie elementy |
| `--duration-slow` | 0.9s | Duże sekcje |
| `--duration-slower` | 1.2s | Entrance animations |

---

## Struktura projektu

```
app/
├── layout.js          # Root layout + font + metadata
├── page.js            # Strona główna (kompozycja sekcji)
├── globals.css        # Design system + reset
├── icon.png           # Favicon (PNG)
└── favicon.ico        # Favicon (ICO)

components/
├── HeroSection.jsx    # Sekcja hero z paralaksą
├── NarrativeSection.jsx   # Scroll-driven narracja (fakty + konsekwencje)
├── ContrastSection.jsx    # Człowiek vs System
├── ReflectionSection.jsx  # Sekwencja myśli → puenta
├── ClosingSection.jsx     # Zakończenie
└── TransitionSection.jsx  # Przejścia między sekcjami

hooks/
└── useScrollReveal.js # Custom hook dla scroll-based reveal

public/
├── icon.png
└── favicon.ico
```

---

## Uruchomienie

```bash
# Instalacja
npm install

# Development
npm run dev

# Production build
npm run build

# Start (po buildzie)
npm run start
```

---

## Deploy

Projekt jest hostowany na Vercel. Auto-deploy jest wyłączony (`vercel.json`).

Ręczny deploy:
```bash
vercel --prod
```

---

## Autor

Projekt szkolny • 2026
