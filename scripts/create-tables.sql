-- Criar tabelas para o sistema Macaé

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  cpf VARCHAR(14) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  telefone VARCHAR(20),
  endereco TEXT,
  tipo_usuario VARCHAR(20) DEFAULT 'cidadao' CHECK (tipo_usuario IN ('cidadao', 'admin', 'operador')),
  secretaria_id VARCHAR(50), -- Para operadores
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de secretarias
CREATE TABLE IF NOT EXISTS secretarias (
  id VARCHAR(50) PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  cor VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de tipos de serviços
CREATE TABLE IF NOT EXISTS tipos_servicos (
  id VARCHAR(50) PRIMARY KEY,
  secretaria_id VARCHAR(50) REFERENCES secretarias(id),
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  prazo_dias INTEGER,
  documentos_necessarios TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de solicitações/tickets
CREATE TABLE IF NOT EXISTS solicitacoes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  protocolo VARCHAR(20) UNIQUE NOT NULL,
  usuario_id UUID REFERENCES usuarios(id),
  secretaria_id VARCHAR(50) REFERENCES secretarias(id),
  tipo_servico_id VARCHAR(50) REFERENCES tipos_servicos(id),
  dados_formulario JSONB NOT NULL,
  status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'em_andamento', 'concluido', 'cancelado')),
  observacoes_admin TEXT,
  operador_id UUID REFERENCES usuarios(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir dados iniciais das secretarias
INSERT INTO secretarias (id, nome, descricao, cor) VALUES
('animal', 'Secretaria Animal', 'Proteção e bem-estar animal', 'bg-green-500'),
('ambiente', 'Sec. Ambiente', 'Licenças e meio ambiente', 'bg-green-600'),
('servicos-publicos', 'Sec. Serviços Públicos', 'Manutenção urbana', 'bg-blue-500'),
('desenvolvimento', 'Sec. Desenvolvimento Regional', 'Limpeza e manutenção', 'bg-blue-600'),
('obras', 'Sec. Obras', 'Solicitações de obras', 'bg-orange-500'),
('assistencia-social', 'Sec. Assistência Social', 'Agendamentos sociais', 'bg-purple-500'),
('esporte', 'Sec. Esporte', 'Atividades esportivas', 'bg-yellow-500'),
('saude', 'Sec. Saúde', 'Atendimento médico', 'bg-red-500'),
('fazenda', 'Sec. Fazenda', 'Tributos e pagamentos', 'bg-indigo-500')
ON CONFLICT (id) DO NOTHING;

-- Inserir tipos de serviços
INSERT INTO tipos_servicos (id, secretaria_id, nome, descricao, prazo_dias, documentos_necessarios) VALUES
('animal-denuncia', 'animal', 'Denúncia de Maus-tratos', 'Reporte casos de maus-tratos contra animais', 3, ARRAY['Fotos/vídeos', 'Localização', 'Descrição detalhada']),
('animal-castracao', 'animal', 'Solicitação de Castração', 'Agende castração gratuita para seu pet', 30, ARRAY['RG do responsável', 'Comprovante de residência', 'Foto do animal']),
('ambiente-alvara', 'ambiente', 'Solicitação de Alvará Ambiental', 'Obtenha licença para atividades que impactam o meio ambiente', 45, ARRAY['Projeto técnico', 'ART do responsável', 'Comprovante de pagamento']),
('servicos-iluminacao', 'servicos-publicos', 'Problema na Iluminação', 'Reporte lâmpadas queimadas ou postes com defeito', 5, ARRAY['Localização exata', 'Foto do problema', 'Descrição']),
('servicos-poda', 'servicos-publicos', 'Solicitação de Poda', 'Solicite poda de árvores em vias públicas', 15, ARRAY['Endereço completo', 'Justificativa', 'Foto da árvore'])
ON CONFLICT (id) DO NOTHING;

-- Criar usuário admin padrão
INSERT INTO usuarios (nome, cpf, email, tipo_usuario) VALUES
('Administrador Sistema', '000.000.000-00', 'admin@pmnf.rj.gov.br', 'admin')
ON CONFLICT (cpf) DO NOTHING;

-- Criar operadores para cada secretaria
INSERT INTO usuarios (nome, cpf, email, tipo_usuario, secretaria_id) VALUES
('Operador Animal', '111.111.111-11', 'animal@pmnf.rj.gov.br', 'operador', 'animal'),
('Operador Ambiente', '222.222.222-22', 'ambiente@pmnf.rj.gov.br', 'operador', 'ambiente'),
('Operador Serviços', '333.333.333-33', 'servicos@pmnf.rj.gov.br', 'operador', 'servicos-publicos')
ON CONFLICT (cpf) DO NOTHING;
