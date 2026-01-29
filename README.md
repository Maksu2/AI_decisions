# 🤖 Czy AI powinna decydować za ludzi?

Nowoczesna, minimalistyczna strona internetowa w estetyce Apple, eksplorująca refleksyjne pytanie o rolę sztucznej inteligencji w podejmowaniu decyzji.

**[🌐 Zobacz demo na Vercel](https://ai-decisions.vercel.app)** *(po deploymencie)*

---

## 📖 O projekcie

Strona ma formę **scroll storytelling** — spokojnej, przewijanej narracji prowadzącej użytkownika przez kolejne etapy rozumowania. Zamiast klasycznego artykułu, stawia na:

- 🎯 **Klarowność przekazu** — jedno zdanie na ekran
- 🌬️ **Ciszę wizualną** — duża ilość pustej przestrzeni
- ✨ **Animacje wzmacniające sens** — fade, scale, parallax przy scrollu
- ⚖️ **Wyważony ton** — bez narzucania jednoznacznej odpowiedzi

## 🎨 Estetyka

Inspiracja: strony produktowe Apple.

- Ciemne tło (`#0a0a0a`) z wysokim kontrastem
- Font: Geist (Vercel) — nowoczesny, czytelny
- Akcent: niebieski (`#3b82f6`) stosowany oszczędnie
- Animacje scroll-driven na każdej sekcji

## 🏗️ Struktura

```
├── app/
│   ├── layout.js          # Root layout, SEO metadata
│   ├── page.js             # Kompozycja wszystkich sekcji
│   └── globals.css         # Design system, zmienne CSS
├── components/
│   ├── HeroSection.jsx     # Pełnoekranowe pytanie otwierające
│   ├── NarrativeSection.jsx# Sticky scroll z 13 momentami narracji
│   ├── TransitionSection.jsx# "Oddychające" sekcje przejściowe
│   ├── ProConSection.jsx   # Scroll-driven reveal argumentów
│   ├── ReflectionSection.jsx# Interaktywny element refleksyjny
│   └── ClosingSection.jsx  # Podsumowanie z efektami fade
└── hooks/
    └── useScrollReveal.js  # Custom hooks do animacji scroll
```

## 🚀 Uruchomienie lokalne

```bash
# Instalacja zależności
npm install

# Tryb deweloperski
npm run dev

# Build produkcyjny
npm run build
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

## 📦 Deploy na Vercel

1. Połącz repo z [Vercel](https://vercel.com)
2. Vercel automatycznie wykryje Next.js
3. Kliknij "Deploy"

Lub przez CLI:
```bash
npx vercel
```

## 🛠️ Technologie

- **Next.js 16** (App Router)
- **React 19**
- **CSS Modules** (bez Tailwind)
- **Intersection Observer API** dla animacji scroll

## 📝 Licencja

Projekt szkolny • 2026

---

*Stworzono z myślą o refleksji, nie o odpowiedziach.*
