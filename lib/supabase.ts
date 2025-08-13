import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      usuarios: {
        Row: {
          id: string
          nome: string
          cpf: string
          email: string
          telefone: string | null
          endereco: string | null
          tipo_usuario: "cidadao" | "admin" | "operador"
          secretaria_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nome: string
          cpf: string
          email: string
          telefone?: string | null
          endereco?: string | null
          tipo_usuario?: "cidadao" | "admin" | "operador"
          secretaria_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nome?: string
          cpf?: string
          email?: string
          telefone?: string | null
          endereco?: string | null
          tipo_usuario?: "cidadao" | "admin" | "operador"
          secretaria_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      solicitacoes: {
        Row: {
          id: string
          protocolo: string
          usuario_id: string
          secretaria_id: string
          tipo_servico_id: string
          dados_formulario: any
          status: "pendente" | "em_andamento" | "concluido" | "cancelado"
          observacoes_admin: string | null
          operador_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          protocolo: string
          usuario_id: string
          secretaria_id: string
          tipo_servico_id: string
          dados_formulario: any
          status?: "pendente" | "em_andamento" | "concluido" | "cancelado"
          observacoes_admin?: string | null
          operador_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          protocolo?: string
          usuario_id?: string
          secretaria_id?: string
          tipo_servico_id?: string
          dados_formulario?: any
          status?: "pendente" | "em_andamento" | "concluido" | "cancelado"
          observacoes_admin?: string | null
          operador_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
