import Chat from './components/Chat'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">RAG Chat System</h1>
      <Chat />
    </main>
  )
}