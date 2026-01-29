import { Geist } from "next/font/google";
import "./globals.css";

/**
 * Font Inter-like (Geist) z Google Fonts
 * Geist to font zaprojektowany przez Vercel, inspirowany Inter.
 */
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

/**
 * Metadata dla SEO
 * Tytul i opis strony widoczne w wynikach wyszukiwania.
 */
export const metadata = {
  title: "Czy AI powinna decydować za ludzi? | Refleksja",
  description:
    "Interaktywna narracja scroll storytelling eksplorująca pytanie o rolę sztucznej inteligencji w podejmowaniu decyzji za człowieka.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Czy AI powinna decydować za ludzi?",
    description: "Eksploracja roli AI w podejmowaniu ludzkich decyzji",
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className={geist.variable}>
        {children}
      </body>
    </html>
  );
}
