import type { Metadata, Viewport } from 'next'
import { DM_Sans, DM_Serif_Display, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: "--font-dm-sans"
})

const dmSerif = DM_Serif_Display({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif"
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono"
})

export const metadata: Metadata = {
  title: 'Asistente Vocacional | ITC Celaya',
  description: 'Sistema de Orientación Vocacional basado en IA para el Instituto Tecnológico de Celaya. Descubre qué carrera es la más adecuada para ti.',
  keywords: ['orientación vocacional', 'ITC Celaya', 'carreras', 'ingeniería', 'tecnológico'],
  authors: [{ name: 'Instituto Tecnológico de Celaya - TecNM' }],
}

export const viewport: Viewport = {
  themeColor: '#1a365d',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className={`${dmSans.variable} ${dmSerif.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
