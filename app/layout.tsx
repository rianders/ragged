import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'
import { TrpcProvider } from '@/components/providers/trpc-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RAG Chat System',
  description: 'A chat system using Retrieval-Augmented Generation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <TrpcProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </TrpcProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

