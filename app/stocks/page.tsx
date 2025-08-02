"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Search, TrendingUp, TrendingDown, Star } from "lucide-react"
import { useState } from "react"

const stocksData = [
  { symbol: "PETR4", name: "Petrobras", price: 32.45, change: 2.5, volume: "125M", marketCap: "421B" },
  { symbol: "VALE3", name: "Vale", price: 68.9, change: -1.2, volume: "89M", marketCap: "312B" },
  { symbol: "ITUB4", name: "Itaú Unibanco", price: 25.8, change: 1.8, volume: "156M", marketCap: "245B" },
  { symbol: "BBDC4", name: "Bradesco", price: 18.45, change: 0.5, volume: "98M", marketCap: "189B" },
  { symbol: "ABEV3", name: "Ambev", price: 14.2, change: -0.8, volume: "67M", marketCap: "223B" },
  { symbol: "WEGE3", name: "WEG", price: 45.6, change: 3.2, volume: "45M", marketCap: "156B" },
  { symbol: "MGLU3", name: "Magazine Luiza", price: 8.9, change: -2.1, volume: "78M", marketCap: "59B" },
  { symbol: "RENT3", name: "Localiza", price: 52.3, change: 1.5, volume: "34M", marketCap: "67B" },
]

export default function StocksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [watchlist, setWatchlist] = useState<string[]>(["PETR4", "VALE3"])

  const filteredStocks = stocksData.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleWatchlist = (symbol: string) => {
    setWatchlist((prev) => (prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]))
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold">Bolsa de Valores</h1>
            <p className="text-muted-foreground">Acompanhe as principais ações do mercado brasileiro</p>
          </div>
        </div>
      </div>

      {/* Barra de Pesquisa */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar ações por código ou nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Ações */}
      <Card>
        <CardHeader>
          <CardTitle>Principais Ações</CardTitle>
          <CardDescription>Cotações em tempo real do mercado brasileiro</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStocks.map((stock) => (
              <div
                key={stock.symbol}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" onClick={() => toggleWatchlist(stock.symbol)} className="p-1">
                    <Star
                      className={`h-4 w-4 ${watchlist.includes(stock.symbol) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                    />
                  </Button>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{stock.symbol}</span>
                      <Badge variant="outline">{stock.name}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Vol: {stock.volume} • Cap: R${stock.marketCap}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold">R$ {stock.price.toFixed(2)}</div>
                  <div
                    className={`flex items-center gap-1 text-sm ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {stock.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {stock.change >= 0 ? "+" : ""}
                    {stock.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Watchlist */}
      {watchlist.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Minha Lista de Acompanhamento</CardTitle>
            <CardDescription>Ações que você está monitorando</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {stocksData
                .filter((stock) => watchlist.includes(stock.symbol))
                .map((stock) => (
                  <Card key={stock.symbol}>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold">{stock.symbol}</span>
                        <Badge variant={stock.change >= 0 ? "default" : "destructive"}>
                          {stock.change >= 0 ? "+" : ""}
                          {stock.change}%
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold">R$ {stock.price.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">{stock.name}</div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
