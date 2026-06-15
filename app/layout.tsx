import type { Metadata } from 'next'
import { Geist, Geist_Mono, Newsreader } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SmoothScroll } from '@/components/smooth-scroll'
import Cursor from '@/components/cursor'
import AIAssistant from '@/components/ai-assistant'
import './globals.css'

const geist = Geist({ 
  subsets: ["latin"],
  variable: '--font-geist'
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-mono'
})

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: '--font-newsreader'
})

export const metadata: Metadata = {
  title: 'BuildBlock Dev Studio | Cinematic Web Experiences',
  description: 'We build websites that make people stop. Cinematic web experiences for brands that refuse to blend in. 12 brands · 0 templates · Jodhpur, India.',
  keywords: ['web development', 'creative agency', 'landing pages', 'premium websites', 'motion design', 'BuildBlock', 'Jodhpur'],
  authors: [{ name: 'BuildBlock Dev Studio' }],
  openGraph: {
    title: 'BuildBlock Dev Studio | Cinematic Web Experiences',
    description: 'We build websites that make people stop.',
    url: 'https://buildblock.dev',
    siteName: 'BuildBlock Dev Studio',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${newsreader.variable} bg-background noise-overlay`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <Cursor />
        <AIAssistant />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
