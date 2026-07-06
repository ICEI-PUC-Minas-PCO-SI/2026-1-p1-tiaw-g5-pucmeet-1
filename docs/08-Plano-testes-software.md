# Plano de testes de software

<span style="color:red">Pré-requisitos: <a href="03-Product-design.md"> Especificação do projeto</a></span>, <a href="05-Projeto-interface.md"> Projeto de interface</a>

O plano de testes de software é gerado a partir da especificação do sistema e consiste em casos de teste que deverão ser executados quando a implementação estiver parcial ou totalmente pronta. Apresente os cenários de teste utilizados na realização dos testes da sua aplicação. Escolha cenários de teste que demonstrem os requisitos sendo satisfeitos.

Enumere quais cenários de testes foram selecionados para teste. Neste tópico, o grupo deve detalhar quais funcionalidades foram avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

Não deixe de enumerar os casos de teste de forma sequencial e garantir que o(s) requisito(s) associado(s) a cada um deles esteja(m) correto(s) — de acordo com o que foi definido na <a href="03-Product-design.md">Especificação do projeto</a>.

## Casos de teste - PucMeet

<br>

| **Caso de teste**  | **CT-001 – Cadastrar usuário**  |
|:---: |:---: |
| Requisito associado | RF-003 - Permitir que o usuário se cadastre |
| Objetivo do teste | Verificar se o usuário consegue criar uma nova conta com sucesso. |
| Passos | - Acessar o navegador <br> - Informar o endereço do site (URL local ou hospedada) <br> - Clicar em "Cadastro" ou "Criar conta" <br> - Preencher os campos obrigatórios (nome completo, e-mail, senha, confirmação de senha) <br> - Clicar em "Registrar" ou "Cadastrar" |
| Critério de êxito | - O cadastro foi realizado com sucesso. <br> - Os dados do usuário foram salvos no localStorage ou banco de dados. <br> - Uma mensagem de confirmação é exibida. |
| Responsável pela elaboração do caso de teste | Integrante da equipe. |

<br>

| **Caso de teste**  | **CT-002 – Efetuar login com credenciais válidas**  |
|:---: |:---: |
| Requisito associado | RF-004 - Permitir que o usuário faça login |
| Objetivo do teste | Verificar se o usuário consegue realizar login com e-mail e senha corretos. |
| Passos | - Acessar o navegador <br> - Informar o endereço do site <br> - Clicar no botão "Login" ou "Entrar" <br> - Preencher o campo de e-mail com dados válidos <br> - Preencher o campo de senha com dados válidos <br> - Clicar em "Login" ou "Entrar" |
| Critério de êxito | - O login foi realizado com sucesso. <br> - O usuário é redirecionado para a página principal (homepage). <br> - Os dados do usuário são carregados no sistema. |
| Responsável pela elaboração do caso de teste | Integrante da equipe. |

<br>

| **Caso de teste**  | **CT-003 – Tentativa de login com credenciais inválidas**  |
|:---: |:---: |
| Requisito associado | RF-004 - Permitir que o usuário faça login |
| Objetivo do teste | Verificar se o sistema rejeita login com dados incorretos. |
| Passos | - Acessar o navegador <br> - Informar o endereço do site <br> - Clicar no botão "Login" ou "Entrar" <br> - Preencher o campo de e-mail com dados inválidos ou não cadastrados <br> - Preencher o campo de senha incorreta <br> - Clicar em "Login" ou "Entrar" |
| Critério de êxito | - O login é rejeitado. <br> - Uma mensagem de erro é exibida ("E-mail ou senha incorretos"). <br> - O usuário permanece na página de login. |
| Responsável pela elaboração do caso de teste | Integrante da equipe. |

<br>

| **Caso de teste**  | **CT-004 – Configurar perfil do usuário**  |
|:---: |:---: |
| Requisito associado | RF-005 - Permitir que o usuário configure seu perfil |
| Objetivo do teste | Verificar se o usuário consegue visualizar e editar informações de seu perfil. |
| Passos | - Realizar login com sucesso <br> - Clicar em "Perfil" ou ícone de usuário <br> - Visualizar as informações do perfil (nome, e-mail, foto de perfil, etc.) <br> - Clicar em "Editar" ou "Modificar" <br> - Alterar informações desejadas <br> - Clicar em "Salvar" |
| Critério de êxito | - O perfil é exibido corretamente. <br> - As alterações são salvas com sucesso. <br> - Uma mensagem de confirmação é exibida. |
| Responsável pela elaboração do caso de teste | Integrante da equipe. |

<br>

| **Caso de teste**  | **CT-005 – Criar uma postagem**  |
|:---: |:---: |
| Requisito associado | RF-001 - Permitir que o usuário crie postagens |
| Objetivo do teste | Verificar se o usuário consegue criar e publicar uma postagem no fórum. |
| Passos | - Realizar login com sucesso <br> - Acessar a página principal (homepage) <br> - Clicar em "Nova postagem" ou "Criar post" <br> - Preencher o título da postagem <br> - Preencher o conteúdo/descrição <br> - Clicar em "Publicar" ou "Postar" |
| Critério de êxito | - A postagem é criada com sucesso. <br> - A postagem aparece na lista de postagens do fórum. <br> - A postagem exibe o nome do autor e data/hora. |
| Responsável pela elaboração do caso de teste | Integrante da equipe. |

<br>

