1. Desenho da Arquitetura do Sistema e Explicação de Funcionamento

O AgenteIA é composto por três camadas principais: Front-end, Back-end e Modelo de Linguagem (LLM). Cada parte é responsável por uma etapa do fluxo de interpretação/tradução do texto enviado pelo usuário.

- Arquitetura Geral
  [Usuário - Navegador]
  │
  ▼
  [Front-end — HTML/CSS/JS]
  │ envia requisição HTTP (POST)
  ▼
  [Back-end — Node.js + Express]
  │ prepara e envia prompt
  ▼
  [LLM (API externa - Gemini)]
  │ retorna resposta
  ▼
  [Back-end — pós-processamento]
  │ responde ao front
  ▼
  [Front-end — exibe resultado]

- Funcionamento

Usuário digita uma frase, comando ou sentença na interface web.

O front-end envia o texto para o back-end por meio de um endpoint (/api/chat).

O back-end processa o input e envia o prompt ao LLM.

O modelo de IA interpreta/traduz a frase segundo as instruções recebidas.

A resposta final é devolvida ao front-end, que a exibe ao usuário.

## Essa arquitetura garante separação clara de responsabilidades, segurança das chaves de API, e facilidade para evoluir ou substituir partes do sistema sem quebrar a aplicação.

2. Estratégia de Tradução

A tradução entre Linguagem Natural (NL) e Cálculo Proposicional Clássico (CPC) segue um conjunto de estratégias que combinam regras fixas, mapeamento de operadores, e interpretação via IA.

- Regras de Tradução

Identificação de Conectivos Lógicos na frase

"se … então" → →

"e" → ∧

"ou" → ∨

"não" → ¬

Conversão de proposições simples em letras maiúsculas

“Está chovendo” → A

“É feriado” → B

Remoção de ambiguidades

Estruturas como “se A e B então C” são reescritas internamente para evitar interpretações incorretas.

Conversão inversa (CPC → NL)

A IA reverte conectivos para frases naturais:

∧ → “e”

∨ → “ou”

→ → “se … então”

¬ → “não”

- Mapeamento Utilizado

O sistema utiliza um dicionário base:

Linguagem Natural Símbolo Lógico
e ∧
ou ∨
não ¬
se … então →
se e somente te ↔

E o inverso também é aplicado quando a tradução é lógica → natural.

- Uso de LLMs

O LLM é responsável por:

interpretar frases ambíguas, identificar proposições dentro de sentenças complexas, corrigir sintaxe lógica, validar se a forma obtida corresponde ao CPC, traduzir CPC de volta para frases em português claro.

Ele recebe um prompt estruturado, por exemplo:

“Converta a sentença em português abaixo para lógica proposicional.”

E devolve algo como:

“Se chover, então não haverá aula.” → C → ¬A

- Exemplos de Input/Output com Análise de Acertos e Erros
  Exemplo 1 — Tradução correta

Input (NL → CPC):

"Se chover então não haverá aula."

Output esperado:

C → ¬A

Análise:
O modelo identifica corretamente o conectivo “se … então”.
“não haverá aula” foi convertido para ¬A.
Sem erros.

Exemplo 2 — Ambiguidade resolvida parcialmente

Input:

"Maria estuda e trabalha ou viaja."

Output do agente:

(E ∧ T) ∨ V

Análise:
Estrutura correta (agrupamento lógico principal: ou).
Porém a frase é ambígua em português: poderia ser também

E ∧ (T ∨ V)
O agente escolhe a interpretação mais comum, mas não há como garantir 100% de precisão sem contexto adicional. Melhorias futuras podem incluir pedido de esclarecimento ao usuário.

Exemplo 3 — Erro comum (conectivo não detectado)

Input:

"Pedro não estuda ou trabalha."

Output do agente:

¬E ∨ T

Problema:
Essa frase pode significar:

"Pedro não estuda ou trabalha" (interpretação literal), ou

"Pedro (não estuda ou trabalha)" (intenção ambígua).

O agente não consegue desambiguar sem ajuda externa.

🔄 Exemplo 4 — CPC → NL

Input:

¬A ∧ B

Output:

“Não A e B.”

Análise:
Estrutura lógica mantida
Mas falta naturalidade
Melhoria desejável:

## “Não ocorre A e ocorre B.”

3 - Discussão sobre limitações e possibilidades de melhoria.

- Limitações do Sistema

1. Ambiguidade na Linguagem Natural

A linguagem natural contém ambiguidades que podem gerar diferentes interpretações lógicas.
Exemplo:

“Maria estuda e trabalha ou viaja.”
pode ser interpretado como:

(E ∧ T) ∨ V
ou

E ∧ (T ∨ V)

O modelo escolhe uma estrutura baseada em padrões comuns, mas não possui contexto suficiente para garantir precisão universal.

2. Ausência de contexto semântico real

O agente não compreende:

intenções do usuário,

tempo verbal,

nuances culturais,

relações causais reais.

Ele opera somente com padrão sintático → estrutura lógica.

3. Dependência de LLMs externos

Limitações relacionadas à API:

custo por requisição,

limites de tokens,

latência,

disponibilidade do serviço externo.

O sistema não funciona offline.

4. Mapeamento limitado

O conjunto atual de conectivos e proposições é simples.
Não há suporte completo para:

quantificadores (∀, ∃),

lógica modal,

expressões complexas com múltiplas camadas de negações.

5. Pós-processamento básico

A validação da forma lógica ainda é simples.
Erros possíveis:

operadores fora de ordem,

parênteses faltando,

proposições com letras repetidas ou não padronizadas.

6. Tradução inversa (CPC → NL) pouco natural

A reconstrução de linguagem natural é funcional, porém:

tende a ser literal demais,

não cria frases fluentemente naturais,

não identifica o contexto da proposição.

- Possibilidades de Melhoria

1. Refinamento do Prompt e do Pós-processamento

Criar prompts especializados para:

detecção precisa de conectivos,

explicitação de ambiguidades,

validação automática da estrutura lógica.

Implementar uma camada de revisão pós-modelo, garantindo consistência dos parênteses e operadores.

2. Pedir esclarecimentos ao usuário

O agente pode solicitar mais informações quando a frase for ambígua:

“Sua frase pode ser interpretada de duas maneiras. Qual delas você queria dizer?”

Isso aumenta precisão e reduz erros estruturais.

3. Suporte expandido a operadores

Adicionar:

exclusão lógica (XOR),

negações aninhadas,

quantificadores simples.

Isso tornaria o agente útil para mais disciplinas de lógica.

4. Melhorar a tradução CPC → NL

Criar padrões mais naturais:

“¬A ∧ B” → “Não ocorre A, mas ocorre B.”

“A → B” → “Se A acontece, então B acontece.”

5. Interface mais rica

sistema de histórico,

download da lógica gerada,

modo de comparação entre traduções,

visualização lógica (árvore sintática, grafo, etc.).

Link do funcionamento do Agente de IA:

https://drive.google.com/drive/folders/1nO6DlhBhpHKfvmMWOUXABlFrAGIVOUxn?usp=sharing
