"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Upload, CheckCircle, AlertCircle, User } from "lucide-react"
import Image from "next/image"

const servicosData = {
  animal: {
    denuncia: {
      titulo: "Denúncia de Maus-tratos",
      campos: [
        {
          id: "tipo",
          label: "Tipo de Denúncia",
          tipo: "select",
          opcoes: ["Maus-tratos", "Abandono", "Envenenamento", "Outros"],
        },
        { id: "localizacao", label: "Localização", tipo: "text", placeholder: "Endereço completo onde ocorreu o fato" },
        { id: "descricao", label: "Descrição Detalhada", tipo: "textarea", placeholder: "Descreva o que aconteceu..." },
        { id: "contato", label: "Seu Telefone (opcional)", tipo: "text", placeholder: "(22) 99999-9999" },
        { id: "anexos", label: "Fotos/Vídeos", tipo: "file" },
      ],
    },
    castracao: {
      titulo: "Solicitação de Castração",
      campos: [
        { id: "nome", label: "Seu Nome Completo", tipo: "text", placeholder: "Nome do responsável" },
        { id: "cpf", label: "CPF", tipo: "text", placeholder: "000.000.000-00" },
        { id: "telefone", label: "Telefone", tipo: "text", placeholder: "(22) 99999-9999" },
        { id: "endereco", label: "Endereço Completo", tipo: "text", placeholder: "Rua, número, bairro" },
        { id: "animal_nome", label: "Nome do Animal", tipo: "text", placeholder: "Nome do pet" },
        { id: "animal_tipo", label: "Tipo de Animal", tipo: "select", opcoes: ["Cão", "Gato"] },
        { id: "animal_sexo", label: "Sexo do Animal", tipo: "select", opcoes: ["Macho", "Fêmea"] },
        { id: "animal_idade", label: "Idade Aproximada", tipo: "text", placeholder: "Ex: 2 anos" },
        {
          id: "observacoes",
          label: "Observações",
          tipo: "textarea",
          placeholder: "Informações adicionais sobre o animal...",
        },
      ],
    },
  },
  ambiente: {
    alvara: {
      titulo: "Solicitação de Alvará Ambiental",
      campos: [
        { id: "nome_empresa", label: "Nome da Empresa", tipo: "text", placeholder: "Razão social" },
        { id: "cnpj", label: "CNPJ", tipo: "text", placeholder: "00.000.000/0000-00" },
        { id: "endereco_empresa", label: "Endereço da Empresa", tipo: "text", placeholder: "Endereço completo" },
        { id: "atividade", label: "Atividade Desenvolvida", tipo: "textarea", placeholder: "Descreva a atividade..." },
        { id: "responsavel_tecnico", label: "Responsável Técnico", tipo: "text", placeholder: "Nome do responsável" },
        { id: "art_numero", label: "Número da ART", tipo: "text", placeholder: "Número da ART" },
      ],
    },
  },
  "servicos-publicos": {
    iluminacao: {
      titulo: "Problema na Iluminação",
      campos: [
        { id: "endereco", label: "Endereço do Problema", tipo: "text", placeholder: "Rua, número, bairro" },
        {
          id: "tipo_problema",
          label: "Tipo do Problema",
          tipo: "select",
          opcoes: ["Lâmpada queimada", "Poste danificado", "Fiação exposta", "Outros"],
        },
        { id: "descricao", label: "Descrição do Problema", tipo: "textarea", placeholder: "Descreva o problema..." },
        { id: "urgencia", label: "Nível de Urgência", tipo: "select", opcoes: ["Baixa", "Média", "Alta"] },
      ],
    },
    poda: {
      titulo: "Solicitação de Poda",
      campos: [
        { id: "endereco", label: "Endereço da Árvore", tipo: "text", placeholder: "Rua, número, bairro" },
        { id: "tipo_arvore", label: "Tipo de Árvore", tipo: "text", placeholder: "Se souber, informe o tipo" },
        {
          id: "motivo",
          label: "Motivo da Poda",
          tipo: "select",
          opcoes: ["Galhos na fiação", "Risco de queda", "Obstrução da via", "Outros"],
        },
        { id: "descricao", label: "Descrição", tipo: "textarea", placeholder: "Descreva a situação..." },
      ],
    },
  },
}

// Campos obrigatórios para identificação do cidadão
const camposIdentificacao = [
  { id: "nome_cidadao", label: "Seu Nome Completo", tipo: "text", placeholder: "Nome completo" },
  { id: "email_cidadao", label: "Seu E-mail", tipo: "email", placeholder: "seu@email.com" },
  { id: "telefone_cidadao", label: "Seu Telefone", tipo: "text", placeholder: "(22) 99999-9999" },
]

