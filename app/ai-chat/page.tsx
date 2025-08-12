"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Send, Bot, User, Sparkles, TrendingUp, AlertCircle, Target } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const quickSuggestions = [
  "Analise minha carteira atual",
  "Quais são as melhores ações para comprar agora?",
  "Como diversificar meus investimentos?",
  "Análise técnica do PETR4",
  "Tendências do mercado cripto",
  "Estratégias para renda fixa",
]

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! Sou seu assistente de investimentos com IA. Posso ajudá-lo com análises de mercado, sugestões de investimentos baseadas no seu perfil e responder dúvidas sobre finanças. Como posso ajudá-lo hoje?',
      timestamp: new Date()
    }
  ])
  
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: content.trim() }
          ]
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Erro HTTP: ${response.status} - ${errorText}`)
      }

      if (!response.body) {
        throw new Error('Resposta sem corpo')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ""

      // Criar mensagem do assistente vazia
      const assistantId = (Date.now() + 1).toString()
      setMessages(prev => [...prev, {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date()
      }])

      // Ler stream
      while (true) {
        const { done, value } = await reader.read()
        
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        console.log('Chunk recebido:', chunk) // Debug
        
        // Parse do formato SSE (Server-Sent Events)
        const lines = chunk.split('\n')
        for (const line of lines) {
          if (line.trim().startsWith('data: ')) {
            const dataStr = line.replace('data: ', '').trim()
            
            if (dataStr === '[DONE]') {
              console.log('Stream finalizado')
              break
            }
            
            if (dataStr && dataStr !== '') {
              try {
                const data = JSON.parse(dataStr)
                const content = data.choices?.[0]?.delta?.content
                
                console.log('Conteúdo extraído:', content) // Debug
                
                if (content) {
                  assistantContent += content
                  
                  // Atualizar mensagem do assistente
                  setMessages(prev => prev.map(msg => 
                    msg.id === assistantId 
                      ? { ...msg, content: assistantContent }
                      : msg
                  ))
                }
              } catch (e) {
                console.log('Erro ao fazer parse do JSON:', e, 'Data:', dataStr)
              }
            }
          }
        }
      }

      // Se não recebeu conteúdo via streaming, verificar se há conteúdo completo
      if (!assistantContent.trim()) {
        console.log('Nenhum conteúdo via streaming, tentando parse completo...')
        
        setMessages(prev => prev.map(msg => 
          msg.id === assistantId 
            ? { ...msg, content: 'Recebi uma resposta mas o conteúdo não foi processado corretamente. Tente novamente.' }
            : msg
        ))
      }

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      setError(error instanceof Error ? error.message : 'Erro desconhecido')
      
      // Adicionar mensagem de erro
      setMessages(prev => [...prev, {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: `Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}. Verifique o console para mais detalhes.`,
        timestamp: new Date()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleQuickSuggestion = (suggestion: string) => {
    sendMessage(suggestion)
  }

  // Rolagem automática para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-br from-purple-600 to-blue-600">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Assistente IA</h1>
              <p className="text-muted-foreground">Seu consultor financeiro inteligente</p>
            </div>
          </div>
        </div>
        <Badge variant="secondary" className={`${isLoading ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
          {isLoading ? 'Processando...' : 'Online'}
        </Badge>
      </div>

      <div className="flex-1 flex">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] rounded-lg p-4 ${
                    message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                {message.role === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex gap-3 justify-start">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-red-600 text-white">
                    <AlertCircle className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-800">
                    Desculpe, ocorreu um erro. Por favor, tente novamente.
                  </p>
                  <p className="text-xs text-red-600 mt-1">{error}</p>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="p-4 border-t">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Sugestões rápidas:</p>
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickSuggestion(suggestion)}
                    className="text-xs"
                    disabled={isLoading}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                placeholder="Digite sua pergunta sobre investimentos..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Sidebar with AI Insights */}
        <div className="w-80 border-l p-4 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Insights da IA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-xs font-medium">Mercado em Alta</p>
                  <p className="text-xs text-muted-foreground">Ibovespa +2.1% hoje</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-xs font-medium">Atenção PETR4</p>
                  <p className="text-xs text-muted-foreground">Volume acima da média</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Target className="h-4 w-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-xs font-medium">Oportunidade</p>
                  <p className="text-xs text-muted-foreground">WEGE3 próximo ao suporte</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Seu Perfil</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Risco:</span>
                  <Badge variant="secondary">Moderado</Badge>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Prazo:</span>
                  <span className="text-muted-foreground">Longo prazo</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Objetivo:</span>
                  <span className="text-muted-foreground">Crescimento</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}