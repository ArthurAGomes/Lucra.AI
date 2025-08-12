"use client"

import { Home, TrendingUp, Bitcoin, Bot, User, Settings, LogOut, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Bolsa de Valores",
    url: "/stocks",
    icon: TrendingUp,
  },
  {
    title: "Criptomoedas",
    url: "/crypto",
    icon: Bitcoin,
  },
  {
    title: "Assistente IA",
    url: "/ai-chat",
    icon: Bot,
  },
]

export function AppSidebar() {
  const { user, logout } = useAuth();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
      logout();
    } finally {
      setLogoutLoading(false);
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Sidebar className="border-r bg-gradient-to-b from-background to-muted/20">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-bg text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
            IA
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
              LucraAI
            </h2>
            <p className="text-sm text-muted-foreground">Seu assistente financeiro</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Navegação
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      href={item.url} 
                      className="sidebar-hover flex items-center gap-3 w-full px-3 py-2 rounded-lg"
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="font-medium">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Conta
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    href="/profile" 
                    className="sidebar-hover flex items-center gap-3 w-full px-3 py-2 rounded-lg"
                  >
                    <User className="h-4 w-4" />
                    <span className="font-medium">
                      Perfil
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    href="/settings" 
                    className="sidebar-hover flex items-center gap-3 w-full px-3 py-2 rounded-lg"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="font-medium">
                      Configurações
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t bg-gradient-to-t from-muted/20 to-transparent">
        <div className="flex items-center gap-3 mb-3 p-3 rounded-lg bg-card/50 backdrop-blur-sm border">
          <Avatar className="h-8 w-8 ring-2 ring-primary/20">
            <AvatarImage src={user?.avatar || "/placeholder.svg?height=32&width=32"} />
            <AvatarFallback className="gradient-bg text-white font-semibold">
              {user ? getUserInitials(user.name) : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{user?.name || 'Usuário'}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email || 'email@exemplo.com'}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-start gap-2 hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
          onClick={handleLogout}
          disabled={logoutLoading}
        >
          {logoutLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          {logoutLoading ? 'Saindo...' : 'Sair'}
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
