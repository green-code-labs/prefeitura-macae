"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Leaf,
  Building,
  Hammer,
  Users,
  Trophy,
  Stethoscope,
  Calculator,
  MapPin,
  Phone,
  Mail,
  User,
  LogIn,
} from "lucide-react"
import Image from "next/image"
import { getCurrentUser } from "@/lib/auth"

const secretarias = [
  {
    id: "animal",
    nome: "Secretaria Animal",
    descricao: "Proteção e bem-estar animal",
    icon: Heart,
    cor: "bg-green-500",
    servicos: ["Denúncia", "Solicitação de castração"],
  },
  {
    id: "ambiente",
    nome: "Sec. Ambiente",
    descricao: "Licenças e meio ambiente",
    icon: Leaf,
    cor: "bg-green-600",
    servicos: ["Solicitação de Alvará", "Licença Ambiental"],
  },
  {
    id: "servicos-publicos",
    nome: "Sec. Serviços Públicos",
    descricao: "Manutenção urbana",
    icon: Building,
    cor: "bg-blue-500",
    servicos: ["Iluminação", "Poda"],
  },
  {
    id: "desenvolvimento",
    nome: "Sec. Desenvolvimento Regional",
    descricao: "Limpeza e manutenção",
    icon: MapPin,
    cor: "bg-blue-600",
    servicos: ["Limpeza e capina"],
  },
  {
    id: "obras",
    nome: "Sec. Obras",
    descricao: "Solicitações de obras",
    icon: Hammer,
    cor: "bg-orange-500",
    servicos: ["Solicitação de pequenas obras"],
  },
  {
    id: "assistencia-social",
    nome: "Sec. Assistência Social",
    descricao: "Agendamentos sociais",
    icon: Users,
    cor: "bg-purple-500",
    servicos: ["Agenda CRAS, CREAS e CREM"],
  },
  {
    id: "esporte",
    nome: "Sec. Esporte",
    descricao: "Atividades esportivas",
    icon: Trophy,
    cor: "bg-yellow-500",
    servicos: ["Solicitação de viagem para equipes"],
  },
  {
    id: "saude",
    nome: "Sec. Saúde",
    descricao: "Atendimento médico",
    icon: Stethoscope,
    cor: "bg-red-500",
    servicos: ["Consultas", "Agendas"],
  },
  {
    id: "fazenda",
    nome: "Sec. Fazenda",
    descricao: "Tributos e pagamentos",
    icon: Calculator,
    cor: "bg-indigo-500",
    servicos: ["IPTU", "Pagamentos"],
  },
]

const noticias = [
  {
    titulo: "Nova campanha de vacinação contra a gripe",
    resumo: "Iniciativa contempla toda a população friburguense",
    data: "15 de Janeiro, 2024",
  },
  {
    titulo: "Obras de pavimentação no centro da cidade",
    resumo: "Melhorias na infraestrutura urbana em andamento",
    data: "12 de Janeiro, 2024",
  },
  {
    titulo: "Programa de castração gratuita ampliado",
    resumo: "Mais vagas disponíveis para pets da comunidade",
    data: "10 de Janeiro, 2024",
  },
]

export default function HomePage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      // Usuário não logado, tudo bem
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/logo-nova-friburgo.png"
                alt="Logo Macaé"
                width={60}
                height={60}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-2xl font-bold">Macaé</h1>
                <p className="text-blue-100">Atendimento Digital</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {!isLoading && (
                <>
                  {user ? (
                    <div className="flex items-center gap-4">
                      <span className="text-sm">Olá, {user.userData.nome}</span>
                      <Link href="/dashboard">
                        <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
                          <User className="w-4 h-4 mr-2" />
                          Meu Painel
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Link href="/admin">
                        <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
                          <LogIn className="w-4 h-4 mr-2" />
                          Painel Admin
                        </Button>
                      </Link>
                      <Link href="/login">
                        <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
                          <User className="w-4 h-4 mr-2" />
                          Login Cidadão
                        </Button>
                      </Link>
                      <Link href="/cadastro">
                        <Button variant="secondary">
                          <User className="w-4 h-4 mr-2" />
                          Cadastrar
                        </Button>
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Seção de Boas-vindas */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Bem-vindo ao Atendimento Digital</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Resolva suas demandas com a prefeitura de forma rápida e prática, sem sair de casa. Escolha a secretaria e o
            serviço desejado.
          </p>
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg max-w-md mx-auto">
            <p className="text-sm text-green-800">
              <strong>✅ Acesso Liberado:</strong> Agora você pode fazer solicitações sem precisar de cadastro ou login!
            </p>
          </div>
        </div>

        {/* Grid de Secretarias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {secretarias.map((secretaria) => {
            const IconComponent = secretaria.icon
            return (
              <Link key={secretaria.id} href={`/secretaria/${secretaria.id}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${secretaria.cor} text-white`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{secretaria.nome}</CardTitle>
                        <CardDescription>{secretaria.descricao}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {secretaria.servicos.map((servico, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {servico}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Seção de Notícias */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Notícias e Informações</h3>
            <Link href="/noticias">
              <Button variant="outline">Ver todas</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {noticias.map((noticia, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg leading-tight">{noticia.titulo}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">{noticia.data}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{noticia.resumo}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Informações de Contato */}
        <div className="mt-12 bg-blue-600 text-white rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Precisa de Ajuda?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5" />
              <div>
                <p className="font-semibold">Telefone</p>
                <p className="text-blue-100">(22) 2791-9008</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5" />
              <div>
                <p className="font-semibold">E-mail</p>
                <p className="text-blue-100">congem@macae.rj.gov.br</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <div>
                <p className="font-semibold">Endereço</p>
                <p className="text-blue-100">Avenida Presidente Sodré, 534 – Centro, Macaé – RJ, CEP 27913-080</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
