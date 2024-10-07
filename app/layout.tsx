import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
export const fontClassName = inter.className

export const metadata: Metadata = {
  title: 'Sarah & John\'s Wedding Memories',
  description: 'Celebrating the love story of Sarah and John',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={fontClassName}>{children}</body>
    </html>
  )
}