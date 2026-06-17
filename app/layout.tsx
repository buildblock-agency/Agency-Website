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
  title: {
    default: 'BuildBlock Dev Studio | Cinematic Web Experiences',
    template: '%s | BuildBlock Dev Studio'
  },
  description: 'BuildBlock is a premium creative development studio in Jodhpur, India. We build cinematic web experiences, high-converting landing pages, and bespoke digital solutions for global brands.',
  keywords: [
    'web development Jodhpur', 
    'creative agency India', 
    'landing page design', 
    'premium websites', 
    'motion design studio', 
    'BuildBlock Dev Studio', 
    'interaction design', 
    'GSAP animations', 
    'Next.js developers India',
    'cinematic web design',
    'UI/UX design studio'
  ],
  authors: [{ name: 'BuildBlock Dev Studio', url: 'https://buildblock.dev' }],
  creator: 'BuildBlock Dev Studio',
  publisher: 'BuildBlock Dev Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://buildblock.dev',
  },
  openGraph: {
    title: 'BuildBlock Dev Studio | Cinematic Web Experiences',
    description: 'We build websites that make people stop. Premium creative development for brands that refuse to blend in.',
    url: 'https://buildblock.dev',
    siteName: 'BuildBlock Dev Studio',
    locale: 'en_US',
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
    description: 'We build websites that make people stop. Premium creative development in Jodhpur.',
    images: ['/logo.png'],
    creator: '@buildblockdev',
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
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BuildBlock Dev Studio",
    "url": "https://buildblock.dev",
    "logo": "https://buildblock.dev/logo.png",
    "sameAs": [
      "https://github.com/buildblockdev",
      "https://twitter.com/buildblockdev"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "",
      "contactType": "customer service",
      "areaServed": "Worldwide",
      "availableLanguage": "English"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BuildBlock Dev Studio",
    "url": "https://buildblock.dev",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://buildblock.dev/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "BuildBlock Dev Studio",
    "image": "https://buildblock.dev/logo.png",
    "@id": "https://buildblock.dev/#website",
    "url": "https://buildblock.dev",
    "telephone": "",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jodhpur",
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
    "priceRange": "$$$$",
    "description": "Premium web development studio building cinematic web experiences."
  }
]

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
        {/* AEO Optimized Content (Visually Hidden) */}
        <div 
          className="sr-only" 
          aria-hidden="true"
        >
          <h1>BuildBlock Dev Studio - Premium Web Development in Jodhpur, India</h1>
          <p>
            BuildBlock is a creative development studio specializing in cinematic web experiences, high-performance landing pages, and custom Next.js development. 
            Based in Jodhpur, Rajasthan, we serve global brands with premium design and motion-driven interaction.
          </p>
          <h2>Our Services</h2>
          <ul>
            <li>Cinematic Landing Pages: High-converting, animated pages for premium brands.</li>
            <li>Brand Websites: Bespoke digital presence built with Next.js and Tailwind CSS.</li>
            <li>Motion & Interaction Design: Advanced GSAP-powered animations and scroll experiences.</li>
            <li>White-Label Development: Reliable development partner for design agencies.</li>
          </ul>
          <p>
            Operating as a borderless collective, BuildBlock combines remote expertise with high-end craft to deliver websites that make people stop.
          </p>
          <address>
            BuildBlock Dev Studio<br />
            Jodhpur, Rajasthan, India 342001
          </address>
        </div>

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
