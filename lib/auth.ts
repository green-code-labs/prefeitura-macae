import { supabase } from "./supabase"

export async function signUp(userData: {
  nome: string
  cpf: string
  email: string
  telefone?: string
  endereco?: string
  password: string
}) {
  // Criar usuário no Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
  })

  if (authError) throw authError

  // Criar perfil do usuário na tabela usuarios
  if (authData.user) {
    const { error: profileError } = await supabase.from("usuarios").insert({
      id: authData.user.id,
      nome: userData.nome,
      cpf: userData.cpf,
      email: userData.email,
      telefone: userData.telefone,
      endereco: userData.endereco,
      tipo_usuario: "cidadao",
    })

    if (profileError) throw profileError
  }

  return authData
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error

  // Buscar dados do usuário
  const { data: userData, error: userError } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", data.user.id)
    .single()

  if (userError) throw userError

  return { ...data, userData }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: userData, error } = await supabase.from("usuarios").select("*").eq("id", user.id).single()

  if (error) throw error

  return { ...user, userData }
}
