# 🛡️ Spring Security JWT — Frontend

<p align="center">
  <img src="https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" />
</p>

<p align="center">
  Aplicação frontend que demonstra o fluxo completo de autenticação com JWT, consumindo a API Spring Security JWT.
</p>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Tecnologias](#-tecnologias)
- [Como Executar](#-como-executar)
- [Fluxo de Autenticação](#-fluxo-de-autenticação)
- [API Relacionada](#-api-relacionada)

---

## 📌 Sobre o Projeto

Interface web desenvolvida em **React + TypeScript** para demonstrar o fluxo de autenticação com **JWT**. O usuário realiza login, o token é armazenado e utilizado nas requisições subsequentes. Rotas protegidas bloqueiam o acesso de usuários não autenticados, redirecionando-os automaticamente para a página de login.

> [!NOTE]
> **O foco deste projeto é o fluxo de autenticação, não o design.** As páginas são intencionalmente simples — o dashboard, por exemplo, exibe apenas um link diferente dependendo da role do usuário (`ROLE_ADMIN` ou `ROLE_USER`), demonstrando o controle de acesso baseado em roles funcionando no frontend.

---

## ✅ Funcionalidades

- 🔐 **Tela de login** integrada à API de autenticação
- 🔄 **Redirecionamento automático** — usuários não autenticados são enviados para `/login`, usuários já logados são redirecionados para o dashboard
- 🛤️ **Rotas protegidas** via componente `PrivateRoute` com React Router
- 👤 **Contexto de autenticação** global gerenciado pelo `AuthProvider`
- 🗂️ **Dashboard** acessível apenas após autenticação bem-sucedida
- ❌ **Página 404** para rotas inexistentes (`NotFound`)
- ⏳ **Loading Spinner** durante requisições assíncronas

---

## 🗂️ Estrutura do Projeto

```
src/
│
├── assets/kingstone-font/        # Fonte customizada Kingstone
│
├── components/layout/
│   ├── header/                   # Componente de cabeçalho
│   ├── footer/                   # Componente de rodapé
│   └── loadingSpinner/           # Spinner de carregamento
│
├── connection/
│   └── Api.ts                    # Cliente Axios com interceptors de request e response
│
├── pages/
│   ├── dashboard/                # Página principal pós-login
│   ├── error/
│   │   └── NotFound.tsx          # Página 404
│   ├── home/                     # Página inicial
│   └── security/
│       ├── Login.tsx             # Tela de login
│       └── PrivateRoute.tsx      # Guarda de rotas protegidas
│
├── provider/
│   ├── AuthProvider.tsx          # Contexto global: token, roles, isAuthenticated, login(), logout()
│   └── authService.ts            # Ponte de logout entre o Axios e o AuthProvider via callback
│
├── App.tsx
├── Router.tsx                    # Definição de todas as rotas da aplicação
├── main.tsx
└── global.css
```

---

## 🛠️ Tecnologias

| Tecnologia | Descrição |
|---|---|
| React 18 | Biblioteca principal de UI |
| TypeScript | Tipagem estática |
| React Router v6 | Roteamento e proteção de rotas |
| Axios | Cliente HTTP com interceptors |
| jwt-decode | Decodificação do payload do JWT (roles) |
| Vite | Bundler e servidor de desenvolvimento |
| CSS Modules | Estilização com escopo por componente |

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18 ou superior
- API backend em execução ([ver repositório da API](https://github.com/Sam-Umbra/SpringBootSecurityJWT))

### Passos

1. **Clone o repositório**
   ```bash
   git clone https://github.com/sam-umbra/secure-jwt-site.git
   cd spring-security-jwt-frontend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure a URL da API**

   Edite o arquivo `src/connection/Api.ts` com a URL base do seu backend:
   ```ts
   const api = axios.create({ baseURL: "http://localhost:8080" });
   ```

4. **Execute o projeto**
   ```bash
   npm run dev
   ```

   A aplicação estará disponível em `http://localhost:5173`.

---

## 🔐 Fluxo de Autenticação

### Inicialização da aplicação

Ao carregar, o `AuthProvider` verifica se há um token salvo no `localStorage`. Se existir, faz uma requisição para `GET /private` para validá-lo junto à API. Em caso de sucesso, decodifica o token com `jwt-decode` para extrair as `roles` e define o usuário como autenticado. Se a validação falhar, executa o logout automaticamente.

```
App carrega
     │
     ▼
AuthProvider verifica localStorage
     │
  ┌──┴──────────────┐
Sem token        Token encontrado
  │                  │
  ▼                  ▼
loading: false   GET /private (valida token)
                     │
              ┌──────┴──────┐
           Sucesso        Falha (401)
              │                │
              ▼                ▼
    Decodifica JWT          logout()
    extrai roles[]
    isAuthenticated: true
```

### Login

```
Usuário submete o formulário de login
              │
              ▼
      POST /auth/login
              │
       ┌──────┴──────┐
    Sucesso        Falha (401)
       │                │
       ▼                ▼
  login(token)     Exibe erro
  └─ salva no localStorage
  └─ decodifica JWT → extrai roles[]
  └─ isAuthenticated: true
       │
       ▼
  Redireciona para Dashboard
```

### Acesso a rotas protegidas

```
Usuário acessa rota protegida
              │
              ▼
   PrivateRoute consulta AuthProvider
              │
       ┌──────┴──────┐
  isAuthenticated   não autenticado
       │                │
       ▼                ▼
   Renderiza        Redireciona para /login
   a página
```

### Logout automático por token expirado

O `Api.ts` registra o callback de logout via `authService` no momento em que o `AuthProvider` é montado. Com isso, qualquer resposta `401` fora do endpoint `/auth/login` dispara o logout de forma desacoplada, sem o Axios precisar conhecer o contexto React diretamente.

```
API retorna 401 em qualquer rota
              │
              ▼
  Response interceptor (Api.ts)
              │
              ▼
       triggerLogout()
              │
              ▼
  logoutCallback() → logout() no AuthProvider
  └─ limpa token do localStorage
  └─ reseta estado do contexto
  └─ redireciona para /
```

---

## 🔗 API Relacionada

Este frontend consome a API REST desenvolvida com Spring Boot + Spring Security:

👉 [Sam-Umbra/SpringBootSecurityJWT](https://github.com/Sam-Umbra/SpringBootSecurityJWT)

---
