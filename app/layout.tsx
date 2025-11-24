import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Manifest 369 - Tu Ritual Diario',
  description: 'Diario de manifestación guiada basado en el método 3-6-9',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Manifest 369',
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <head>
        {/* Meta tags adicionales para PWA */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Manifest 369" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className={`${inter.className} gradient-bg`}>
        {/* Contenedor híbrido: Full screen en móvil, centrado en desktop */}
        <div className="w-full h-dvh overflow-hidden">
          {/* En desktop, el contenido está centrado con max-w-md */}
          <div className="max-w-md mx-auto h-dvh relative bg-dark shadow-2xl">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

