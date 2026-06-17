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
  metadataBase: new URL('https://buildblock.dev'),
  title: 'BuildBlock Dev Studio | Cinematic Web Experiences',
  description: 'We build websites that make people stop. Cinematic web experiences for brands that refuse to blend in. 12 brands · 0 templates · Jodhpur, India.',
  keywords: ['web development', 'creative agency', 'landing pages', 'premium websites', 'motion design', 'BuildBlock', 'Jodhpur', 'India', 'interaction design'],
  authors: [{ name: 'BuildBlock Dev Studio' }],
  alternates: {
    canonical: 'https://buildblock.dev',
  },
  openGraph: {
    title: 'BuildBlock Dev Studio | Cinematic Web Experiences',
    description: 'We build websites that make people stop.',
    url: 'https://buildblock.dev',
    siteName: 'BuildBlock Dev Studio',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'BuildBlock Dev Studio - Cinematic Web Experiences',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuildBlock Dev Studio | Cinematic Web Experiences',
    description: 'We build websites that make people stop.',
    images: ['/logo.png'],
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)', type: 'image/png' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "BuildBlock Dev Studio",
  "image": "https://buildblock.dev/logo.png",
  "@id": "https://buildblock.dev/#website",
  "url": "https://buildblock.dev",
  "telephone": "",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "",
    "addressLocality": "Jodhpur",
    "addressRegion": "Rajasthan",
    "postalCode": "342001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 26.2389,
    "longitude": 73.0243
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://github.com/buildblockdev"
  ],
  "priceRange": "$$$$"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable} ${newsreader.variable} bg-background noise-overlay`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
