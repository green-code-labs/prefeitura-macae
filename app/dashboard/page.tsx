"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LogOut, FileText, Clock, CheckCircle, Eye, Plus } from "lucide-react"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { signOut, getCurrentUser } from "@/lib/auth"
import { useRouter } from "next/navigation"

interface MinhasSolicitacoes {
  id: string
  protocolo: string
  secretaria_id: string
  tipo_servico_id: string
  status: "pendente" | "em_andamento" | "concluido" | "cancelado"
  observacoes_admin: string | null
  created_at: string
  secretarias: {
    nome: string
  }
  tipos_servicos: {
    nome: string
  }
}

const statusColors = {
  pendente: "bg-yellow-100 text-yellow-800",
  em_andamento: "bg-blue-100 text-blue-800",
  concluido: "bg-green-100 text-green-800",
  cancelado: "bg-red-100 text-red-800",
}

const statusLabels = {
  pendente: "Pendente",
  em_andamento: "Em Andamento",
  concluido: "Concluído",
  cancelado: "Cancelado",
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [solicitacoes, setSolicitacoes] = useState<MinhasSolicitacoes[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push("/login")
        return
      }
      setUser(currentUser)
      await loadMinhasSolicitacoes(currentUser.id)
    } catch (error) {
      router.push("/login")
    }
  }

  const loadMinhasSolicitacoes = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("solicitacoes")
        .select(`
          *,
          secretarias (nome),
          tipos_servicos (nome)
        `)
        .eq("usuario_id", userId)
        .order("created_at", { ascending: false })

      if (error) throw error
      setSolicitacoes(data || [])
    } catch (error) {
      console.error("Erro ao carregar solicitações:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut()
    router.push("/")
  }

  const getStats = () => {
    const total = solicitacoes.length
    const pendentes = solicitacoes.filter((s) => s.status === "pendente").length
    const emAndamento = solicitacoes.filter((s) => s.status === "em_andamento").length
    const concluidos = solicitacoes.filter((s) => s.status === "concluido").length

    return { total, pendentes, emAndamento, concluidos }
  }

  const stats = getStats()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/logo-nova-friburgo.png"
                alt="Logo Macaé"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-800">Meu Painel</h1>
                <p className="text-sm text-gray-600">Acompanhe suas solicitações</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Olá, {user?.userData.nome}</span>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Solicitações</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pendentes}</div>
              <p className="text-xs text-muted-foreground">Aguardando</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.emAndamento}</div>
              <p className="text-xs text-muted-foreground">Processando</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.concluidos}</div>
              <p className="text-xs text-muted-foreground">Finalizados</p>
            </CardContent>
          </Card>
        </div>

        {/* Ações Rápidas */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Acesse rapidamente os serviços mais utilizados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Solicitação
                </Button>
              </Link>
              <Link href="/noticias">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Notícias
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start bg-transparent" disabled>
                <FileText className="w-4 h-4 mr-2" />
                Meus Documentos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Minhas Solicitações */}
        <Card>
          <CardHeader>
            <CardTitle>Minhas Solicitações ({solicitacoes.length})</CardTitle>
            <CardDescription>Acompanhe o status das suas solicitações</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {solicitacoes.map((solicitacao) => (
                <div key={solicitacao.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono">
                        {solicitacao.protocolo}
                      </Badge>
                      <Badge className={statusColors[solicitacao.status]}>{statusLabels[solicitacao.status]}</Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(solicitacao.created_at).toLocaleDateString("pt-BR")}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Secretaria</p>
                      <p className="text-sm text-gray-600">{solicitacao.secretarias.nome}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Serviço</p>
                      <p className="text-sm text-gray-600">{solicitacao.tipos_servicos.nome}</p>
                    </div>
                  </div>

                  {solicitacao.observacoes_admin && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                      <p className="text-sm font-medium text-blue-800 mb-1">Observações da Secretaria:</p>
                      <p className="text-sm text-blue-700">{solicitacao.observacoes_admin}</p>
                    </div>
                  )}
                </div>
              ))}

              {solicitacoes.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="mb-4">Você ainda não fez nenhuma solicitação</p>
                  <Link href="/">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Fazer primeira solicitação
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
