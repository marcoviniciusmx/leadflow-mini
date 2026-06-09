<h1 align="center">LeadFlow Mini</h1>

<p align="center">
  Aplicação FullStack desenvolvida para cadastrar, organizar e acompanhar leads comerciais de forma simples, utilizando Node.js, Express, PostgreSQL, React.js e SQL puro.
</p>

<p align="center">
  <a href="#-about-the-project">Sobre o projeto</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#-features">Funcionalidades</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#-technologies">Tecnologias</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#-project-structure">Estrutura</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#-layout-and-design-decisions">Layout</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#-getting-started">Como executar</a>
</p>

<br>

<p align="center">
  <img alt="LeadFlow Mini Preview" src="./preview.png" width="100%">
</p>

---

## 🏠 About the project

O **LeadFlow Mini** é uma aplicação FullStack básica desenvolvida para auxiliar freelancers e pequenos prestadores de serviço a organizarem leads e oportunidades comerciais.

A proposta do projeto é permitir o cadastro, listagem, atualização e exclusão de leads, armazenando informações como nome do negócio, contato, telefone, segmento, status da negociação, valor estimado da proposta, próxima data de follow-up e observações.

Este projeto foi desenvolvido principalmente com foco no reforço dos fundamentos de back-end, utilizando Node.js, Express, PostgreSQL, SQL puro e Docker.

O front-end em React.js foi utilizado como uma interface simples para consumir a API, visualizar os dados persistidos no banco e validar o fluxo completo da aplicação FullStack.

---

## 🧰 Features

* API REST criada com Node.js e Express
* Banco de dados PostgreSQL rodando localmente via Docker
* Conexão do back-end com PostgreSQL utilizando o driver `pg`
* Criação da tabela `leads` com SQL puro
* Listagem de leads cadastrados
* Cadastro de novos leads
* Atualização de status dos leads
* Exclusão de leads
* Validação básica de campo obrigatório no back-end
* Testes de endpoints com Thunder Client
* Front-end em React.js consumindo dados reais da API
* Integração entre React, Node.js, Express e PostgreSQL
* Persistência real dos dados no banco
* Estrutura organizada em rotas, controllers e configuração de banco
* Projeto criado como base de estudo para reforçar fundamentos FullStack

---

## 💻 Technologies

Este projeto foi desenvolvido com as seguintes tecnologias:

### Front-end

* React.js
* Vite
* JavaScript
* Fetch API
* CSS

### Back-end

* Node.js
* Express.js
* PostgreSQL
* SQL puro
* Driver `pg`
* dotenv
* cors
* express.json

### Ferramentas

* Docker
* Thunder Client
* Git
* GitHub
* VS Code
* npm

---

## 👷 Project structure

A estrutura principal do projeto está organizada em duas camadas: front-end e back-end.

```bash
leadflow-mini/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   └── leads.controller.js
│   │   ├── database/
│   │   │   └── schema.sql
│   │   ├── routes/
│   │   │   └── leads.routes.js
│   │   └── server.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   │   └── leadsService.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

---

## 🏗️ Layout and design decisions

O layout do projeto foi mantido simples e objetivo, já que o foco principal da aplicação foi o estudo e consolidação do back-end.

A interface em React.js foi desenvolvida para validar o consumo da API, permitindo visualizar os leads cadastrados, criar novos registros, atualizar status e excluir leads diretamente pela tela.

Alguns pontos de destaque no layout:

* estrutura simples e funcional
* listagem direta dos leads cadastrados
* exibição de informações comerciais importantes
* integração real com dados vindos do PostgreSQL
* interface usada como camada de validação da API
* foco em clareza e aprendizado, não em design avançado
* base preparada para futuras melhorias visuais e componentização

---

## 🔰 Getting Started

### Prerequisites

Antes de começar, você vai precisar ter instalado:

* Git
* Node.js
* npm
* Docker Desktop
* VS Code
* Thunder Client ou ferramenta similar para testes de API

---

### Clone the repository

```bash
git clone https://github.com/seu-usuario/leadflow-mini.git
```

Acesse a pasta do projeto:

```bash
cd leadflow-mini
```

---

## ⚙️ Back-end setup

Acesse a pasta do back-end:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` dentro da pasta `backend` com as variáveis necessárias:

