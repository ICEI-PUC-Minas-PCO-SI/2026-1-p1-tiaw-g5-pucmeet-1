# Código-fonte - PucMeet

Esta é a pasta destinada à manutenção do programa **PucMeet**, uma plataforma social desenvolvida para facilitar a integração e interação entre alunos da Pontifícia Universidade Católica (PUC).

## Descrição do projeto

O PucMeet é uma aplicação web responsiva que permite aos usuários:
- Criar e compartilhar postagens no fórum
- Interagir com postagens de outros usuários (curtir e comentar)
- Gerenciar seu perfil pessoal
- Consultar histórico de postagens
- Conectar-se com colegas que possuem interesses semelhantes

A estrutura de diretórios foi organizada para facilitar o desenvolvimento e manutenção do código. Segue abaixo a estrutura utilizada:

```plaintext
src/  (esta pasta aqui - código-fonte do PucMeet)
│
├── db/
│   └── dados.json (dados iniciais/mock - usuários, postagens, comentários)
│
├── public/ (site - front-end)
│   ├── assets/
│   │   └── images/
│   │       └── (imagens utilizadas na interface)
│   │
│   ├── modulos/
│   │   ├── login/
│   │   │   ├── login.html (página de login)
│   │   │   ├── cadastro.html (página de cadastro)
│   │   │   ├── css/
│   │   │   │   ├── style.css (estilos da página de login)
│   │   │   │   └── cadastro.css (estilos da página de cadastro)
│   │   │   └── js/
│   │   │       └── cadastro.js (lógica de cadastro)
│   │   │
│   │   ├── homepage/
│   │   │   ├── index.html (página principal com feed de postagens)
│   │   │   ├── css/
│   │   │   │   └── styleHomepage.css (estilos da homepage)
│   │   │   └── js/
│   │   │       └── scriptHomepage.js (lógica da homepage)
│   │   │
│   │   ├── criar-post/
│   │   │   ├── criarPost.html (formulário para criar postagem)
│   │   │   └── css/
│   │   │       └── styleCriarPost.css (estilos do formulário)
│   │   │
│   │   ├── post/
│   │   │   ├── post.html (página de detalhes da postagem)
│   │   │   ├── css/
│   │   │   │   └── stylePost.css (estilos da página de postagem)
│   │   │   └── js/
│   │   │       └── scriptPost.js (lógica de interações na postagem)
│   │   │
│   │   └── perfil/
│   │       ├── perfil.html (página de perfil do usuário)
│   │       ├── css/
│   │       │   └── style.css (estilos do perfil)
│   │       └── js/
│   │           └── scriptPerfil.js (lógica do perfil)
│   │
│   └── index.html (página inicial que redireciona para login/homepage)
│
|
└── README.md (este arquivo)
```

## Parte front-end

A interface do PucMeet foi desenvolvida utilizando HTML5, CSS3 e JavaScript vanilla (com ES Modules), organizada em módulos para melhor manutenção e escalabilidade.

### Estrutura dos módulos

* **Pasta `assets`**: Contém imagens utilizadas na interface do PucMeet (logos, ícones, fotos de perfil, etc.)

* **Pasta `modulos`**: Cada funcionalidade principal do PucMeet está organizada em uma subpasta específica:
  - **`login/`**: Módulo de autenticação e cadastro de usuários
    - `login.html`: Formulário de login
    - `cadastro.html`: Formulário de cadastro de novo usuário
    - Estilos CSS específicos para cada página
    - Lógica JavaScript para validação de formulários e autenticação via `localStorage`
  
  - **`homepage/`**: Módulo principal com feed de postagens
    - Exibe todas as postagens carregadas a partir dos dados salvos em `localStorage`
    - Permite navegação e interação
  
  - **`criar-post/`**: Módulo para criação de novas postagens
    - Formulário para escrever e publicar postagens, persistidas diretamente no `localStorage`
  
  - **`post/`**: Módulo para visualizar detalhes de uma postagem
    - Exibe postagem completa com comentários e curtidas
    - Lógica para curtir e comentar, atualizando os dados no `localStorage`
  
  - **`perfil/`**: Módulo de gerenciamento de perfil
    - Visualizar informações do usuário
    - Editar perfil (nome, foto, etc.)
    - Histórico de postagens do usuário

* **Arquivo `index.html`**: Página de entrada da aplicação que realiza redirecionamentos conforme o estado de autenticação do usuário (verificado via `sessionStorage`/`localStorage`)

## Parte de persistência de dados

Diferente de uma aplicação com back-end tradicional, o PucMeet **não utiliza servidor (Node.js) nem JSON Server**. Toda a persistência de dados é feita no navegador, através das APIs `localStorage` e `sessionStorage`.

### Componentes da persistência

* **Arquivo `dados.json`**: Contém a massa de dados inicial (mock) da aplicação — usuários, postagens e comentários. Esse arquivo é carregado uma única vez (geralmente no primeiro acesso) e seu conteúdo é copiado para o `localStorage`, que passa a ser a fonte de verdade dos dados durante o uso da aplicação:
  - Usuários cadastrados (nome, email, senha, foto de perfil, etc.)
  - Postagens (conteúdo, autor, data, curtidas, comentários)
  - Comentários em postagens
  - Informações de interações entre usuários

