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
  title: 'SERVILEON LTDA - Recurso Humano, vigilancia y control de Alta Gama',
  description: 'Empresa líder en recurso humano, vigilancia y control con 8 años de experiencia. Ofrecemos servicios de vigilancia armada, protección ejecutiva y monitoreo 24/7 con IA.',
  generator: 'Next.js',
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
