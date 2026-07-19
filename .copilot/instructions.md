# 🎯 Projeto: Repertório de Cifras (Pessoal)

## Objetivo

Criar uma aplicacao web (PWA) simples para:

- armazenar cifras manualmente (via arquivos locais)
- organizar musicas
- criar listas (ex.: culto, ensaio)
- marcar favoritas (pin)
- buscar musicas rapidamente
- rodar em desktop e celular, sem backend

## Principios do Projeto

- Nao usar banco de dados para armazenar musicas.
- Nao implementar autenticacao.
- Nao implementar scraping.
- Nao implementar transposicao (fora do escopo atual).
- Nao implementar backend customizado.
- Nao usar bibliotecas desnecessarias.
- Priorizar simplicidade acima de tudo.
- Foco em uso pessoal.

## Arquitetura

### Stack

- Next.js (App Router)
- TypeScript
- PWA (instalavel)
- Dados via filesystem em `/songs`
- Estado do usuario via `localStorage` (ou `IndexedDB`, opcional)

### Estrutura de Pastas

```text
/app
	/songs
		/[slug]
	/lists

/lib
	/data
	/repositories
	/types
	/utils

/public

/songs
	*.md
```

## Fonte de Dados (Songs)

As musicas sao armazenadas como arquivos Markdown em:

```text
/songs
```

## Estrutura dos Arquivos de Musica

### Exemplo

```md
---
slug: minha-musica
title: Minha Musica
artist: Fernandinho
---

C G Am
Minha vida e um milagre
```

### Regras Obrigatorias (Songs)

Cada arquivo deve ter:

- `slug` unico
- `title`
- `artist` (opcional)

Regras do conteudo:

- O conteudo abaixo do frontmatter e a cifra.
- Nao processar ou alterar a cifra.
- Preservar espacamento original.
- Nao salvar HTML.
- Nao modificar encoding manualmente.

## Modelo de Dados (TypeScript)

```ts
export type Song = {
  slug: string;
  title: string;
  artist?: string;
  content: string;
};

type Favorites = string[]; // array de slugs

type List = {
  id: string;
  name: string;
  songs: string[]; // array de slugs
};
```

## Favoritos (Pin)

- Armazenar no `localStorage`.
- Estrutura: `Favorites` (array de slugs).

## Listas (Setlists)

- Totalmente dinamicas.
- Quantidade ilimitada.
- Armazenadas no `localStorage`.
- Estrutura: `List`.

## Busca

Buscar por:

- titulo
- artista (se existir)

Regras:

- case-insensitive
- feita em memoria
- nao usar engine externa

## Renderizacao da Cifra

Regras obrigatorias:

- Usar `<pre>`, ou:
  - `white-space: pre;`
  - `font-family: monospace;`
- Nao modificar conteudo.
- Nao interpretar acordes.
- Nao aplicar parsing.
- Manter alinhamento original.

## PWA

- Deve ser instalavel.
- Deve funcionar bem no mobile.
- Interface limpa e sem distracoes.
- Deve abrir em tela cheia (`standalone`).

## Fora do Escopo

- autenticacao
- multiusuario
- sincronizacao em nuvem
- edicao colaborativa
- parsing de acordes
- transposicao
- scraping
- upload via UI (fase inicial)
- backend customizado

## Data Layer (Repositories)

Responsabilidades:

- Abstrair leitura de musicas.
- Nao misturar com UI.
- Nao conter logica de apresentacao.

Exemplo:

```ts
getAllSongs(): Promise<Song[]>
getSongBySlug(slug: string): Promise<Song>
```

## Regras para Agentes de IA

### O agente deve

- seguir rigorosamente esta arquitetura
- usar TypeScript
- manter separacao de responsabilidades
- criar codigo simples e legivel
- respeitar estrutura de pastas
- usar filesystem como fonte de dados
- usar `localStorage` para estado
- usar constants ao inves de strings soltas no codigo, principalmente para rotas

### O agente nao deve

- adicionar banco de dados
- usar ORM
- implementar autenticacao
- criar APIs desnecessarias
- usar Redux ou libs pesadas
- alterar estrutura dos arquivos `.md`
- criar parsing de cifras
- adicionar logica complexa sem necessidade

## Checklist do MVP

### Fase 1 (Base)

- [ ] Ler arquivos de `/songs`
- [ ] Parsear frontmatter
- [ ] Listar musicas
- [ ] Visualizar cifra

### Fase 2 (Interacao)

- [ ] Implementar busca
- [ ] Implementar favoritos (`localStorage`)

### Fase 3 (Organizacao)

- [ ] Criar listas
- [ ] Adicionar musicas as listas
- [ ] Remover musicas das listas
- [ ] Ordenar musicas na lista

### Fase 4 (UX)

- [ ] Melhorar leitura no mobile
- [ ] Ajustar tamanho da fonte
- [ ] Otimizar scroll
- [ ] Layout limpo e focado

## Checklist de Codigo

- [ ] Tipagem explicita (TypeScript)
- [ ] Funcoes pequenas e puras
- [ ] Sem logica dentro de componentes visuais
- [ ] Separacao clara entre UI, dados e estado
- [ ] Codigo legivel e simples

## Checklist de Performance

- [ ] Carregar musicas eficientemente
- [ ] Evitar re-render desnecessario
- [ ] Busca rapida em memoria
- [ ] Evitar chamadas desnecessarias

## Decisoes Arquiteturais

| Decisao                    | Motivo                 |
| -------------------------- | ---------------------- |
| Filesystem como fonte      | simplicidade           |
| Markdown com frontmatter   | estrutura leve         |
| `localStorage` para estado | zero custo             |
| Sem backend                | evitar complexidade    |
| Sem parsing de cifra       | manter previsibilidade |

## Evolucoes Futuras (Opcional)

- sincronizacao em nuvem
- transposicao de acordes
- importacao via URL
- editor de cifras
- modo offline completo (cache)

## Conclusao

Este sistema deve ser:

- simples
- rapido
- previsivel
- facil de manter
- focado no problema real (acesso rapido a cifras)
