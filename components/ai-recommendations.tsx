"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, TrendingUp, TrendingDown, Target, Zap, Lightbulb } from "lucide-react"

const recommendations = [
  {
    id: 1,
    title: "Diversificação Recomendada",
    description: "Considere adicionar mais ações de tecnologia para balancear seu portfólio",
    type: "diversification",
    priority: "high",
    impact: "+2.3%",
    icon: Target,
  },
  {
    id: 2,
    title: "Oportunidade de Compra",
    description: "PETR4 está em um nível de suporte interessante para compra",
    type: "opportunity",
    priority: "medium",
    impact: "+1.8%",
    icon: TrendingUp,
  },
  {
    id: 3,
    title: "Ajuste de Risco",
    description: "Considere reduzir posição em ativos de alto risco",
    type: "risk",
    priority: "high",
    impact: "-0.5%",
    icon: TrendingDown,
  },
  {
    id: 4,
    title: "Recomendação de Venda",
    description: "VALE3 atingiu o alvo de preço sugerido",
    type: "sell",
    priority: "medium",
    impact: "+3.2%",
    icon: Zap,
  },
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "diversification":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
    case "opportunity":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
    case "risk":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
    case "sell":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
  }
}

export function AIRecommendations() {
  return (
    <Card className="gradient-card hover-lift">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Recomendações da IA
        </CardTitle>
        <CardDescription>
          Análise inteligente baseada no seu perfil de investimento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {recommendations.map((recommendation) => {
            const IconComponent = recommendation.icon;
            return (
              <div
                key={recommendation.id}
                className="p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <IconComponent className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{recommendation.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getTypeColor(recommendation.type)}`}
                        >
                          {recommendation.type}
                        </Badge>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getPriorityColor(recommendation.priority)}`}
                        >
                          {recommendation.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${
                      recommendation.impact.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {recommendation.impact}
                    </div>
                    <div className="text-xs text-muted-foreground">impacto</div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {recommendation.description}
                </p>
                
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 gradient-bg hover:opacity-90 transition-all duration-200">
                    <Lightbulb className="h-3 w-3 mr-1" />
                    Aplicar
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Detalhes
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-chart-1/10 border border-primary/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">IA Ativa</h4>
              <p className="text-sm text-muted-foreground">
                Suas recomendações são atualizadas em tempo real baseadas no mercado
              </p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
              Online
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
