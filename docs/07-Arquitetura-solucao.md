# Arquitetura da solução

<span style="color:red">Pré-requisitos: <a href="05-Projeto-interface.md"> Projeto de interface</a></span>

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

**Diagrama Conceitual da Arquitetura:**
```
┌─────────────────────────────────────────────────────┐
│         Navegador do Usuário (Cliente)              │
├─────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │
│  │   HTML/CSS   │  │ JavaScript   │  │   DOM    │ │
│  │   (Layout)   │  │   (Lógica)   │  │(Interface)│ │
│  └──────────────┘  └──────────────┘  └──────────┘ │
│         ↓                ↓                  ↓       │
│  ┌─────────────────────────────────────────────┐  │
│  │   localStorage & sessionStorage (Dados)     │  │
│  └─────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────┘
                       │
          ┌────────────┴────────────┐
          ↓                         ↓
   ┌─────────────┐         ┌──────────────┐
   │ PucMeet-db  │         │   GitHub    │
   │   (JSON)    │         │   (Versão)  │
   └─────────────┘         └──────────────┘
```

## Funcionalidades

Esta seção apresenta as funcionalidades da solução.

##### Funcionalidade 1 - Autenticação e Cadastro de Usuários

Permite o cadastro de novos usuários e autenticação no sistema PucMeet.

