"use client"

import { useState } from "react"
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

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Olá! Sou seu assistente de investimentos com IA. Posso ajudá-lo com análises de mercado, sugestões de investimentos baseadas no seu perfil e responder dúvidas sobre finanças. Como posso ajudá-lo hoje?",
    timestamp: new Date(),
  },
]

const quickSuggestions = [
  "Analise minha carteira atual",
  "Quais são as melhores ações para comprar agora?",
  "Como diversificar meus investimentos?",
  "Análise técnica do PETR4",
  "Tendências do mercado cripto",
  "Estratégias para renda fixa",
]

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simular resposta da IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateAIResponse(content),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("carteira") || input.includes("portfolio")) {
      return "Analisando sua carteira atual... Com base nos dados, vejo que você tem uma boa diversificação entre ações (70%) e renda fixa (30%). Suas principais posições em PETR4 e VALE3 estão performando bem. Recomendo considerar adicionar algumas ações de tecnologia como WEGE3 para melhor diversificação setorial."
    }

    if (input.includes("ações") || input.includes("comprar")) {
      return "Com base na análise atual do mercado e seu perfil conservador-moderado, recomendo: 1) WEGE3 - forte crescimento no setor industrial, 2) ITUB4 - sólido fundamentalista bancário, 3) RENT3 - setor de locação em expansão. Lembre-se sempre de fazer sua própria análise antes de investir."
    }

    if (input.includes("diversificar")) {
      return "Para diversificar seus investimentos, considere: 1) Diferentes setores (tecnologia, saúde, consumo), 2) Classes de ativos (ações, FIIs, renda fixa), 3) Geografia (mercado nacional e internacional), 4) Prazos (curto, médio e longo prazo). Sua carteira atual está 70% em ações - considere aumentar a posição em FIIs para 10-15%."
    }

    if (input.includes("petr4")) {
      return "Análise técnica PETR4: A ação está em tendência de alta, rompeu resistência em R$ 32,00. Indicadores: RSI em 65 (neutro), MACD positivo, volume acima da média. Suporte em R$ 30,50, resistência em R$ 34,00. Cenário positivo para curto prazo, mas atenção aos fatores macroeconômicos do petróleo."
    }

    if (input.includes("cripto")) {
      return "Mercado cripto está em momento de consolidação. Bitcoin testando suporte em $42k, Ethereum mostrando força relativa. Para seu perfil, recomendo máximo 5-10% da carteira em crypto, focando em BTC e ETH. Altcoins como SOL e AVAX podem ser interessantes para pequenas posições especulativas."
    }

    return "Entendi sua pergunta. Com base na análise de mercado atual e seu perfil de investidor, posso fornecer insights personalizados. Você gostaria que eu analise algum ativo específico ou precisa de orientações sobre estratégias de investimento? Estou aqui para ajudar com análises técnicas, fundamentalistas e sugestões baseadas em IA."
  }

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
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Online
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
                  <p className="text-sm">{message.content}</p>
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
                    onClick={() => handleSendMessage(suggestion)}
                    className="text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Digite sua pergunta sobre investimentos..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage(input)}
                disabled={isLoading}
              />
              <Button onClick={() => handleSendMessage(input)} disabled={isLoading || !input.trim()} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
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
