-- Inserir dados mockados para teste

-- Inserir algumas solicitações de exemplo
INSERT INTO solicitacoes (
  protocolo, 
  usuario_id, 
  secretaria_id, 
  tipo_servico_id, 
  dados_formulario, 
  status,
  observacoes_admin,
  created_at
) VALUES 
(
  'NF-ANI-001234',
  (SELECT id FROM usuarios WHERE email = 'admin@pmnf.rj.gov.br' LIMIT 1),
  'animal',
  'animal-denuncia',
  '{"tipo": "Maus-tratos", "localizacao": "Rua das Flores, 123", "descricao": "Animal sendo maltratado no quintal", "contato": "(22) 99999-9999"}',
  'pendente',
  NULL,
  NOW() - INTERVAL '2 days'
),
(
  'NF-ANI-001235',
  (SELECT id FROM usuarios WHERE email = 'admin@pmnf.rj.gov.br' LIMIT 1),
  'animal',
  'animal-castracao',
  '{"nome": "João Silva", "cpf": "123.456.789-00", "telefone": "(22) 98888-8888", "endereco": "Rua A, 456", "animal_nome": "Rex", "animal_tipo": "Cão", "animal_sexo": "Macho", "animal_idade": "3 anos"}',
  'em_andamento',
  'Solicitação aprovada. Aguardando agendamento.',
  NOW() - INTERVAL '5 days'
),
(
  'NF-SER-001236',
  (SELECT id FROM usuarios WHERE email = 'admin@pmnf.rj.gov.br' LIMIT 1),
  'servicos-publicos',
  'servicos-iluminacao',
  '{"endereco": "Praça Central, em frente ao banco", "tipo_problema": "Lâmpada queimada", "descricao": "Poste de iluminação sem funcionar há 3 dias", "urgencia": "Alta"}',
  'concluido',
  'Problema resolvido. Lâmpada substituída em 12/01/2024.',
  NOW() - INTERVAL '7 days'
);
