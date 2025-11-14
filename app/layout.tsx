import type { Metadata } from 'next'
import './globals.css'
import { Poppins, Playfair_Display } from 'next/font/google'
import ClientLayout from './components/ClientLayout'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'SERVILEON LTDA - Suministro de Recurso Humano, Mantenimiento y Paisajismo Profesional',
  description: 'Empresa líder en suministro de recurso humano, mantenimiento de planta física y paisajismo profesional. Especializados en servicios de mantenimiento para edificios y conjuntos residenciales, paisajismo, limpieza y actividades especializadas con personal capacitado y protocolos rigurosos.',
  keywords: 'recurso humano, suministro de personal, mantenimiento de planta física, paisajismo profesional, limpieza profesional, servicios de mantenimiento, gestión de personal, Colombia',
  generator: 'Next.js',
  openGraph: {
    title: 'SERVILEON LTDA - Suministro de Recurso Humano, Mantenimiento y Paisajismo',
    description: 'Empresa líder en suministro de recurso humano, mantenimiento de planta física y paisajismo profesional. Especializados en servicios de mantenimiento para edificios y conjuntos residenciales.',
    type: 'website',
    locale: 'es_CO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SERVILEON LTDA - Suministro de Recurso Humano, Mantenimiento y Paisajismo',
    description: 'Empresa líder en suministro de recurso humano, mantenimiento de planta física y paisajismo profesional.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${poppins.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/leon_logo.png" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-white min-h-screen">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