| **Caso de teste**  | **CT-006 – Interagir com postagem (curtir/comentar)**  |
|:---: |:---: |
| Requisito associado | RF-002 - Permitir que o usuário interaja com postagens de outros usuários |
| Objetivo do teste | Verificar se o usuário consegue curtir ou comentar em postagens. |
| Passos | - Realizar login com sucesso <br> - Acessar a página principal (homepage) <br> - Visualizar postagens de outros usuários <br> - Clicar no botão "Curtir" (ícone de coração/thumbs up) <br> - OU clicar em "Comentar" e adicionar um comentário <br> - Confirmar a ação |
| Critério de êxito | - A interação (curtida ou comentário) é registrada. <br> - O contador de curtidas/comentários é atualizado. <br> - A ação é salva no sistema. |
| Responsável pela elaboração do caso de teste | Integrante da equipe. |

<br>

| **Caso de teste**  | **CT-007 – Consultar histórico de postagens**  |
|:---: |:---: |
| Requisito associado | RF-006 - Permitir que o usuário consulte seu histórico de postagens |
| Objetivo do teste | Verificar se o usuário consegue visualizar todas as suas postagens anteriores. |
| Passos | - Realizar login com sucesso <br> - Acessar o perfil do usuário <br> - Clicar em "Minhas postagens" ou "Histórico" <br> - Visualizar a lista de postagens criadas |
| Critério de êxito | - O histórico de postagens é exibido corretamente. <br> - Todas as postagens do usuário aparecem listadas. <br> - As postagens exibem data, hora e conteúdo. |
| Responsável pela elaboração do caso de teste | Integrante da equipe. |

<br>

| **Caso de teste**  | **CT-008 – Alterar senha do usuário**  |
|:---: |:---: |
| Requisito associado | RF-007 - Permitir que o usuário altere seu cadastro (nome e senha) |
| Objetivo do teste | Verificar se o usuário consegue alterar sua senha com segurança. |
| Passos | - Realizar login com sucesso <br> - Acessar o perfil do usuário <br> - Clicar em "Configurações" ou "Alterar senha" <br> - Informar a senha atual <br> - Informar a nova senha <br> - Confirmar a nova senha <br> - Clicar em "Salvar" |
| Critério de êxito | - A senha é alterada com sucesso. <br> - Uma mensagem de confirmação é exibida. <br> - O usuário pode fazer login com a nova senha. |
| Responsável pela elaboração do caso de teste | Integrante da equipe. |

<br>

| **Caso de teste**  | **CT-009 – Alterar nome do perfil**  |
|:---: |:---: |
| Requisito associado | RF-007 - Permitir que o usuário altere seu cadastro (nome e senha) |
| Objetivo do teste | Verificar se o usuário consegue alterar seu nome no perfil. |
| Passos | - Realizar login com sucesso <br> - Acessar o perfil do usuário <br> - Clicar em "Editar perfil" <br> - Modificar o campo de nome <br> - Clicar em "Salvar" |
| Critério de êxito | - O nome é alterado com sucesso. <br> - Uma mensagem de confirmação é exibida. <br> - O novo nome é exibido no perfil e nas postagens do usuário. |
| Responsável pela elaboração do caso de teste | Integrante da equipe. |

<br>

| **Caso de teste**  | **CT-010 – Validação de responsividade em dispositivo móvel**  |
|:---: |:---: |
| Requisito associado | RNF-001 - O sistema deve ser responsivo para rodar em dispositivos móveis |
| Objetivo do teste | Verificar se a aplicação funciona corretamente em telas menores (smartphones). |
| Passos | - Acessar a aplicação em um dispositivo móvel ou emulador <br> - Realizar login <br> - Navegar entre as páginas (homepage, perfil, criar post) <br> - Testar funcionalidades básicas (criar postagem, comentar, curtir) <br> - Verificar se a interface está adequada para a tela |
| Critério de êxito | - A interface é exibida corretamente em dispositivos móveis. <br> - Todos os botões e campos são acessíveis. <br> - Não há elementos sobrepostos. <br> - A navegação funciona suavemente. |
| Responsável pela elaboração do caso de teste | Integrante da equipe. |


## Ferramentas de testes

Para a execução dos testes do PucMeet, foram utilizadas as seguintes ferramentas:

- **Navegadores para testes**: Google Chrome, Mozilla Firefox - para testar compatibilidade e responsividade
- **Emulador de dispositivos móveis**: DevTools do navegador (F12) - para validar a responsividade em dispositivos móveis
- **Armazenamento local**: localStorage do navegador - para validar o salvamento de dados do usuário
- **Testes manuais**: Execução manual de funcionalidades seguindo os passos definidos em cada caso de teste
- **Ferramentas de teste (opcional)**: Jest ou Cypress - para testes automatizados de funcionalidades críticas

### Resumo dos testes

A cobertura de testes abrange os seguintes requisitos funcionais:
- **RF-001 (Criar postagens)**: Coberto pelo CT-005
- **RF-002 (Interagir com postagens)**: Coberto pelo CT-006
- **RF-003 (Cadastrar usuário)**: Coberto pelo CT-001
- **RF-004 (Fazer login)**: Coberto pelos CT-002 e CT-003
- **RF-005 (Configurar perfil)**: Coberto pelo CT-004
- **RF-006 (Consultar histórico)**: Coberto pelo CT-007
- **RF-007 (Alterar cadastro)**: Coberto pelos CT-008 e CT-009

Também foi incluído o teste de responsividade (CT-010) para validar o requisito não funcional RNF-001.

Todos os casos de teste foram desenvolvidos com base na especificação funcional do projeto e devem ser executados em ordem sequencial para garantir que as dependências (como login prévio) sejam atendidas.