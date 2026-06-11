import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Insta Card — 인스타 카드 뉴스 템플릿",
  description: "미니멀 라이프스타일 인스타그램 카드 뉴스 템플릿 에디터",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
