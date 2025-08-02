"use client"

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpIcon, TrendingUp, DollarSign, PieChart, BarChart3, Plus, Loader2, Sparkles } from "lucide-react"
import { PortfolioChart } from "@/components/portfolio-chart"
import { AIRecommendations } from "@/components/ai-recommendations"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { AddPortfolioItem } from "@/components/add-portfolio-item"
import { Skeleton } from "@/components/ui/skeleton"

interface PortfolioItem {
  _id: string;
  name: string;
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  totalValue: number;
  change: number;
  allocation: number;
  type: string;
}

interface PortfolioData {
  portfolio: PortfolioItem[];
  totalValue: number;
  totalItems: number;
}

export default function HomePage() {
  const { user, token } = useAuth();
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (token) {
      fetchPortfolio();
    }
  }, [token]);

  const fetchPortfolio = async () => {
    try {
      setRefreshing(true);
      const response = await fetch('/api/portfolio', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPortfolioData(data);
      }
    } catch (error) {
      console.error('Erro ao buscar portfólio:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleAddItem = async (itemData: any) => {
    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(itemData),
      });

      if (response.ok) {
        await fetchPortfolio();
        setShowAddModal(false);
      } else {
        const error = await response.json();
        throw new Error(error.error);
      }
    } catch (error: any) {
      console.error('Erro ao adicionar item:', error);
      alert(error.message);
    }
  };

  // Loading skeleton para os cards
  const LoadingCard = () => (
    <Card className="gradient-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-3 w-20" />
      </CardContent>
    </Card>
  );

  // Loading skeleton para o portfólio
  const LoadingPortfolioItem = () => (
    <div className="flex items-center justify-between p-2">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-5 w-12" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-8" />
        </div>
      </div>
    </div>
  );

  const portfolioItems = portfolioData?.portfolio || [];
  const totalValue = portfolioData?.totalValue || 0;

  return (
    <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="flex items-center justify-between animate-fade-in">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground">Bem-vindo de volta, {user?.name}! 👋</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={() => setShowAddModal(true)} 
            disabled={loading}
            className="gradient-bg hover:opacity-90 transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Ativo
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchPortfolio}
            disabled={refreshing}
            className="hover:bg-primary/10 transition-all duration-200"
          >
            {refreshing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Atualizar'
            )}
          </Button>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Última atualização</p>
            <p className="text-sm font-medium">{new Date().toLocaleString("pt-BR")}</p>
          </div>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          <>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </>
        ) : (
          <>
            <Card className="gradient-card hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </div>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                  +2.1% este mês
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rentabilidade</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+12.5%</div>
                <p className="text-xs text-muted-foreground">Últimos 12 meses</p>
              </CardContent>
            </Card>

            <Card className="gradient-card hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ativos</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{portfolioItems.length}</div>
                <p className="text-xs text-muted-foreground">Diversificados</p>
              </CardContent>
            </Card>

            <Card className="gradient-card hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Risco</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Moderado</div>
                <p className="text-xs text-muted-foreground">Perfil conservador</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Gráfico de Rentabilidade */}
        <Card className="lg:col-span-2 gradient-card hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Evolução da Carteira
            </CardTitle>
            <CardDescription>Rentabilidade dos últimos 12 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <PortfolioChart />
          </CardContent>
        </Card>

        {/* Carteira de Investimentos */}
        <Card className="gradient-card hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Minha Carteira
            </CardTitle>
            <CardDescription>Distribuição dos investimentos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <>
                <LoadingPortfolioItem />
                <LoadingPortfolioItem />
                <LoadingPortfolioItem />
                <LoadingPortfolioItem />
                <LoadingPortfolioItem />
              </>
            ) : portfolioItems.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-bg flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <p className="text-muted-foreground mb-4">Nenhum ativo adicionado ainda</p>
                <Button 
                  onClick={() => setShowAddModal(true)} 
                  variant="outline"
                  className="gradient-border"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Primeiro Ativo
                </Button>
              </div>
            ) : (
              portfolioItems.map((item) => (
                <div key={item._id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-200">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.name}</span>
                      <Badge variant={item.change >= 0 ? "default" : "destructive"}>
                        {item.change >= 0 ? "+" : ""}
                        {item.change.toFixed(2)}%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{item.totalValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                      <span>{item.allocation.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recomendações da IA */}
      <AIRecommendations />

      {/* Modal para adicionar item */}
      {showAddModal && (
        <AddPortfolioItem
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddItem}
        />
      )}
    </div>
  )
}
