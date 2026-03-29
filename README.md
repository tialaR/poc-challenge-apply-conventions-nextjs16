# poc-challenge-apply-conventions-nextjs16

Projeto MVP em **Next.js 16 (App Router)** com arquitetura **src-first** e organização modular por feature.

## Pré-requisitos

- Node.js 20+
- pnpm 9+

## Como rodar o MVP em ambiente de desenvolvimento

### 1) Instalar dependências
```bash
pnpm install
```

### 2) Subir servidor local
```bash
pnpm dev
```

A aplicação ficará disponível em:
- `http://localhost:3000`

### 3) Rotas principais para validar o MVP
- `/` (home)
- `/fretes` (listagem + filtros)
- `/fretes/[slug]/[id]` (detalhe)
- `/contato`

### 4) Build de produção (checagem estrutural)
```bash
pnpm build
pnpm start
```

---

## /review — passo a passo (checagem rápida de arquitetura)

1. **Estrutura src-first**
   - Confirmar presença de `src/app`, `src/features`, `src/shared`, `src/lib`.
2. **App Router**
   - Garantir que páginas e layouts estão em `src/app/**`.
3. **Feature de fretes**
   - Confirmar componentes em `src/features/freights/components`.
4. **Aliases**
   - Validar `@/* -> ./src/*` no `tsconfig.json`.
5. **Fluxo funcional**
   - Navegar manualmente pelas rotas do MVP e validar layout existente.

---

## /feedback — execução guiada para rodar em dev

1. Se `pnpm install` falhar:
   - validar versão do Node (`node -v`) e pnpm (`pnpm -v`).
2. Se `pnpm dev` não subir:
   - verificar porta ocupada e iniciar com outra porta (`pnpm dev -- -p 3001`).
3. Se houver erro de import:
   - conferir se o import usa `@/` e se o arquivo está dentro de `src/`.
4. Se rota não abrir:
   - checar se o arquivo está na convenção correta do App Router (`page.tsx`, `layout.tsx`, etc.).
5. Se tudo subir:
   - validar listagem, filtros, detalhe e formulário de interesse sem alterar layout.

---

## Observações

- O repositório contém testes legados com contratos antigos; priorize primeiro a execução funcional do MVP em dev.
- A arquitetura atual foi preparada para evoluir para hooks/providers/services/types por feature.
