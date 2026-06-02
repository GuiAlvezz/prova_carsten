# Frontend Prova — Documentação

Aplicação web de autenticação desenvolvida em **React + Vite**, com tema visual **azul e dourado**, suporte a tema claro/escuro e integração com API REST.

---

## Índice

- [Tecnologias](#tecnologias)
- [Instalação e execução](#instalação-e-execução)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Fluxo da aplicação](#fluxo-da-aplicação)
- [Páginas](#páginas)
- [Componentes](#componentes)
- [Serviços](#serviços)
- [Estilização](#estilização)
- [Variáveis de tema](#variáveis-de-tema)

---

## Tecnologias

| Tecnologia | Versão | Finalidade |
|---|---|---|
| React | 19 | Interface de usuário |
| Vite | 8 | Bundler e servidor de desenvolvimento |
| React Router DOM | 7 | Roteamento entre páginas |
| Axios | 1.16 | Requisições HTTP para a API |
| Tailwind CSS | 4 | Utilitários CSS |

---

## Instalação e execução

### Pré-requisitos

- Node.js **18+**
- npm

### Passos

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd frontend-prova

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção na pasta `dist/` |
| `npm run preview` | Visualiza o build de produção localmente |
| `npm run lint` | Executa o ESLint para verificar o código |

---

## Estrutura do projeto

```
frontend-prova/
├── public/
├── src/
│   ├── assets/                  # Imagens das páginas
│   │   ├── login_img.png
│   │   ├── create_account.png
│   │   ├── recover_account.png
│   │   └── verify_account.png
│   ├── components/
│   │   ├── ThemeToggle.jsx      # Botão de alternância de tema
│   │   └── ThemeToggle.css
│   ├── pages/
│   │   ├── Login.jsx            # Tela de login
│   │   ├── Register.jsx         # Tela de cadastro
│   │   ├── VerifyCode.jsx       # Verificação de e-mail
│   │   ├── ForgotPassword.jsx   # Recuperação de senha
│   │   ├── ResetPassword.jsx    # Redefinição de senha
│   │   └── Profile.jsx          # Perfil do usuário
│   ├── routes/
│   │   └── PrivateRoute.jsx     # Proteção de rotas autenticadas
│   ├── services/
│   │   └── api.js               # Configuração do Axios
│   ├── styles/
│   │   ├── global.css
│   │   ├── login.css
│   │   ├── register.css
│   │   ├── verifyCode.css
│   │   ├── forgotPassword.css
│   │   ├── resetPassword.css
│   │   └── profile.css
│   ├── App.jsx                  # Roteador principal
│   ├── index.css                # Variáveis globais de tema
│   └── main.jsx                 # Ponto de entrada
└── package.json
```

---

## Fluxo da aplicação

```
┌─────────┐     cadastro     ┌──────────┐     código     ┌─────────────┐
│  Login  │ ──────────────► │ Register │ ─────────────► │ VerifyCode  │
└─────────┘                  └──────────┘                └─────────────┘
     │                                                          │
     │ login OK                                         verificado OK
     │                                                          │
     ▼                                                          ▼
┌─────────┐                                             ┌─────────────┐
│ Profile │ ◄───────────────────────────────────────── │    Login    │
└─────────┘                                             └─────────────┘
     │
     │ "Alterar Senha"
     ▼
┌────────────────┐    envia código    ┌───────────────┐
│ ForgotPassword │ ─────────────────► │ ResetPassword │
└────────────────┘                    └───────────────┘
```

---

## Páginas

### Login — `/`

Tela inicial da aplicação. O usuário informa e-mail e senha para autenticar.

- **Ação principal:** `POST /api/v1/auth/login` com `{ email, senha }`
- **Sucesso:** token salvo no `localStorage` e redirecionamento para `/profile`
- **Botões:**
  - **Entrar** — submete o formulário (dourado, primário)
  - **Criar Conta** — navega para `/register` (contorno, secundário)
  - **Esqueci minha senha** — navega para `/forgot-password` (link discreto)

---

### Register — `/register`

Formulário de criação de nova conta.

- **Campos:** Nome, E-mail, Senha
- **Ações:**
  1. `POST /api/v1/auth/register` com `{ nome, email, senha }`
  2. `POST /api/v1/auth/send-code` com `{ email }` — envia código de verificação automaticamente
- **Sucesso:** redirecionamento para `/verify-code`

---

### VerifyCode — `/verify-code`

Validação do código enviado por e-mail após o cadastro.

- **Campos:** E-mail, Código recebido
- **Ação:** `POST /api/v1/auth/validate-code` com `{ email, codigo }`
- **Sucesso:** conta ativada, redirecionamento para `/` (login)

---

### ForgotPassword — `/forgot-password`

Solicita o envio de um código de recuperação para o e-mail informado.

- **Campos:** E-mail
- **Ação:** `POST /api/v1/auth/forgot-password` com `{ email }`
- **Sucesso:** redirecionamento para `/reset-password`

---

### ResetPassword — `/reset-password`

Redefinição da senha usando o código recebido por e-mail.

- **Campos:** E-mail, Código de verificação, Nova senha (mín. 8 caracteres)
- **Ação:** `POST /api/v1/auth/reset-password` com `{ email, codigo, senha }`
- **Validação local:** a nova senha deve ter pelo menos 8 caracteres antes de enviar
- **Sucesso:** senha alterada, redirecionamento para `/`

---

### Profile — `/profile`

Área autenticada com informações do usuário logado.

- **Autenticação:** token lido do `localStorage` e enviado no header `X-Access-Token`
- **Ação:** `GET /api/v1/user/me`
- **Exibe:** nome, e-mail, ID, status de verificação, data de cadastro, estatísticas
- **Botões:**
  - **Alterar Senha** — navega para `/forgot-password`
  - **Sair** — remove token do `localStorage` e redireciona para `/`

> **Modo de visualização:** quando o token está expirado ou ausente, a página exibe dados de exemplo (mock) para fins de desenvolvimento.

---

## Componentes

### ThemeToggle

Botão fixo no canto superior direito que alterna entre tema escuro e claro.

- Aparece em todas as páginas (declarado no `App.jsx`)
- Persiste a preferência no `localStorage` com a chave `"theme"`
- Aplica o atributo `data-theme="light"` ou `data-theme="dark"` no elemento `<html>`

---

### PrivateRoute

Componente de proteção de rota. Redireciona para `/` caso não exista token no `localStorage`.

```jsx
// Uso no App.jsx
<Route path="/profile" element={
  <PrivateRoute>
    <Profile />
  </PrivateRoute>
} />
```

---

## Serviços

### api.js

Instância do Axios pré-configurada com a URL base e o header de autorização da API.

```js
// src/services/api.js
const api = axios.create({
  baseURL: "https://api.carsten.com.br/api/prova",
  headers: {
    Authorization: "Bearer <token-de-acesso>"
  }
});
```

Todas as páginas importam e utilizam essa instância para as requisições:

```js
import api from "../services/api";

const response = await api.post("/api/v1/auth/login", { email, senha });
```

---

## Estilização

Cada página possui seu próprio arquivo CSS em `src/styles/`. As animações e o layout seguem um padrão comum em todas as páginas:

| Elemento | Comportamento |
|---|---|
| Imagem lateral | Entra deslizando da esquerda (`slideInLeft`) ao carregar |
| Card de formulário | Entra deslizando da direita (`slideInRight`) ao carregar |
| Imagem (loop) | Flutua suavemente com leve rotação (`floatSmooth`, 6s) |
| Card do perfil | Sobe suavemente ao carregar (`fadeSlideUp`) |
| Botões | Sobem 3px no hover com aumento de sombra |

---

## Variáveis de tema

Definidas em `src/index.css` e utilizadas em todos os arquivos CSS de página.

| Variável | Tema escuro | Tema claro |
|---|---|---|
| `--page-bg` | Gradiente azul escuro | Gradiente branco/azul claro |
| `--card-bg` | `rgba(8,18,42,0.75)` | `rgba(255,255,255,0.85)` |
| `--card-border` | `rgba(255,255,255,0.07)` | `rgba(0,0,0,0.08)` |
| `--input-bg` | `rgba(255,255,255,0.04)` | `rgba(0,0,0,0.03)` |
| `--text-primary` | `#e2e8f0` (cinza claro) | `#1e293b` (azul escuro) |
| `--text-muted` | `#94a3b8` | `#64748b` |
| `--text-heading` | `#facc15` (dourado) | `#1d4ed8` (azul) |
| `--img-shadow` | Sombra escura | Sombra azulada |
