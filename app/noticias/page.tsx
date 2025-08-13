import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Eye } from "lucide-react"
import Image from "next/image"

const noticias = [
  {
    id: 1,
    titulo: "Nova campanha de vacinação contra a gripe",
    resumo:
      "A Secretaria de Saúde de Macaé iniciou uma nova campanha de vacinação contra a gripe, contemplando toda a população friburguense. A vacinação está disponível em todas as unidades básicas de saúde.",
    conteudo:
      "A campanha de vacinação contra a gripe 2024 já está em andamento em Macaé. Todas as unidades básicas de saúde do município estão aplicando a vacina gratuitamente para toda a população. A meta é vacinar 80% dos friburguenses até o final de março.",
    data: "15 de Janeiro, 2024",
    categoria: "Saúde",
    visualizacoes: 1250,
    imagem: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    titulo: "Obras de pavimentação no centro da cidade",
    resumo:
      "As obras de pavimentação e recapeamento das principais vias do centro de Macaé estão em andamento, com previsão de conclusão para o final do mês.",
    conteudo:
      "A Prefeitura de Macaé está realizando importantes obras de infraestrutura no centro da cidade. O projeto inclui pavimentação, recapeamento e melhorias na sinalização das principais vias do centro histórico.",
    data: "12 de Janeiro, 2024",
    categoria: "Obras",
    visualizacoes: 890,
    imagem: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    titulo: "Programa de castração gratuita ampliado",
    resumo:
      "O programa municipal de castração gratuita de cães e gatos foi ampliado, oferecendo mais vagas para a comunidade friburguense.",
    conteudo:
      "A Secretaria Animal de Macaé ampliou o programa de castração gratuita, aumentando em 50% o número de vagas mensais. O programa atende pets de famílias de baixa renda e animais em situação de rua.",
    data: "10 de Janeiro, 2024",
    categoria: "Bem-estar Animal",
    visualizacoes: 675,
    imagem: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    titulo: "Novo sistema de iluminação LED nas praças",
    resumo:
      "As principais praças da cidade receberam novo sistema de iluminação LED, proporcionando mais segurança e economia de energia.",
    data: "8 de Janeiro, 2024",
    categoria: "Infraestrutura",
    visualizacoes: 432,
    imagem: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    titulo: "Inscrições abertas para cursos profissionalizantes",
    resumo:
      "A Secretaria de Desenvolvimento Social abriu inscrições para diversos cursos profissionalizantes gratuitos.",
    data: "5 de Janeiro, 2024",
    categoria: "Educação",
    visualizacoes: 1100,
    imagem: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 6,
    titulo: "Festival de Inverno 2024 - Programação divulgada",
    resumo:
      "A programação completa do Festival de Inverno de Macaé 2024 foi divulgada, com shows, teatro e gastronomia.",
    data: "3 de Janeiro, 2024",
    categoria: "Cultura",
    visualizacoes: 2100,
    imagem: "/placeholder.svg?height=200&width=400",
  },
]

const categorias = ["Todas", "Saúde", "Obras", "Bem-estar Animal", "Infraestrutura", "Educação", "Cultura"]

export default function NoticiasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <Image
              src="/logo-nova-friburgo.png"
              alt="Logo Macaé"
              width={50}
              height={50}
              className="rounded-lg"
            />
            <div>
              <h1 className="text-xl font-bold">Notícias e Informações</h1>
              <p className="text-blue-100 text-sm">Fique por dentro das novidades da cidade</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Filtros */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Todas as Notícias</h2>
          <div className="flex flex-wrap gap-2">
            {categorias.map((categoria) => (
              <Badge
                key={categoria}
                variant={categoria === "Todas" ? "default" : "outline"}
                className="cursor-pointer hover:bg-blue-100"
              >
                {categoria}
              </Badge>
            ))}
          </div>
        </div>

        {/* Grid de Notícias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {noticias.map((noticia) => (
            <Card key={noticia.id} className="hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="aspect-video bg-gray-200 relative">
                <Image src={noticia.imagem || "/placeholder.svg"} alt={noticia.titulo} fill className="object-cover" />
                <Badge className="absolute top-2 left-2 bg-blue-600">{noticia.categoria}</Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-lg leading-tight line-clamp-2">{noticia.titulo}</CardTitle>
                <CardDescription className="line-clamp-3">{noticia.resumo}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{noticia.data}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{noticia.visualizacoes}</span>
                  </div>
                </div>

                <Link href={`/noticia/${noticia.id}`}>
                  <Button variant="outline" className="w-full">
                    Ler mais
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Paginação */}
        <div className="flex justify-center mt-12">
          <div className="flex gap-2">
            <Button variant="outline" disabled>
              Anterior
            </Button>
            <Button variant="default">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">Próximo</Button>
          </div>
        </div>
      </main>
    </div>
  )
}
