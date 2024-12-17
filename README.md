# ProjetoEditaisFront

Projeto a ser desenvolvido em Eng. de Software 2024.1

Envolvidos: Jean Araujo - DOUTORADO / RAFAEL ARAUJO - ESPECIAL / Felipe Pacheco - MESTRADO / Edjair Filho - MESTRADO / Arthur Miranda - GRADUAÇÃO / Mayanne Silva - GRADUAÇÃO / Maria Alves - GRADUAÇÃO

Ideias Iniciais:
Projeto visa a construção de uma plataforma com editais de invocação, ou seja, Editais publicos/privados disponibilizados/em fase de resultado disponiveis por orgãos de fomento de pesquisa/ICTs (exemplo: FACEPE, CNPQ, SECTI, ....)

Plataforma WEB que seja possivel cadastrar Editais e Demonstrar esses editais:

- Cadastro (inicialmente) manual:
  - PDF
  - NOME
  - Orgão de Fomento
  - Para quem? Qual area?
  - Data Inicio / Data Fim / Resultado
- Gerenciamento Pós-Cadastro (UPDATE/DELETE)
- Demonstração desses editais e dessas informações (Front-End):
  - Site
- Editais (de forma inicial)
  - https://www.secti.pe.gov.br/editais/
  - https://www.facepe.br/editais/todos/
  - http://memoria2.cnpq.br/web/guest/chamadas-publicas
  - http://www.finep.gov.br/chamadas-publicas?situacao=aberta

Observações:

- Tecnologias não definidas -> Projeto vai ser continuado por bastante tempo, procurar tecnologias solidas para o desenvolvimento
- Necessario uma boa documentação do projeto
  - Descrever de forma clara (para um completo leigo) como executar esse projeto (de forma local), consequentemente (quando estiver aprovado) vamos disponibilizar online.
- Ideias: https://ecossistema.pe/

# Como rodar o projeto

### Passo 1: Pré-requisitos
Para rodar a parte Front-end do projeto, você deve ter o Node.js e o npm (ou yarn) instalados em sua máquina.

Node.js (https://nodejs.org/)
npm (vem com o Node.js) ou yarn (https://classic.yarnpkg.com/en/docs/install/)

### Passo 2: Clonar o Repositório
Clone o repositório do GitHub em sua máquina:

git clone https://github.com/dgois11/ProjetoEditaisFront.git
cd Projeto_SM_2024-Front

### Passo 3: Instalar um Ambiente de Desenvolvimento
Uma IDE facilita o desenvolvimento ao fornecer recursos como autocompletar, depuração, controle de versão integrado e muito mais.
Sugestão: VSCode (https://code.visualstudio.com)

### Passo 4: Instalar Dependências
Dependendo do gerenciador de pacotes que você está usando (npm ou yarn), instale as dependências do projeto no terminal da IDE (VSCode, de preferência).

npm install
ou
yarn install

### Passo 5: Executar o Projeto
Depois de instalar as dependências, inicie o servidor de desenvolvimento digitando no terminal da IDE: npm run dev

### Passo 6: Acessar a Aplicação
A aplicação estará rodando no local host informado pelo console. Em seguida, abra este link no seu navegador.
Para acessar páginas em específico, verifique as pastas na API do projeto. 
Você pode acessar diretamente, como:
http://localhost:XXXX/search ou http://localhost:XXXX/login

# Pages

### DashEditais

- **Descrição**: Página inicial do site.
- **Funcionalidades**:
  - Fornece links de navegação para outras páginas do site.
  - Exibe informações sobre as instituições cujos dados são integrados no site.

### DashAdm

- **Descrição**: Página de administração para usuários com privilégios de administrador.
- **Funcionalidades**:
  - Permite visualizar, criar, editar e excluir usuários.

### DashFavoritos

- **Descrição**: Página dedicada aos editais favoritos dos usuários.
- **Funcionalidades**:
  - Exibe somente os editais que foram favoritados pelos usuários, junto com suas informações.
  - Permite o upload, download e exclusão de PDFs relacionados aos pré-projetos dos usuários.

### Search

- **Descrição**: Página dedicada à visualização e pesquisa de editais.
- **Funcionalidades**:
  - Exibe todos os editais cadastrados no site com suas informações detalhadas.
  - Permite que o usuário pesquise os editais de acordo com suas necessidades.
  - Administradores têm a capacidade de adicionar novos editais à lista.

### Login

- **Descrição**: Página para autenticação de usuários.
- **Funcionalidades**:
  - Permite que os usuários façam login utilizando suas credenciais.
  - Inclui campos para nome de usuário e senha.

### Register

- **Descrição**: Página para o cadastro de novos usuários.
- **Funcionalidades**:
  - Oferece um formulário para a criação de uma nova conta.
  - Permite aos usuários criar um novo perfil e acessar o site com suas novas credenciais.

# Componentes

### Cards

- **Descrição**: Componente responsável pela renderização dos cards de editais na página de busca.
- **Funcionalidades**:
  - Exibe os cards tanto em formato de linha quanto em grid, dependendo do layout selecionado.

### DashBoardUsuarios

- **Descrição**: Componente utilizado para exibir os detalhes dos usuários na página **DashAdm**.
- **Funcionalidades**:
  - Mostra a lista de usuários com opções para visualizar, editar e gerenciar as informações de cada usuário.

### Footer

- **Descrição**: Componente responsável por exibir informações sobre o projeto.
- **Funcionalidades**:
  - Mostra informações de contato, links úteis e detalhes sobre o projeto ou empresa.

### Header

- **Descrição**: Componente utilizado para fornecer links de navegação para outras páginas do site.
- **Funcionalidades**:
  - Exibe o menu de navegação principal.
  - Inclui links para páginas como Home, Search, Login e outras seções do site.

### User

- **Descrição**: Componente utilizado para renderizar informações dos usuários na tela de administração.
- **Funcionalidades**:
  - Exibe uma lista de usuários com detalhes.
  - Permite ações administrativas como editar e excluir o usuário.

### CardModal

- **Descrição**: Modal de popup utilizado para a atualizar usuários.
- **Funcionalidades**:
  - Permite a entrada de informações necessárias para criar um novo usuário.
  - Exibe um formulário para capturar dados.
  - Inclui opções para confirmar ou cancelar a criação do usuário.

### NovoEdital

- **Descrição**: Modal de popup utilizado para a criação de um novo edital.
- **Funcionalidades**:
  - Permite a entrada de informações necessárias para criar um novo edital, como título, descrição, e data de validade.
  - Inclui um formulário para capturar todos os detalhes relevantes do edital.

### NovoUsuário

- **Descrição**: Modal de popup utilizado para a criação de novos usuários.
- **Funcionalidades**:
  - Exibe um formulário para capturar as informações do novo usuário, como nome, e-mail e senha.
  - Permite que o administrador adicione um novo usuário ao sistema.

### VerMais

- **Descrição**: Modal de popup utilizado para a visualização detalhada de editais.
- **Funcionalidades**:
  - Exibe informações completas sobre um edital específico, como descrição completa, datas importantes e anexos.
  - Permite ao usuário visualizar todos os detalhes do edital em um formato expandido.
