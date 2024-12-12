'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useUser } from '@clerk/nextjs'
import { trpc } from '@/lib/trpc/client'

const formSchema = z.object({
  llmProvider: z.string(),
  embeddingModel: z.string(),
  websiteUrl: z.string().url(),
})

export default function AdminDashboard() {
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      llmProvider: '',
      embeddingModel: '',
      websiteUrl: '',
    },
  })

  const mutation = trpc.ragConfig.create.useMutation()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      await mutation.mutateAsync(values)
      // Handle success (e.g., show a success message)
    } catch (error) {
      // Handle error (e.g., show an error message)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user || user.publicMetadata.role !== 'admin') {
    return <div>Access denied. Admin only.</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="llmProvider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LLM Provider</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select LLM provider" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="openai">OpenAI</SelectItem>
                    <SelectItem value="anthropic">Anthropic</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the LLM provider for your RAG system.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="embeddingModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Embedding Model</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., text-embedding-ada-002" {...field} />
                </FormControl>
                <FormDescription>
                  Specify the embedding model to use.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="websiteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the URL of the website to be used in the RAG system.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Configuration'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

