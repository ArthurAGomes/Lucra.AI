"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from "lucide-react"

// Dados simulados para o gráfico
const chartData = [
  { month: "Jan", value: 10000, change: 0 },
  { month: "Fev", value: 10500, change: 5 },
  { month: "Mar", value: 11200, change: 6.7 },
  { month: "Abr", value: 10800, change: -3.6 },
  { month: "Mai", value: 11500, change: 6.5 },
  { month: "Jun", value: 12200, change: 6.1 },
  { month: "Jul", value: 11800, change: -3.3 },
  { month: "Ago", value: 12500, change: 5.9 },
  { month: "Set", value: 13200, change: 5.6 },
  { month: "Out", value: 12800, change: -3.0 },
  { month: "Nov", value: 13500, change: 5.5 },
  { month: "Dez", value: 14200, change: 5.2 },
]

const maxValue = Math.max(...chartData.map(d => d.value))
const minValue = Math.min(...chartData.map(d => d.value))

export function PortfolioChart() {
  const totalReturn = ((chartData[chartData.length - 1].value - chartData[0].value) / chartData[0].value * 100).toFixed(1)
  const isPositive = parseFloat(totalReturn) >= 0

  return (
    <div className="space-y-6">
      {/* Estatísticas do gráfico */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="gradient-card hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Valor Atual</span>
            </div>
            <div className="text-2xl font-bold mt-1">
              R$ {chartData[chartData.length - 1].value.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <span className="text-sm font-medium">Retorno Total</span>
            </div>
            <div className={`text-2xl font-bold mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{totalReturn}%
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Volatilidade</span>
            </div>
            <div className="text-2xl font-bold mt-1">12.5%</div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico */}
      <div className="relative">
        <div className="flex items-end justify-between h-64 p-4 bg-gradient-to-b from-muted/20 to-transparent rounded-lg">
          {chartData.map((data, index) => {
            const height = ((data.value - minValue) / (maxValue - minValue)) * 100
            const isLatest = index === chartData.length - 1
            
            return (
              <div key={data.month} className="flex flex-col items-center">
                <div className="relative group">
                  <div
                    className={`w-8 rounded-t-sm transition-all duration-300 hover:opacity-80 ${
                      isLatest 
                        ? 'bg-gradient-to-t from-primary to-chart-1' 
                        : 'bg-gradient-to-t from-muted-foreground/30 to-muted-foreground/10'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-background border rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                    <div className="font-semibold">{data.month}</div>
                    <div>R$ {data.value.toLocaleString()}</div>
                    <div className={data.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {data.change >= 0 ? '+' : ''}{data.change}%
                    </div>
                  </div>
                </div>
                
                <span className="text-xs text-muted-foreground mt-2">{data.month}</span>
              </div>
            )
          })}
        </div>
        
        {/* Linha de tendência */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent" />
      </div>

      {/* Legenda */}
      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-muted-foreground/30 to-muted-foreground/10" />
          <span className="text-muted-foreground">Histórico</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-primary to-chart-1" />
          <span className="text-muted-foreground">Atual</span>
        </div>
      </div>

      {/* Análise rápida */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="gradient-card">
          <CardContent className="p-4">
            <h4 className="font-semibold mb-2">Melhor Mês</h4>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Junho</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                +6.1%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardContent className="p-4">
            <h4 className="font-semibold mb-2">Pior Mês</h4>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Abril</span>
              <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                -3.6%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
