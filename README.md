# Repertorio MARQS — React + Vite

Reimplementacao independente do projeto, sem Next.js. Usa React 19, Vite e TanStack Router.

## Funcionalidades

- leitura das cifras Markdown em `src/songs/` durante a build;
- busca por titulo e artista;
- rotas de musica por slug;
- listas persistidas no `localStorage`, com inclusao, remocao e ordenacao;
- favoritos persistidos localmente;
- tema claro/escuro;
- rolagem automatica com velocidade configuravel;
- gerador e download de novas musicas em Markdown;
- manifest para instalacao na tela inicial do iOS.

## Executar

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Para publicar as rotas diretamente (por exemplo `/songs/alfa-e-omega`), configure o host para redirecionar rotas desconhecidas para `index.html`.

## Adicionar musicas locais

Copie o arquivo `.md` para `src/songs/` e gere uma nova build. O Vite inclui os arquivos no aplicativo final, portanto o navegador do iPhone nao precisa acessar o sistema de arquivos do servidor.
