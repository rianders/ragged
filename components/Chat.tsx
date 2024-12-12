'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useChat } from 'ai/react'
import { trpc } from '@/lib/trpc/client';

export default function Chat() {
  const { user } = useUser()
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const mutation = trpc.chatLog.create.useMutation()

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    handleSubmit(e)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      
      // Log the chat interaction
      await mutation.mutateAsync({
        userId: user?.id || 'anonymous',
        message: userMessage,
        response: data.response,
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="flex flex-col h-[500px] max-w-md mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg p-2 ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="p-4 border-t flex">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask a question..."
          className="flex-1 mr-2"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  )
}

