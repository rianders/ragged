import { NextResponse } from 'next/server'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { FaissStore } from 'langchain/vectorstores/faiss'
import { RetrievalQAChain } from 'langchain/chains'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { message } = await req.json()

  try {
    // Fetch the latest RAG configuration
    const latestConfig = await prisma.ragConfig.findFirst({
      orderBy: { createdAt: 'desc' },
    })

    if (!latestConfig) {
      return NextResponse.json({ error: 'RAG configuration not found' }, { status: 404 })
    }

    // Initialize OpenAI chat model
    const model = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo',
      temperature: 0,
    })

    // Initialize embeddings
    const embeddings = new OpenAIEmbeddings()

    // Load the vector store
    const vectorStore = await FaissStore.load('path/to/faiss/index', embeddings)

    // Create a retrieval chain
    const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever())

    // Get the answer
    const response = await chain.call({ query: message })

    return NextResponse.json({ response: response.text })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

