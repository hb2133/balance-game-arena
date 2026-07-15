import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppShell } from "@/app/shell/AppShell";
import { KoreanStrings } from "@/core/localization/KoreanStrings";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata =
{
    title: KoreanStrings.AppName,
    description: KoreanStrings.AppDescription,
};

export default function RootLayout(Props: Readonly<{ children: React.ReactNode }>)
{
    return (
        <html lang="ko" className={`${geistSans.variable} ${geistMono.variable}`}>
            <body><AppShell>{Props.children}</AppShell></body>
        </html>
    );
}