* **`localStorage`**: Utilizado para persistir os dados da aplicação (usuários, postagens, comentários) entre sessões do navegador, já que não há um servidor/back-end armazenando essas informações.

* **`sessionStorage`**: Utilizado para controlar o estado de autenticação (usuário logado) durante a sessão atual do navegador.

> **Importante**: como os dados ficam salvos apenas no navegador do usuário, cada pessoa que acessar a aplicação terá sua própria "base de dados" local. Não há sincronização entre diferentes usuários/dispositivos.

## Setup e execução do ambiente

### Pré-requisitos

- Um navegador atualizado (Chrome, Firefox, Edge, etc.)
- **Git** para controle de versão (opcional)
- Alguma forma de servir os arquivos estáticos, já que módulos ES (`import`/`export`) não funcionam abrindo o `.html` diretamente via `file://`. Algumas opções:
  - Extensão **Live Server** do VS Code
  - Pacote `live-server` via npm (`npx live-server`)
  - Qualquer outro servidor estático de sua preferência

### Instalação e execução

1. **Abra o projeto** na pasta raiz (onde está este README), de preferência no VS Code.

2. **Inicie um servidor estático local**, por exemplo:
   - Usando a extensão Live Server do VS Code: clique com o botão direito em `public/index.html` e selecione "Open with Live Server"; ou
   - Usando npx: 
     ```
     npx live-server public
     ```

3. **Acesse a aplicação** pela URL fornecida (geralmente algo como `http://127.0.0.1:5500`).

4. **Primeiro acesso**: na primeira vez que a aplicação for aberta, os dados de `dados.json` serão carregados e salvos no `localStorage` do navegador. Nos acessos seguintes, os dados já estarão disponíveis localmente.

### Estrutura de dados (dados.json / localStorage)

O arquivo `db/dados.json` (e, posteriormente, o `localStorage`) deve conter as seguintes coleções de dados:

```json
{
  "usuarios": [
    {
      "id": 1,
      "nome": "Nome do Usuário",
      "email": "usuario@puc.br",
      "senha": "senha_criptografada",
      "fotoPerfil": "url_da_foto",
      "dataCadastro": "2026-01-01"
    }
  ],
  "postagens": [
    {
      "id": 1,
      "autorId": 1,
      "titulo": "Título da postagem",
      "conteudo": "Conteúdo da postagem",
      "dataCriacao": "2026-01-01T10:30:00",
      "curtidas": 5,
      "comentarios": []
    }
  ]
}
```

### Resolução de problemas

**A aplicação não carrega os módulos JavaScript (erro de CORS/módulo)?**
- Verifique se está acessando a aplicação através de um servidor local (Live Server, `live-server`, etc.) e não abrindo o arquivo `.html` diretamente pelo navegador (`file://`)
- ES Modules exigem que os arquivos sejam servidos via `http://`

**Os dados não aparecem ou parecem "resetados"?**
- Verifique se o `localStorage` do navegador não foi limpo (aba anônima, limpeza de cache, etc.)
- Confirme, pelo DevTools (F12 → Application → Local Storage), se as chaves esperadas estão presentes
- Se necessário, limpe o `localStorage` manualmente e recarregue a página para que os dados de `dados.json` sejam recarregados

**O login não persiste entre páginas?**
- Verifique se o `sessionStorage` está sendo corretamente definido no momento do login
- Confirme que todas as páginas verificam o `sessionStorage` da mesma forma (mesma chave/nome)

## Equipe de desenvolvimento

O PucMeet foi desenvolvido pela **Turma G5** da disciplina de TIAW (Tecnologia da Informação para Aplicações Web) no 1º Período de 2026 na PUC.

### Componentes do projeto

O projeto está organizado em três partes principais:

1. **Documentação** (pasta `/docs`): Contém toda a especificação do projeto, design, testes e metodologia
2. **Código-fonte** (pasta `/src`): Contém o código front-end e a lógica de persistência via `localStorage`
3. **Apresentação** (pasta `/presentation`): Recursos para apresentação do projeto

Para mais informações sobre as fases do projeto, consulte:
- [Contexto do projeto](../docs/01-Contexto.md)
- [Especificação de requisitos](../docs/03-Product-design.md)
- [Design da interface](../docs/05-Projeto-interface.md)
- [Plano de testes](../docs/08-Plano-testes-software.md)

## Dúvidas e suporte

Caso tenha dúvidas sobre:
- **Servidor estático local (Live Server, etc.)**: Consulte a documentação da extensão/ferramenta escolhida
- **Estrutura do projeto**: Revise a documentação na pasta `/docs`
- **Funcionalidades do PucMeet**: Consulte a especificação de requisitos em [03-Product-design.md](../docs/03-Product-design.md)
- **Problemas técnicos**: Procure a monitoria ou entre em contato com a equipe de desenvolvimento

**Última atualização**: Julho de 2026