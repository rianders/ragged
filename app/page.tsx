import { auth } from '@clerk/nextjs'
import { Chat } from "@/components/chat"
import Link from 'next/link'
import { DarkModeToggle } from "@/components/dark-mode-toggle"

export default function Home() {
  const { userId } = auth()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DarkModeToggle className="absolute top-4 right-4" />
      {userId ? (
        <Chat />
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to RAG Chat System</h1>
          <p className="mb-4">Please sign in to start chatting.</p>
          <Link href="/sign-in" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      )}
    </main>
  )
}

