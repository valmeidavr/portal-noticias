import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portal de Notícias | Últimas notícias do Brasil e do mundo",
  description:
    "Portal de notícias com cobertura de política, economia, esportes, tecnologia, entretenimento, saúde, mundo e ciência.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
