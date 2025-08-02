"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import {
  Settings,
  Moon,
  Sun,
  Monitor,
  Bell,
  Shield,
  Globe,
  Smartphone,
  Mail,
  MessageSquare,
  TrendingUp,
  DollarSign,
} from "lucide-react"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    priceAlerts: true,
    marketNews: true,
    portfolioUpdates: false,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold">Configurações</h1>
            <p className="text-muted-foreground">Gerencie suas preferências e configurações da aplicação</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Configurações Principais */}
        <div className="lg:col-span-2 space-y-6">
          {/* Aparência */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                  <Settings className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle>Aparência</CardTitle>
                  <CardDescription>Personalize a aparência da aplicação</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-medium">Tema</Label>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    onClick={() => setTheme("light")}
                    className="flex flex-col items-center gap-2 h-auto p-4"
                  >
                    <Sun className="h-5 w-5" />
                    <span className="text-sm">Claro</span>
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    onClick={() => setTheme("dark")}
                    className="flex flex-col items-center gap-2 h-auto p-4"
                  >
                    <Moon className="h-5 w-5" />
                    <span className="text-sm">Escuro</span>
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    onClick={() => setTheme("system")}
                    className="flex flex-col items-center gap-2 h-auto p-4"
                  >
                    <Monitor className="h-5 w-5" />
                    <span className="text-sm">Sistema</span>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Escolha entre tema claro, escuro ou seguir as configurações do sistema
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label className="text-base font-medium">Idioma</Label>
                <Select defaultValue="pt-br">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-br">🇧🇷 Português (Brasil)</SelectItem>
                    <SelectItem value="en-us">🇺🇸 English (US)</SelectItem>
                    <SelectItem value="es-es">🇪🇸 Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">Moeda</Label>
                <Select defaultValue="brl">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brl">R$ Real Brasileiro</SelectItem>
                    <SelectItem value="usd">$ Dólar Americano</SelectItem>
                    <SelectItem value="eur">€ Euro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notificações */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle>Notificações</CardTitle>
                  <CardDescription>Configure como você quer receber notificações</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-medium">Canais de Notificação</Label>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label htmlFor="email-notifications">Email</Label>
                        <p className="text-sm text-muted-foreground">Receber notificações por email</p>
                      </div>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label htmlFor="push-notifications">Push</Label>
                        <p className="text-sm text-muted-foreground">Notificações push no navegador</p>
                      </div>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notifications.push}
                      onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label htmlFor="sms-notifications">SMS</Label>
                        <p className="text-sm text-muted-foreground">Notificações por mensagem de texto</p>
                      </div>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={notifications.sms}
                      onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label className="text-base font-medium">Tipos de Notificação</Label>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <div>
                        <Label htmlFor="price-alerts">Alertas de Preço</Label>
                        <p className="text-sm text-muted-foreground">Quando ativos atingem preços definidos</p>
                      </div>
                    </div>
                    <Switch
                      id="price-alerts"
                      checked={notifications.priceAlerts}
                      onCheckedChange={(checked) => handleNotificationChange("priceAlerts", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <div>
                        <Label htmlFor="market-news">Notícias do Mercado</Label>
                        <p className="text-sm text-muted-foreground">Atualizações importantes do mercado</p>
                      </div>
                    </div>
                    <Switch
                      id="market-news"
                      checked={notifications.marketNews}
                      onCheckedChange={(checked) => handleNotificationChange("marketNews", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-purple-600" />
                      <div>
                        <Label htmlFor="portfolio-updates">Atualizações da Carteira</Label>
                        <p className="text-sm text-muted-foreground">Relatórios semanais de performance</p>
                      </div>
                    </div>
                    <Switch
                      id="portfolio-updates"
                      checked={notifications.portfolioUpdates}
                      onCheckedChange={(checked) => handleNotificationChange("portfolioUpdates", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacidade e Segurança */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle>Privacidade e Segurança</CardTitle>
                  <CardDescription>Gerencie suas configurações de segurança</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
                </div>
                <Button variant="outline" size="sm">
                  Configurar
                </Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Sessões Ativas</Label>
                  <p className="text-sm text-muted-foreground">Gerencie dispositivos conectados</p>
                </div>
                <Button variant="outline" size="sm">
                  Ver Sessões
                </Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Exportar Dados</Label>
                  <p className="text-sm text-muted-foreground">Baixe uma cópia dos seus dados</p>
                </div>
                <Button variant="outline" size="sm">
                  Exportar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumo das Configurações */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
              <CardDescription>Suas configurações atuais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Tema</span>
                <Badge variant="secondary" className="capitalize">
                  {theme === "system" ? "Sistema" : theme === "dark" ? "Escuro" : "Claro"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Idioma</span>
                <Badge variant="secondary">Português</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Moeda</span>
                <Badge variant="secondary">BRL</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Notificações</span>
                <Badge variant="secondary">{Object.values(notifications).filter(Boolean).length} ativas</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Suporte</CardTitle>
              <CardDescription>Precisa de ajuda?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Central de Ajuda
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Contatar Suporte
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Reportar Bug
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sobre</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Versão</span>
                <span>1.0.0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Última atualização</span>
                <span>Hoje</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Restaurar Padrões</Button>
        <Button>Salvar Configurações</Button>
      </div>
    </div>
  )
}
