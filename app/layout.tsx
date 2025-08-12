import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/AuthContext"
import { ProtectedRoute } from "@/components/protected-route"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LucraAI - Seu Assistente de Investimentos",
  description: "Plataforma inteligente para gestão de investimentos com IA",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <ProtectedRoute>
              <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                  {children}
                </SidebarInset>
                <Toaster />
              </SidebarProvider>
            </ProtectedRoute>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
