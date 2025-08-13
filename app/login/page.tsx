"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Mail, Lock, AlertCircle, LogIn } from "lucide-react"
import Image from "next/image"
import { signIn } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      setError("Preencha todos os campos")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const { userData } = await signIn(formData.email, formData.password)

      // Redirecionar baseado no tipo de usuário
      if (userData.tipo_usuario === "admin" || userData.tipo_usuario === "operador") {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    } catch (err: any) {
      setError("E-mail ou senha incorretos")
    } finally {
      setIsLoading(false)
    }
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
              <h1 className="text-xl font-bold">Login</h1>
              <p className="text-blue-100 text-sm">Acesse sua conta</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <LogIn className="w-5 h-5 text-blue-600" />
                Entrar na Conta
              </CardTitle>
              <CardDescription>Digite suas credenciais para acessar os serviços</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Sua senha"
                      className="pl-10"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>

                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">
                    Não tem uma conta?{" "}
                    <Link href="/cadastro" className="text-blue-600 hover:underline">
                      Cadastre-se
                    </Link>
                  </p>
                  <Link href="/recuperar-senha" className="text-sm text-blue-600 hover:underline">
                    Esqueceu sua senha?
                  </Link>
                </div>
              </form>

              {/* Contas de teste */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">Contas para Teste:</h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>
                    <strong>Admin:</strong> admin@pmnf.rj.gov.br / admin123
                  </p>
                  <p>
                    <strong>Operador:</strong> animal@pmnf.rj.gov.br / operador123
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