export default function ServicoPage({ params }: { params: { secretaria: string; servico: string } }) {
  const [formData, setFormData] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [protocolo, setProtocolo] = useState("")

  const servicoInfo =
    servicosData[params.secretaria as keyof typeof servicosData]?.[
      params.servico as keyof (typeof servicosData)[keyof typeof servicosData]
    ]

  if (!servicoInfo) {
    return <div>Serviço não encontrado</div>
  }

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const generateProtocol = () => {
    const timestamp = Date.now().toString().slice(-6)
    const secretariaCode = params.secretaria.substring(0, 3).toUpperCase()
    return `NF-${secretariaCode}-${timestamp}`
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar campos obrigatórios de identificação
    const requiredFields = ["nome_cidadao", "email_cidadao", "telefone_cidadao"]
    const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData])

    if (missingFields.length > 0) {
      setError("Por favor, preencha todos os campos de identificação obrigatórios")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const novoProtocolo = generateProtocol()
      setProtocolo(novoProtocolo)

      // Simular envio da solicitação
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Aqui você pode adicionar a lógica para salvar no banco de dados
      // Por enquanto, vamos apenas simular o sucesso
      console.log("Solicitação enviada:", {
        protocolo: novoProtocolo,
        secretaria: params.secretaria,
        servico: params.servico,
        dados: formData,
      })

      setIsSubmitted(true)
    } catch (err: any) {
      setError(err.message || "Erro ao enviar solicitação")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-green-700">Solicitação Enviada!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Sua solicitação foi recebida com sucesso. Anote o protocolo para acompanhamento.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-semibold">Protocolo:</p>
              <p className="text-lg font-mono text-blue-600">{protocolo}</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-700">
                <strong>Importante:</strong> Guarde este protocolo para acompanhar sua solicitação. Você pode entrar em
                contato conosco pelo telefone (22) 2522-1234.
              </p>
            </div>
            <div className="flex gap-2">
              <Link href="/" className="flex-1">
                <Button className="w-full">Fazer Nova Solicitação</Button>
              </Link>
              <Link href="/login" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  Acompanhar Online
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href={`/secretaria/${params.secretaria}`}>
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
              <h1 className="text-xl font-bold">{servicoInfo.titulo}</h1>
              <p className="text-blue-100 text-sm">Preencha os dados abaixo</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                Formulário de Solicitação
              </CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Seção de Identificação */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Seus Dados (Obrigatório)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {camposIdentificacao.map((campo) => (
                      <div key={campo.id} className="space-y-2">
                        <Label htmlFor={campo.id}>{campo.label} *</Label>
                        <Input
                          id={campo.id}
                          type={campo.tipo}
                          placeholder={campo.placeholder}
                          onChange={(e) => {
                            let value = e.target.value
                            if (campo.id === "telefone_cidadao") {
                              value = formatPhone(value)
                            }
                            handleInputChange(campo.id, value)
                          }}
                          maxLength={campo.id === "telefone_cidadao" ? 15 : undefined}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Seção do Serviço */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Dados da Solicitação</h3>
                  <div className="space-y-4">
                    {servicoInfo.campos.map((campo) => (
                      <div key={campo.id} className="space-y-2">
                        <Label htmlFor={campo.id}>{campo.label}</Label>

                        {campo.tipo === "text" && (
                          <Input
                            id={campo.id}
                            placeholder={campo.placeholder}
                            onChange={(e) => handleInputChange(campo.id, e.target.value)}
                            required
                          />
                        )}

                        {campo.tipo === "textarea" && (
                          <Textarea
                            id={campo.id}
                            placeholder={campo.placeholder}
                            onChange={(e) => handleInputChange(campo.id, e.target.value)}
                            rows={4}
                            required
                          />
                        )}

                        {campo.tipo === "select" && (
                          <Select onValueChange={(value) => handleInputChange(campo.id, value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma opção" />
                            </SelectTrigger>
                            <SelectContent>
                              {campo.opcoes?.map((opcao) => (
                                <SelectItem key={opcao} value={opcao}>
                                  {opcao}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}

                        {campo.tipo === "file" && (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Clique para enviar arquivos ou arraste aqui</p>
                            <Input id={campo.id} type="file" multiple accept="image/*,video/*" className="hidden" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Importante:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Verifique se todos os dados estão corretos antes de enviar</li>
                    <li>• Você receberá um protocolo para acompanhamento</li>
                    <li>• Guarde o protocolo para consultas futuras</li>
                    <li>• Para acompanhar online, faça login no sistema</li>
                  </ul>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                  {isLoading ? "Enviando..." : "Enviar Solicitação"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
