import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata = {
  title: 'Checkers',
  description: 'A professional checkers game with matchmaking and friends.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans antialiased bg-slate-950 text-slate-50 min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
