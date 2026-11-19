# KodiFlow — Classificação Inteligente de Mensagens com IA e Automação

Solução desenvolvida para o **Desafio Técnico de IA e Automação (KODIE)**, integrando Inteligência Artificial, API REST e fluxos automatizados para otimizar a triagem de mensagens no atendimento ao cliente.

---

## 1. Apresentação da Ideia

O **KodiFlow** nasceu da necessidade de transformar processos manuais e repetitivos de atendimento ao cliente em fluxos ágeis, inteligentes e escaláveis. A ideia central é atuar como um motor de triagem cognitiva que recebe mensagens brutas, compreende o contexto semântico através de modelos de Inteligência Artificial e entrega os dados estruturados para que ferramentas de automação realizem o encaminhamento imediato sem intervenção humana inicial.

---

## 2. Problema Escolhido

**Cenário:** Classificação de Mensagens (Caso 4.1).

Pequenas e médias empresas recebem diariamente um alto volume de mensagens de clientes contendo dúvidas, solicitações diversas e reclamações. Quando esse processo é realizado manualmente:

* Há um consumo excessivo de tempo operacional na leitura individual de cada mensagem;
* Ocorre demora na identificação de casos críticos ou urgentes;
* A falta de padronização na categorização dificulta o direcionamento correto para os setores responsáveis.

---

## 3. Solução Proposta

O **KodiFlow** resolve esse gargalo unindo uma **API Back-end** a um **Fluxo de Automação**:

1. **Captura:** O fluxo de automação (n8n) intercepta a chegada da nova mensagem via Webhook.
2. **Processamento Cognitivo (IA):** A API recebe o texto e utiliza um modelo de Inteligência Artificial com engenharia de prompt estruturada para analisar o conteúdo.
3. **Classificação Estruturada:** A IA extrai a categoria (`Dúvida`, `Reclamação` ou `Solicitação`), o nível de urgência (`Baixa`, `Média`, `Alta`), o sentimento do cliente, o setor de destino e gera um resumo objetivo — devolvendo tudo estritamente em formato **JSON**.
4. **Roteamento Automatizado:** O n8n recebe o JSON validado da API e executa o encaminhamento automático para a fila ou setor correspondente.

---

## 4. Tecnologias Utilizadas

* **Back-end:** Node.js com TypeScript e framework **Express**.
* **Validação de Dados:** Zod (garantindo contratos rígidos de entrada e saída).
* **Inteligência Artificial:** API de LLM (Google Gemini) com prompt estruturado para saída em JSON.
* **Automação:** **n8n** (orquestração do fluxo via Webhook e HTTP Request).
* **Infraestrutura (Opcional/Diferencial):** Docker e Docker Compose para padronização do ambiente.

---

## 5. Funcionamento do Sistema

O fluxo de dados entre os componentes segue a arquitetura abaixo:

```text
[Cliente / Origem] 
       │
       ▼ (Payload JSON)
[n8n: Webhook Trigger] 
       │
       ▼ (POST /api/classify)
[API Express + Zod] ──► [Prompt Estruturado] ──► [Modelo de IA]
       │                                               │
       ◄─────────── (Resposta Estruturada JSON) ───────┘
       │
       ▼ (Retorno HTTP 200)
[n8n: Roteamento / Encaminhamento por Categoria]
```

### Contrato da API (`POST /api/classify`)

**Exemplo de Entrada (Enviado pelo n8n):**
```json
{
  "message": "Meu pedido atrasou mais de 5 dias e não recebi o código de rastreio.",
  "customerName": "Ana Souza"
}
```

**Exemplo de Saída (Retornado pela IA via API):**
```json
{
  "success": true,
  "data": {
    "category": "Reclamação",
    "urgency": "Alta",
    "sentiment": "Negativo",
    "department": "Logística / Atendimento",
    "summary": "Cliente relata atraso de 5 dias na entrega e ausência de código de rastreio."
  }
}
```

---

## 6. Como Executar

### Pré-requisitos

* Node.js (v20 ou superior)
* Gerenciador de pacotes (`pnpm` ou `npm`)
* Instância do **n8n** (local ou via Docker)
* Chave de API do provedor de IA escolhido

### Passo 1: Clonar o repositório e instalar dependências

```bash

git clone https://github.com/tatyanepgoncalves/kodiflow-backend.git
cd kodiflow-backend
pnpm install
```

### Passo 2: Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto baseado no arquivo `.env.example`:

```bash
cp .env.example .env
```

Preencha as variáveis necessárias no `.env`:

```env
PORT=3333
AI_API_KEY=sua_chave_de_api_aqui
```

### Passo 3: Iniciar a API

```bash
pnpm run dev
```

O servidor estará disponível em `http://localhost:3333`.

### Passo 4: Configurar o Fluxo no n8n

1. Importe o arquivo JSON do fluxo localizado na pasta `/n8n` (ou configure os nodes `Webhook` e `HTTP Request`).
2. Aponte o node `HTTP Request` para `http://localhost:3333/api/classify` (ou `http://host.docker.internal:3333/api/classify` caso o n8n esteja rodando em container Docker).
3. Ative o fluxo e envie uma requisição de teste para o Webhook.

---

## 7. Documentação do Fluxo de Automação (n8n)

> *Nota: Esta seção será preenchida com as capturas de tela (prints) após a finalização da implementação do fluxo no n8n.*

* **[ ] Visão Geral do Fluxo:** Captura de tela exibindo todos os nodes conectados.
* **[ ] Configuração do Webhook:** Detalhes do método HTTP e rota de entrada.
* **[ ] Configuração do HTTP Request:** Parâmetros de envio para a API Express.
* **[ ] Execução Bem-Sucedida & Resultados:** Demonstração dos dados recebidos e classificados em JSON.
