# Loja de Cafés

Front end de uma loja de cafés desenvolvido em **JavaScript puro**, com dados vindos de uma API local criada com **json-server**. Trabalho da disciplina Programação Visual e Autoria Web (UFRN).

## Funcionalidades

- **Página inicial:** lista os cafés obtidos da API, com título, descrição, preço, imagem, ingredientes e botão para adicionar ao carrinho.
- **Carrinho:** mostra os itens com nome, preço unitário e quantidade, permite aumentar ou diminuir unidades e exibe o total. O carrinho é salvo no `localStorage`, então continua disponível ao recarregar a página.
- **Finalização:** exibe o resumo do pedido e um formulário com endereço de entrega e método de pagamento. Os campos são validados antes de confirmar a compra.
- **Confirmação:** mostra o valor total e limpa o carrinho do `localStorage`.
- **Responsivo:** layout construído com Bootstrap 5, adaptado para celular.

## Tecnologias

- HTML5
- JavaScript puro (ES Modules, manipulação do DOM e `fetch`)
- Bootstrap 5 e Font Awesome
- json-server (API local)

## Estrutura do projeto

```
loja_cafe/
├── db.json          # dados dos cafés (API)
├── index.html       # única página HTML; contém apenas a div#root
├── css/
│   └── estilo.css
└── js/
    ├── api.js       # comunicação com a API
    ├── cart.js      # gerenciamento do carrinho (localStorage)
    ├── dom.js       # utilitários e cabeçalho
    ├── pages.js     # geração do HTML de cada página
    └── app.js       # roteamento por hash e eventos
```

## Como executar

**1. Clone o repositório**

```bash
git clone https://github.com/mateusgoncalvesteteo-svg/loja_cafe.git
cd loja_cafe
```

**2. Instale as dependências**

```bash
npm install
```

**3. Inicie a API**

```bash
npx json-server db.json
```

A API fica disponível em `http://localhost:3000/cafes`.

**4. Abra o front end**

Como o projeto usa módulos ES, não abra o `index.html` com duplo clique. Use uma extensão como o **Live Server** no VS Code, ou rode:

```bash
npx serve .
```

Depois, acesse o endereço exibido no terminal (por exemplo, `http://127.0.0.1:5500`).

## Decisões de implementação

- **Roteamento por hash:** as três páginas (`#/`, `#/carrinho` e `#/finalizar`) são trocadas pelo JavaScript, sem recarregar o navegador.
- **Carrinho no `localStorage`:** todas as operações de adicionar, remover e listar passam por `cart.js`, e as demais partes do código só chamam essas funções.
- **Proteção contra HTML injetado:** os textos vindos da API passam pela função `escapar` antes de entrar na página.
- **Validação do formulário:** o endereço precisa ter pelo menos 10 caracteres e um método de pagamento precisa ser escolhido. Os erros aparecem na própria tela.

## Observações

- O pagamento é apenas simulado. A aplicação registra o método escolhido e exibe a confirmação, sem integração com meios de pagamento reais.
- O campo `title` do `db.json` é usado como nome do café, seguindo o exemplo do enunciado.

## Autor

**Mateus Gonçalves** · Estudante de Tecnologia em Análise e Desenvolvimento de Sistemas (UFRN)
GitHub: [@mateusgoncalvesteteo-svg](https://github.com/mateusgoncalvesteteo-svg)
