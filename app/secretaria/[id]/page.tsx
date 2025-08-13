import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, FileText, Users } from "lucide-react"
import Image from "next/image"

const secretariasData = {
  animal: {
    nome: "Secretaria Animal",
    descricao: "Proteção e bem-estar dos animais de Macaé",
    cor: "bg-green-500",
    servicos: [
      {
        id: "denuncia",
        titulo: "Denúncia de Maus-tratos",
        descricao: "Reporte casos de maus-tratos contra animais",
        tempo: "2-3 dias úteis",
        documentos: ["Fotos/vídeos", "Localização", "Descrição detalhada"],
      },
      {
        id: "castracao",
        titulo: "Solicitação de Castração",
        descricao: "Agende castração gratuita para seu pet",
        tempo: "15-30 dias úteis",
        documentos: ["RG do responsável", "Comprovante de residência", "Foto do animal"],
      },
    ],
  },
  ambiente: {
    nome: "Secretaria do Meio Ambiente",
    descricao: "Licenças ambientais e preservação do meio ambiente",
    cor: "bg-green-600",
    servicos: [
      {
        id: "alvara",
        titulo: "Solicitação de Alvará Ambiental",
        descricao: "Obtenha licença para atividades que impactam o meio ambiente",
        tempo: "30-45 dias úteis",
        documentos: ["Projeto técnico", "ART do responsável", "Comprovante de pagamento"],
      },
      {
        id: "licenca",
        titulo: "Licença Ambiental",
        descricao: "Licenciamento para empreendimentos",
        tempo: "45-60 dias úteis",
        documentos: ["Estudo de impacto", "Plantas do projeto", "Documentação legal"],
      },
    ],
  },
  "servicos-publicos": {
    nome: "Secretaria de Serviços Públicos",
    descricao: "Manutenção da infraestrutura urbana da cidade",
    cor: "bg-blue-500",
    servicos: [
      {
        id: "iluminacao",
        titulo: "Problema na Iluminação",
        descricao: "Reporte lâmpadas queimadas ou postes com defeito",
        tempo: "3-5 dias úteis",
        documentos: ["Localização exata", "Foto do problema", "Descrição"],
      },
      {
        id: "poda",
        titulo: "Solicitação de Poda",
        descricao: "Solicite poda de árvores em vias públicas",
        tempo: "7-15 dias úteis",
        documentos: ["Endereço completo", "Justificativa", "Foto da árvore"],
      },
    ],
  },
}

export default function SecretariaPage({ params }: { params: { id: string } }) {
  const secretaria = secretariasData[params.id as keyof typeof secretariasData]

  if (!secretaria) {
    return <div>Secretaria não encontrada</div>
  }

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
              <h1 className="text-xl font-bold">{secretaria.nome}</h1>
              <p className="text-blue-100 text-sm">{secretaria.descricao}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Serviços Disponíveis</h2>
          <p className="text-gray-600">Escolha o serviço que você precisa e preencha o formulário online.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {secretaria.servicos.map((servico) => (
            <Card key={servico.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  {servico.titulo}
                </CardTitle>
                <CardDescription>{servico.descricao}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Prazo: {servico.tempo}</span>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Documentos necessários:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {servico.documentos.map((doc, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Link href={`/servico/${params.id}/${servico.id}`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Solicitar Serviço</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Informações Adicionais */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Informações Importantes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Horário de Atendimento</h4>
              <p className="text-gray-600">Segunda a Sexta: 8h às 17h</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Acompanhamento</h4>
              <p className="text-gray-600">Você receberá atualizações por e-mail e SMS</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
