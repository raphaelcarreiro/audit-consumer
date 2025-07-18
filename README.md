# 📡 Audit Consumer

Consumidor de mensagens Kafka construído com [NestJS](https://nestjs.com/), responsável por processar e armazenar logs de auditoria em aplicações distribuídas.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** (NestJS)
- **TypeScript**
- **Kafka** (mensageria)
- **Docker & Docker Compose**
- **ElasticSearch** (armazenamento opcional de auditoria)
- **ESLint & Prettier** (padronização de código)

---

## 📂 Estrutura do Projeto

```plaintext
.
├── src/                          # Código fonte
│   └── core/application/        # Casos de uso e regras de negócio
│   └── main.ts                  # Bootstrap da aplicação
├── .devcontainer/               # Configurações para Dev Containers (VSCode)
├── .vscode/                     # Configurações para debugging
├── docker-compose.yml           # Orquestração de serviços com Docker
├── Dockerfile                   # Imagem da aplicação
├── package.json                 # Dependências e scripts
├── README.md                    # Este arquivo
└── .env.sample                  # Exemplo de variáveis de ambiente
```

---

## ⚙️ Requisitos

- Docker
- Docker Compose
- Kafka rodando localmente ou em container
- Node.js (opcional para desenvolvimento fora do container)

---

## 🐳 Executando com Docker

1. Copie o arquivo de variáveis de ambiente:

   ```bash
   cp .env.sample .env
   ```

2. Inicie os containers:
   ```bash
   docker compose up --build
   ```

> **Nota:** Certifique-se de que o Kafka está acessível no host ou via container linkado.

---

## 📦 Scripts Úteis

- `npm run start:dev` — Inicia em modo de desenvolvimento (hot reload)
- `npm run lint` — Analisa o código com ESLint
- `npm run build` — Compila a aplicação

---

## 🧱 Dev Container (VSCode)

Este projeto possui suporte nativo para desenvolvimento em **Dev Containers**. Basta abrir no VSCode e selecionar “Reabrir no Container”.

---

## 🧾 Licença

Projeto de código fechado. Todos os direitos reservados.
