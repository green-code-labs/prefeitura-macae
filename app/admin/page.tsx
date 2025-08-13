"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileText,
  Clock,
  CheckCircle,
  Search,
  Eye,
  MessageSquare,
  LogOut,
  BarChart3,
  HelpCircle,
  Phone,
  Mail,
  Monitor,
  TrendingUp,
  Users,
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface Solicitacao {
  id: string
  protocolo: string
  usuario_id: string
  secretaria_id: string
  tipo_servico_id: string
  dados_formulario: any
  status: "pendente" | "em_andamento" | "concluido" | "cancelado"
  observacoes_admin: string | null
  created_at: string
  usuarios: {
    nome: string
    email: string
    telefone: string
  }
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

const secretariaColors = {
  animal: "bg-green-500",
  ambiente: "bg-green-600",
  "servicos-publicos": "bg-blue-500",
  desenvolvimento: "bg-blue-600",
  obras: "bg-orange-500",
  "assistencia-social": "bg-purple-500",
  esporte: "bg-yellow-500",
  saude: "bg-red-500",
  fazenda: "bg-indigo-500",
}

const secretariaLabels = {
  animal: "Animal",
  ambiente: "Ambiente",
  "servicos-publicos": "Serviços Públicos",
  desenvolvimento: "Desenvolvimento",
  obras: "Obras",
  "assistencia-social": "Assistência Social",
  esporte: "Esporte",
  saude: "Saúde",
  fazenda: "Fazenda",
}

// Dados fictícios para demonstração
const solicitacoesFicticias: Solicitacao[] = [
  {
    id: "1",
    protocolo: "NF-ANI-001234",
    usuario_id: "user1",
    secretaria_id: "animal",
    tipo_servico_id: "animal-denuncia",
    dados_formulario: {
      tipo: "Maus-tratos",
      localizacao: "Rua das Flores, 123 - Centro",
      descricao: "Animal sendo maltratado no quintal, sem água nem comida há dias",
      contato: "(22) 99999-9999",
    },
    status: "pendente",
    observacoes_admin: null,
    created_at: "2024-01-15T10:30:00Z",
    usuarios: {
      nome: "Maria Silva Santos",
      email: "maria.santos@email.com",
      telefone: "(22) 99999-9999",
    },
    secretarias: {
      nome: "Secretaria Animal",
    },
    tipos_servicos: {
      nome: "Denúncia de Maus-tratos",
    },
  },
  {
    id: "2",
    protocolo: "NF-ANI-001235",
    usuario_id: "user2",
    secretaria_id: "animal",
    tipo_servico_id: "animal-castracao",
    dados_formulario: {
      nome: "João Silva",
      cpf: "123.456.789-00",
      telefone: "(22) 98888-8888",
      endereco: "Rua A, 456 - Olaria",
      animal_nome: "Rex",
      animal_tipo: "Cão",
      animal_sexo: "Macho",
      animal_idade: "3 anos",
    },
    status: "em_andamento",
    observacoes_admin: "Solicitação aprovada. Agendamento para 25/01/2024 às 14h.",
    created_at: "2024-01-12T14:20:00Z",
    usuarios: {
      nome: "João Silva Oliveira",
      email: "joao.oliveira@email.com",
      telefone: "(22) 98888-8888",
    },
    secretarias: {
      nome: "Secretaria Animal",
    },
    tipos_servicos: {
      nome: "Solicitação de Castração",
    },
  },
  {
    id: "3",
    protocolo: "NF-SER-001236",
    usuario_id: "user3",
    secretaria_id: "servicos-publicos",
    tipo_servico_id: "servicos-iluminacao",
    dados_formulario: {
      endereco: "Praça Central, em frente ao Banco do Brasil",
      tipo_problema: "Lâmpada queimada",
      descricao: "Poste de iluminação sem funcionar há 3 dias, deixando a área escura",
      urgencia: "Alta",
    },
    status: "concluido",
    observacoes_admin:
      "Problema resolvido. Lâmpada LED substituída em 18/01/2024. Equipe técnica verificou toda a rede elétrica da praça.",
    created_at: "2024-01-10T09:15:00Z",
    usuarios: {
      nome: "Ana Paula Costa",
      email: "ana.costa@email.com",
      telefone: "(22) 97777-7777",
    },
    secretarias: {
      nome: "Sec. Serviços Públicos",
    },
    tipos_servicos: {
      nome: "Problema na Iluminação",
    },
  },
  {
    id: "4",
    protocolo: "NF-AMB-001237",
    usuario_id: "user4",
    secretaria_id: "ambiente",
    tipo_servico_id: "ambiente-alvara",
    dados_formulario: {
      nome_empresa: "Padaria Pão Dourado Ltda",
      cnpj: "12.345.678/0001-90",
      endereco_empresa: "Rua Comercial, 789 - Centro",
      atividade: "Panificação e confeitaria com venda de produtos alimentícios",
      responsavel_tecnico: "Carlos Eduardo Santos",
      art_numero: "RJ20240001234",
    },
    status: "em_andamento",
    observacoes_admin: "Documentação em análise. Aguardando vistoria técnica agendada para 22/01/2024.",
    created_at: "2024-01-08T16:45:00Z",
    usuarios: {
      nome: "Carlos Eduardo Santos",
      email: "carlos.santos@padariapao.com",
      telefone: "(22) 96666-6666",
    },
    secretarias: {
      nome: "Sec. Ambiente",
    },
    tipos_servicos: {
      nome: "Solicitação de Alvará Ambiental",
    },
  },
  {
    id: "5",
    protocolo: "NF-SER-001238",
    usuario_id: "user5",
    secretaria_id: "servicos-publicos",
    tipo_servico_id: "servicos-poda",
    dados_formulario: {
      endereco: "Rua das Palmeiras, 321 - Conselheiro Paulino",
      tipo_arvore: "Sibipiruna",
      motivo: "Galhos na fiação",
      descricao: "Árvore de grande porte com galhos tocando na rede elétrica, risco de curto-circuito",
    },
    status: "pendente",
    observacoes_admin: null,
    created_at: "2024-01-14T11:30:00Z",
    usuarios: {
      nome: "Roberto Mendes",
      email: "roberto.mendes@email.com",
      telefone: "(22) 95555-5555",
    },
    secretarias: {
      nome: "Sec. Serviços Públicos",
    },
    tipos_servicos: {
      nome: "Solicitação de Poda",
    },
  },
  {
    id: "6",
    protocolo: "NF-ANI-001239",
    usuario_id: "user6",
    secretaria_id: "animal",
    tipo_servico_id: "animal-denuncia",
    dados_formulario: {
      tipo: "Abandono",
      localizacao: "Estrada Velha de Teresópolis, km 5",
      descricao: "Cão abandonado na estrada, aparenta estar ferido e desnutrido",
      contato: "(22) 94444-4444",
    },
    status: "em_andamento",
    observacoes_admin: "Equipe de resgate acionada. Animal foi recolhido e está recebendo cuidados veterinários.",
    created_at: "2024-01-13T08:20:00Z",
    usuarios: {
      nome: "Fernanda Lima",
      email: "fernanda.lima@email.com",
      telefone: "(22) 94444-4444",
    },
    secretarias: {
      nome: "Secretaria Animal",
    },
    tipos_servicos: {
      nome: "Denúncia de Maus-tratos",
    },
  },
  {
    id: "7",
    protocolo: "NF-AMB-001240",
    usuario_id: "user7",
    secretaria_id: "ambiente",
    tipo_servico_id: "ambiente-alvara",
    dados_formulario: {
      nome_empresa: "Oficina Mecânica do Zé",
      cnpj: "98.765.432/0001-10",
      endereco_empresa: "Av. Industrial, 456 - Distrito Industrial",
      atividade: "Serviços de manutenção e reparo de veículos automotores",
      responsavel_tecnico: "José Carlos Ferreira",
      art_numero: "RJ20240001235",
    },
    status: "cancelado",
    observacoes_admin: "Solicitação cancelada a pedido do requerente. Empresa mudou de endereço.",
    created_at: "2024-01-05T13:10:00Z",
    usuarios: {
      nome: "José Carlos Ferreira",
      email: "ze.oficina@email.com",
      telefone: "(22) 93333-3333",
    },
    secretarias: {
      nome: "Sec. Ambiente",
    },
    tipos_servicos: {
      nome: "Solicitação de Alvará Ambiental",
    },
  },
  {
    id: "8",
    protocolo: "NF-SER-001241",
    usuario_id: "user8",
    secretaria_id: "servicos-publicos",
    tipo_servico_id: "servicos-iluminacao",
    dados_formulario: {
      endereco: "Rua São João, altura do número 150 - São Geraldo",
      tipo_problema: "Poste danificado",
      descricao: "Poste inclinado após temporal, risco de queda",
      urgencia: "Alta",
    },
    status: "concluido",
    observacoes_admin: "Poste substituído em caráter de urgência. Serviço concluído em 16/01/2024.",
    created_at: "2024-01-09T07:45:00Z",
    usuarios: {
      nome: "Luiza Pereira",
      email: "luiza.pereira@email.com",
      telefone: "(22) 92222-2222",
    },
    secretarias: {
      nome: "Sec. Serviços Públicos",
    },
    tipos_servicos: {
      nome: "Problema na Iluminação",
    },
  },
]

// Dados para gráficos
const dadosGraficoMensal = [
  { mes: "Jan", chamados: 45, concluidos: 38 },
  { mes: "Fev", chamados: 52, concluidos: 45 },
  { mes: "Mar", chamados: 48, concluidos: 42 },
  { mes: "Abr", chamados: 61, concluidos: 55 },
  { mes: "Mai", chamados: 55, concluidos: 48 },
  { mes: "Jun", chamados: 67, concluidos: 60 },
]

const dadosGraficoPizza = [
  { name: "Animal", value: 35, color: "#10b981" },
  { name: "Serviços Públicos", value: 28, color: "#3b82f6" },
  { name: "Ambiente", value: 20, color: "#059669" },
  { name: "Obras", value: 10, color: "#f97316" },
  { name: "Outros", value: 7, color: "#8b5cf6" },
]

const COLORS = ["#10b981", "#3b82f6", "#059669", "#f97316", "#8b5cf6"]

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>(solicitacoesFicticias)
  const [filteredSolicitacoes, setFilteredSolicitacoes] = useState<Solicitacao[]>(solicitacoesFicticias)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [secretariaFilter, setSecretariaFilter] = useState("todas")
  const [selectedSolicitacao, setSelectedSolicitacao] = useState<Solicitacao | null>(null)
  const [observacoes, setObservacoes] = useState("")
  const [novoStatus, setNovoStatus] = useState("")
  const [showSupport, setShowSupport] = useState(false)
  const [supportMessage, setSupportMessage] = useState("")
  const [supportSent, setSupportSent] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    filterSolicitacoes()
  }, [solicitacoes, searchTerm, statusFilter, secretariaFilter])

  const checkAuth = async () => {
    // Criar usuário mock para demonstração
    setUser({
      id: "admin-demo",
      userData: {
        nome: "Administrador Demo",
        tipo_usuario: "admin",
        secretaria_id: null,
      },
    })
  }

  const filterSolicitacoes = () => {
    let filtered = solicitacoes

    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
          s.protocolo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.usuarios.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.usuarios.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "todos") {
      filtered = filtered.filter((s) => s.status === statusFilter)
    }

    if (secretariaFilter !== "todas") {
      filtered = filtered.filter((s) => s.secretaria_id === secretariaFilter)
    }

    setFilteredSolicitacoes(filtered)
  }

  const updateSolicitacao = async (id: string, updates: any) => {
    try {
      // Simular atualização local para demo
      setSolicitacoes((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updates, updated_at: new Date().toISOString() } : s)),
      )

      setSelectedSolicitacao(null)
      setObservacoes("")
      setNovoStatus("")
    } catch (error) {
      console.error("Erro ao atualizar solicitação:", error)
    }
  }

  const handleLogout = async () => {
    router.push("/")
  }

  const handleSupportSubmit = () => {
    setSupportSent(true)
    setTimeout(() => {
      setShowSupport(false)
      setSupportSent(false)
      setSupportMessage("")
    }, 2000)
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
                <h1 className="text-xl font-bold text-gray-800">Painel Administrativo</h1>
                <p className="text-sm text-gray-600">
                  {user?.userData.tipo_usuario === "admin"
                    ? "Administrador Geral"
                    : `Operador - ${user?.userData.secretaria_id}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowSupport(true)}
                className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Suporte TI
              </Button>
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
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
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

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Chamados por Mês
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dadosGraficoMensal}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="chamados" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="concluidos" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Chamados por Secretaria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dadosGraficoPizza}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dadosGraficoPizza.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por protocolo, nome ou email..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="em_andamento">Em Andamento</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>

              <Select value={secretariaFilter} onValueChange={setSecretariaFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Secretaria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as Secretarias</SelectItem>
                  <SelectItem value="animal">Secretaria Animal</SelectItem>
                  <SelectItem value="ambiente">Sec. Ambiente</SelectItem>
                  <SelectItem value="servicos-publicos">Sec. Serviços Públicos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Solicitações */}
        <Card>
          <CardHeader>
            <CardTitle>Solicitações ({filteredSolicitacoes.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredSolicitacoes.map((solicitacao) => (
                <div key={solicitacao.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono">
                        {solicitacao.protocolo}
                      </Badge>
                      <Badge className={statusColors[solicitacao.status]}>{statusLabels[solicitacao.status]}</Badge>
                      <Badge
                        variant="outline"
                        className={`${secretariaColors[solicitacao.secretaria_id as keyof typeof secretariaColors]} text-white border-0`}
                      >
                        {secretariaLabels[solicitacao.secretaria_id as keyof typeof secretariaLabels]}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(solicitacao.created_at).toLocaleDateString("pt-BR")}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Cidadão</p>
                      <p className="text-sm text-gray-600">{solicitacao.usuarios.nome}</p>
                      <p className="text-xs text-gray-500">{solicitacao.usuarios.email}</p>
                    </div>
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
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                      <p className="text-sm font-medium text-blue-800 mb-1">Observações:</p>
                      <p className="text-sm text-blue-700">{solicitacao.observacoes_admin}</p>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedSolicitacao(solicitacao)
                            setObservacoes(solicitacao.observacoes_admin || "")
                            setNovoStatus(solicitacao.status)
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Detalhes
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Detalhes da Solicitação</DialogTitle>
                          <DialogDescription>Protocolo: {selectedSolicitacao?.protocolo}</DialogDescription>
                        </DialogHeader>

                        {selectedSolicitacao && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">Informações do Cidadão</h4>
                                <p>
                                  <strong>Nome:</strong> {selectedSolicitacao.usuarios.nome}
                                </p>
                                <p>
                                  <strong>Email:</strong> {selectedSolicitacao.usuarios.email}
                                </p>
                                <p>
                                  <strong>Telefone:</strong> {selectedSolicitacao.usuarios.telefone}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Informações do Serviço</h4>
                                <p>
                                  <strong>Secretaria:</strong> {selectedSolicitacao.secretarias.nome}
                                </p>
                                <p>
                                  <strong>Serviço:</strong> {selectedSolicitacao.tipos_servicos.nome}
                                </p>
                                <p>
                                  <strong>Data:</strong>{" "}
                                  {new Date(selectedSolicitacao.created_at).toLocaleString("pt-BR")}
                                </p>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2">Dados do Formulário</h4>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                {Object.entries(selectedSolicitacao.dados_formulario).map(([key, value]) => (
                                  <div key={key} className="mb-2">
                                    <strong className="capitalize">{key.replace("_", " ")}:</strong> {String(value)}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-2">Status</label>
                                <Select value={novoStatus} onValueChange={setNovoStatus}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pendente">Pendente</SelectItem>
                                    <SelectItem value="em_andamento">Em Andamento</SelectItem>
                                    <SelectItem value="concluido">Concluído</SelectItem>
                                    <SelectItem value="cancelado">Cancelado</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2">Observações</label>
                              <Textarea
                                placeholder="Adicione observações sobre o andamento..."
                                value={observacoes}
                                onChange={(e) => setObservacoes(e.target.value)}
                                rows={4}
                              />
                            </div>

                            <div className="flex justify-end gap-2">
                              <Button
                                onClick={() =>
                                  updateSolicitacao(selectedSolicitacao.id, {
                                    status: novoStatus,
                                    observacoes_admin: observacoes,
                                    operador_id: user.id,
                                  })
                                }
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Atualizar
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}

              {filteredSolicitacoes.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma solicitação encontrada</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Modal de Suporte TI */}
      <Dialog open={showSupport} onOpenChange={setShowSupport}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-orange-600" />
              Suporte de Tecnologia
            </DialogTitle>
            <DialogDescription>
              Precisa de ajuda com o sistema? Nossa equipe de TI está aqui para ajudar!
            </DialogDescription>
          </DialogHeader>

          {!supportSent ? (
            <div className="space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-800 mb-2">Contatos Diretos:</h4>
                <div className="space-y-2 text-sm text-orange-700">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>(22) 2522-1299 - Ramal 150</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>suporte.ti@pmnf.rj.gov.br</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descreva seu problema:</label>
                <Textarea
                  placeholder="Ex: Não consigo atualizar o status de uma solicitação, sistema está lento, erro ao fazer login..."
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSupportSubmit}
                  className="flex-1 bg-orange-600 hover:bg-orange-700"
                  disabled={!supportMessage.trim()}
                >
                  Enviar Solicitação
                </Button>
                <Button variant="outline" onClick={() => setShowSupport(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-green-700 mb-2">Solicitação Enviada!</h3>
              <p className="text-sm text-gray-600">Nossa equipe de TI foi notificada e entrará em contato em breve.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
