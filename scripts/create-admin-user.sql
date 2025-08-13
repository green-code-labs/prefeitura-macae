-- Criar novo usuário administrador para teste

-- Primeiro, vamos limpar qualquer usuário admin existente
DELETE FROM usuarios WHERE email = 'admin@pmnf.rj.gov.br';

-- Criar novo usuário administrador
INSERT INTO usuarios (
  id,
  nome, 
  cpf, 
  email, 
  telefone,
  endereco,
  tipo_usuario
) VALUES (
  gen_random_uuid(),
  'Administrador Sistema',
  '111.222.333-44',
  'admin.sistema@novafriburgo.rj.gov.br',
  '(22) 2522-1234',
  'Praça Getúlio Vargas, s/n - Centro, Macaé - RJ',
  'admin'
);

-- Criar usuário operador para secretaria animal
INSERT INTO usuarios (
  id,
  nome, 
  cpf, 
  email, 
  telefone,
  tipo_usuario,
  secretaria_id
) VALUES (
  gen_random_uuid(),
  'Maria Silva - Operadora Animal',
  '222.333.444-55',
  'operador.animal@novafriburgo.rj.gov.br',
  '(22) 2522-1235',
  'operador',
  'animal'
) ON CONFLICT (cpf) DO NOTHING;

-- Criar usuário operador para secretaria de serviços públicos
INSERT INTO usuarios (
  id,
  nome, 
  cpf, 
  email, 
  telefone,
  tipo_usuario,
  secretaria_id
) VALUES (
  gen_random_uuid(),
  'João Santos - Operador Serviços',
  '333.444.555-66',
  'operador.servicos@novafriburgo.rj.gov.br',
  '(22) 2522-1236',
  'operador',
  'servicos-publicos'
) ON CONFLICT (cpf) DO NOTHING;

-- Verificar se os usuários foram criados
SELECT nome, email, tipo_usuario, secretaria_id FROM usuarios WHERE tipo_usuario IN ('admin', 'operador');