```env
PORT=3002

DB_HOST=localhost
DB_PORT=5433
DB_USER=leadflow
DB_PASSWORD=leadflow123
DB_NAME=leadflow_db
```

Suba o container PostgreSQL com Docker:

```bash
docker run --name leadflow-postgres -e POSTGRES_USER=leadflow -e POSTGRES_PASSWORD=leadflow123 -e POSTGRES_DB=leadflow_db -p 5433:5432 -d postgres
```

Acesse o PostgreSQL dentro do container:

```bash
docker exec -it leadflow-postgres psql -U leadflow -d leadflow_db
```

Execute o script SQL disponível em:

```bash
backend/src/database/schema.sql
```

Depois, inicie o servidor:

```bash
npm run dev
```

O back-end estará rodando em:

```bash
http://localhost:3002
```

Rotas principais da API:

```bash
GET    /leads
POST   /leads
PATCH  /leads/:id
DELETE /leads/:id
```

---

## 🎨 Front-end setup

Em outro terminal, acesse a pasta do front-end:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o front-end:

```bash
npm run dev
```

O front-end estará rodando em:

```bash
http://localhost:5174
```

---

## 📌 API endpoints

### Listar leads

```bash
GET /leads
```

Retorna todos os leads cadastrados no banco de dados.

---

### Criar lead

```bash
POST /leads
```

Exemplo de body:

```json
{
  "business_name": "Barbearia Estilo Fino",
  "contact_name": "Rafael",
  "phone": "61988887777",
  "segment": "Barbearia",
  "status": "Novo",
  "proposal_value": 900,
  "next_follow_up_date": "2026-06-12",
  "notes": "Lead interessado em landing page com botão para WhatsApp."
}
```

---

### Atualizar lead

```bash
PATCH /leads/:id
```

Exemplo de body:

```json
{
  "status": "Proposta enviada",
  "proposal_value": 1200,
  "next_follow_up_date": "2026-06-15",
  "notes": "Cliente recebeu proposta e pediu retorno na próxima semana."
}
```

---

### Deletar lead

```bash
DELETE /leads/:id
```

Remove um lead pelo seu identificador.

---

## 📚 What I learned

Durante o desenvolvimento deste projeto, pratiquei conceitos importantes de desenvolvimento FullStack, principalmente no back-end:

* criação de servidor com Node.js e Express
* configuração de variáveis de ambiente com dotenv
* uso de middlewares como cors e express.json
* conexão do Node.js com PostgreSQL utilizando `pg`
* criação de tabela relacional com SQL puro
* definição de campos obrigatórios, opcionais, valores padrão e timestamps
* construção de API REST com GET, POST, PATCH e DELETE
* uso de parâmetros de rota com `req.params`
* uso de corpo da requisição com `req.body`
* testes de endpoints com Thunder Client
* execução do PostgreSQL localmente com Docker
* integração entre React.js e API própria
* renderização de dados reais vindos do banco de dados
* prática de CRUD completo com persistência real
* organização inicial do back-end em routes, controllers e config

---

## 🚀 Next steps

Melhorias planejadas para futuras versões:

* Melhorar a interface visual
* Componentizar o front-end
* Criar filtros por status
* Criar cards de resumo
* Adicionar busca por nome do negócio
* Melhorar validações no back-end
* Adicionar tratamento de erros com try/catch nos controllers
* Criar rota para buscar lead por ID
* Melhorar responsividade
* Adicionar deploy futuramente

---

## 👨‍💻 Author

Desenvolvido por Marco Vinícius Menezes Xavier.

[LinkedIn](https://www.linkedin.com/in/marcoviniciusmx) | [GitHub](https://github.com/marcoviniciusmx)
