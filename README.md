# Repertorio MARQS

Aplicacao web para consulta e organizacao de repertorio musical.

## Foco do projeto: simplicidade

Este projeto existe para resolver um problema especifico com o menor atrito possivel:

- abrir musicas rapidamente;
- montar listas sem complicacao;
- manter o conteudo em Markdown, facil de editar;
- preservar codigo legivel e direto.

Se algo nao deixa a experiencia mais simples para quem usa ou para quem desenvolve, nao entra.

## O que voce encontra aqui

- listagem de musicas;
- visualizacao de musica por slug;
- criacao e gerenciamento de setlists;
- favoritos persistidos localmente;
- busca de musicas;
- testes unitarios para partes importantes da regra de negocio.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Vitest + Testing Library

## Como rodar localmente

1. Instale dependencias:

```bash
npm install
```

2. Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

3. Acesse:

http://localhost:3000

## Comandos uteis

```bash
npm run dev         # desenvolvimento
npm run build       # build de producao
npm run start       # roda a build
npm run lint        # analise estatica
npm run test        # testes em modo run
npm run test:watch  # testes em modo watch
```

## Estrutura (resumo)

- `app/`: rotas e paginas
- `components/`: componentes de interface
- `lib/`: regras de negocio, servicos, hooks e utilitarios
- `songs/`: base de musicas em arquivos Markdown