* **Estrutura de dados:** [Usuários](#estrutura-de-dados---usuários)
* **Instruções de acesso:**
  * Abra a página de Login/Cadastro do sistema;
  * Para novo usuário: clique em "Cadastro" e preencha nome, e-mail;
  * Para login: preencha nome e e-mail dos usuários cadastrados;
  * Após autenticação, será redirecionado para a Homepage.

##### Funcionalidade 2 - Criar e Gerenciar Posts

Permite a criação, leitura, edição e exclusão de posts (tópicos/discussões) na plataforma.

* **Estrutura de dados:** [Posts](#estrutura-de-dados---posts)
* **Instruções de acesso:**
  * Após fazer login, acesse a Homepage;
  * Clique em "Criar Post" para abrir o formulário de novo post;
  * Preencha título, descrição e categorias;
  * Clique em "Publicar" para salvar o post;
  * Posts podem ser editados ou deletados apenas pelo autor.

##### Funcionalidade 3 - Comentários em Posts

Permite adicionar, ler, editar e deletar comentários em posts específicos.

* **Estrutura de dados:** [Comentários](#estrutura-de-dados---comentários)
* **Instruções de acesso:**
  * Clique em um post na Homepage para abrir seus detalhes;
  * Role para visualizar comentários existentes;
  * Digite um comentário no campo de texto e pressione Enter ou clique "Enviar";
  * Seus comentários podem ser editados ou deletados;
  * Clique no ícone de coração (👍) para curtir comentários.

##### Funcionalidade 4 - Filtro e Ordenação

Funcionalidades de busca, filtro e ordenação de posts e comentários.

* **Instruções de acesso:**
  * **Filtro por autor:** Na página de post, selecione um autor no dropdown para mostrar apenas seus comentários;
  * **Busca por título:** Use a barra de busca na Homepage para encontrar posts;
  * **Ordenação:** Posts podem ser ordenados por data, nome do autor, quantidade de comentários e curtidas;
  * **Ordenação de comentários:** Ordenar por data ou curtidas.

##### Funcionalidade 5 - Perfil do Usuário

Permite visualizar e editar informações do perfil do usuário logado.

* **Estrutura de dados:** [Usuários](#estrutura-de-dados---usuários)
* **Instruções de acesso:**
  * Clique no ícone de perfil ou nome do usuário na navegação;
  * Visualize dados como e-mail, interesses e estatísticas (posts e comentários);
  * Clique em "Editar Perfil" para alterar nome, e-mail ou adicionar foto;
  * Gerencie interesses adicionando ou removendo tags;
  * Visualize seu número de posts e comentários publicados.

### Estruturas de dados

Descrição das estruturas de dados utilizadas na solução com exemplos no formato JSON.

##### Estrutura de dados - Usuários

Registro dos usuários do sistema, utilizados para autenticação, perfil e controle de autoria de posts e comentários.

```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao.silva@puc.br",
  "login": "joao.silva",
  "senha": 123,
  "foto": "data:image/png;base64,...",
  "interesses": ["Tecnologia", "Desenvolvimento Web", "Cálculo 2"],
  "estatisticas": {
    "posts": 5,
    "comentarios": 12
  },
  "membroDesde": "06/07/2026 às 14:30:25"
}
```

##### Estrutura de dados - Posts

Representa tópicos/discussões criadas pelos usuários na plataforma.

```json
{
  "id": 1,
  "titulo": "Dúvida sobre Cálculo 2",
  "descricao": "Alguém pode explicar como resolver derivadas?",
  "autor": "João Silva",
  "categoria": ["Matemática", "Estudos"],
  "dataHora": "2026-07-06T14:30:25.000Z",
  "curtidas": 3,
  "comentarios": 5
}
```

##### Estrutura de dados - Comentários

Representa respostas/comentários adicionados aos posts pelos usuários.

```json
{
  "id": 1,
  "postId": 1,
  "autor": "Maria Santos",
  "email": "maria.santos@puc.br",
  "texto": "Ótima pergunta! A derivada nada mais é que...",
  "dataReal": "2026-07-06T15:45:10.000Z",
  "curtidas": 2,
  "dono": false
}
```

### Módulos e APIs

Esta seção apresenta os módulos e APIs utilizados na solução.

**APIs JavaScript (Nativas do Browser):**

* **Fetch API** - [https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API) - Para carregamento do arquivo JSON de dados
* **localStorage** - Armazenamento persistente de dados do aplicativo (PucMeet-db)
* **sessionStorage** - Armazenamento da sessão do usuário logado
* **FileReader API** - Leitura de arquivos de foto dos usuários em formato Base64
* **URLSearchParams** - Extração de parâmetros de URL para identificar posts
* **DOM API** - Manipulação de elementos HTML (getElementById, createElement, addEventListener)
* **Date Object** - Manipulação e formatação de datas/horários dos posts e comentários
* **JSON** - Serialização e desserialização de dados

**Recursos Externos:**

* Ícones Emoji - Utilizados nativamente no browser (👍, 👤, etc.)

**Tecnologias:**

* HTML5 - Estrutura das páginas
* CSS3 - Estilização e layouts responsivos (Flexbox, Grid)
* JavaScript (ES6+) - Lógica da aplicação com suporte a Arrow Functions, Template Literals, etc.


## Hospedagem

A plataforma PucMeet é desenvolvida como uma aplicação web estática (SPA - Single Page Application) utilizando HTML, CSS e JavaScript vanilla.

**Ambiente de Desenvolvimento:**
- Desenvolvida localmente no Visual Studio Code
- Versionamento com Git/GitHub para controle de versão colaborativo
- Repositório: [2026-1-p1-tiaw-g5-pucmeet-1](https://github.com/ICEI-PUC-Minas-TIAW-2026-1-p1-pucmeet-g5)

**Estrutura de Arquivos:**
- `/src/public/modulos/` - Páginas e módulos da aplicação (Homepage, Post, Perfil, Login/Cadastro)
- `/src/db/` - Arquivo JSON com dados iniciais (PucMeet-db.json)
- `/docs/` - Documentação do projeto
- `/presentation/` - Materiais de apresentação

**Armazenamento de Dados:**
- **localStorage** - Persiste dados da aplicação (usuarios, posts, comentários) em JSON
- **sessionStorage** - Mantém dados da sessão do usuário logado
- Dados são inicializados a partir de `PucMeet-db.json` na primeira execução

**Execução:**
A aplicação pode ser executada:
1. Diretamente no navegador abrindo `src/public/modulos/Homepage/index.html`
2. Em um servidor local (ex: Live Server no VS Code)
3. Publicada em plataformas como GitHub Pages para acesso remoto

**Navegadores Suportados:**
- Chrome/Edge (versões modernas)
- Firefox (versões modernas)
- Safari (versões modernas)
- Qualquer navegador que suporte ES6+ e localStorage
