import { Geist } from "next/font/google";
import "./globals.css";

/**
 * Font Geist z Vercel — nowoczesny, czytelny.
 * Subset latin-ext dla polskich znaków.
 */
const geist = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-sans",
  display: "swap",
});

/**
 * Metadata dla SEO
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
