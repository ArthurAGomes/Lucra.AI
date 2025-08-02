"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Search, TrendingUp, TrendingDown, Star, Bitcoin } from "lucide-react"
import { useState } from "react"

const cryptoData = [
  { symbol: "BTC", name: "Bitcoin", price: 43250.0, change: 2.8, volume: "28.5B", marketCap: "847B" },
  { symbol: "ETH", name: "Ethereum", price: 2650.0, change: 1.5, volume: "15.2B", marketCap: "318B" },
  { symbol: "BNB", name: "Binance Coin", price: 315.8, change: -0.8, volume: "1.8B", marketCap: "47B" },
  { symbol: "SOL", name: "Solana", price: 98.45, change: 4.2, volume: "2.1B", marketCap: "42B" },
  { symbol: "ADA", name: "Cardano", price: 0.52, change: -1.2, volume: "890M", marketCap: "18B" },
  { symbol: "AVAX", name: "Avalanche", price: 36.9, change: 3.1, volume: "650M", marketCap: "14B" },
  { symbol: "DOT", name: "Polkadot", price: 7.25, change: -2.5, volume: "420M", marketCap: "9B" },
  { symbol: "MATIC", name: "Polygon", price: 0.89, change: 1.8, volume: "380M", marketCap: "8B" },
]

export default function CryptoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [watchlist, setWatchlist] = useState<string[]>(["BTC", "ETH"])

  const filteredCrypto = cryptoData.filter(
    (crypto) =>
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()),
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
            <h1 className="text-3xl font-bold">Criptomoedas</h1>
            <p className="text-muted-foreground">Acompanhe as principais criptomoedas do mercado</p>
          </div>
        </div>
      </div>

      {/* Cards de Resumo Crypto */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Cap Total</CardTitle>
            <Bitcoin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.7T</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +3.2% 24h
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dominância BTC</CardTitle>
            <Bitcoin className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">49.8%</div>
            <p className="text-xs text-muted-foreground">Do mercado total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volume 24h</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$89.5B</div>
            <p className="text-xs text-muted-foreground">Negociações globais</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fear & Greed</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">72</div>
            <p className="text-xs text-muted-foreground">Ganância</p>
          </CardContent>
        </Card>
      </div>

      {/* Barra de Pesquisa */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar criptomoedas por símbolo ou nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Criptomoedas */}
      <Card>
        <CardHeader>
          <CardTitle>Top Criptomoedas</CardTitle>
          <CardDescription>Cotações em tempo real das principais criptomoedas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCrypto.map((crypto) => (
              <div
                key={crypto.symbol}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" onClick={() => toggleWatchlist(crypto.symbol)} className="p-1">
                    <Star
                      className={`h-4 w-4 ${watchlist.includes(crypto.symbol) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                    />
                  </Button>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold">
                      {crypto.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{crypto.symbol}</span>
                        <Badge variant="outline">{crypto.name}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Vol: ${crypto.volume} • Cap: ${crypto.marketCap}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold">
                    ${crypto.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm ${crypto.change >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {crypto.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {crypto.change >= 0 ? "+" : ""}
                    {crypto.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Watchlist Crypto */}
      {watchlist.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Minha Lista de Criptomoedas</CardTitle>
            <CardDescription>Criptomoedas que você está monitorando</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cryptoData
                .filter((crypto) => watchlist.includes(crypto.symbol))
                .map((crypto) => (
                  <Card key={crypto.symbol}>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold">
                            {crypto.symbol.slice(0, 2)}
                          </div>
                          <span className="font-bold">{crypto.symbol}</span>
                        </div>
                        <Badge variant={crypto.change >= 0 ? "default" : "destructive"}>
                          {crypto.change >= 0 ? "+" : ""}
                          {crypto.change}%
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold">
                        ${crypto.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-sm text-muted-foreground">{crypto.name}</div>
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
