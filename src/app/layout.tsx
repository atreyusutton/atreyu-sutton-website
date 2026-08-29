import type { Metadata } from 'next'
import { Archivo, IBM_Plex_Mono, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { essays } from '@/content/loader'

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://atreyusutton.com'),
  title: {
    default: 'Atreyu Sutton',
    template: '%s, Atreyu Sutton',
  },
  description:
    'I design the part, machine it, and write the firmware that runs it. Mechanical, software and hardware work by Atreyu Sutton, Boulder, Colorado.',
  openGraph: {
    title: 'Atreyu Sutton',
    description: 'I design the part, machine it, and write the firmware that runs it.',
    url: 'https://atreyusutton.com',
    siteName: 'Atreyu Sutton',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${archivo.variable} ${sourceSerif.variable} ${plexMono.variable} min-h-screen`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="label sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ground-raised focus:px-3 focus:py-2 focus:text-ink"
          >
            Skip to content
          </a>
          <SiteHeader hasWriting={essays().length > 0} />
          <main id="main">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
