import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/Toaster";
import { ErrorBoundary } from "@/components/providers/ErrorBoundary";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DocuMind AI — AI-Powered Document Intelligence",
  description:
    "Upload any document and unlock AI-powered summaries, quizzes, flashcards, notes, and more. Your intelligent study companion.",
  keywords: ["AI", "study", "flashcards", "summaries", "quiz", "student", "learning"],
};

import { GuestPrompt } from "@/components/layout/GuestPrompt";
import { NotificationProvider } from "@/components/providers/NotificationProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>
            <NotificationProvider>
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
              <Toaster />
              <GuestPrompt />
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
