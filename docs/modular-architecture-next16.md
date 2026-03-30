objetivo. Para seu MVP com Next.js 16 + App Router, aqui está um guia prático baseado na documentação oficial e já adaptado ao padrão modular por feature.

1) Normas e convenções (Next.js 16 oficial)
Estrutura src/
É suportada oficialmente mover código da app para src/.

Importante: se existir app/ na raiz e src/app/ ao mesmo tempo, src/app pode ser ignorada.

public/, package.json, next.config.*, tsconfig.json, .env* ficam na raiz.
Fonte: Next.js src directory docs
https://nextjs.org/docs/app/building-your-application/configuring/src-directory

App Router + organização
Use convenções de app/ (layout, page, loading, error, route handlers).

Route Groups (grupo) são recomendados para organização sem alterar URL.

Cuidado com múltiplos root layouts (pode gerar full reload entre grupos).
Fontes:
https://nextjs.org/docs/app/getting-started/project-structure
https://nextjs.org/docs/app/api-reference/file-conventions/route-groups

Segurança (muito importante para seu caso com Server Actions)
Tratar entrada de Server Actions como hostil (validar/sanitizar sempre).

CSRF: same-origin já é proteção padrão; para proxy/multi-domínio usar serverActions.allowedOrigins.

Limitar payload com serverActions.bodySizeLimit para reduzir risco de abuso.
Fontes:
https://nextjs.org/docs/app/guides/data-security
https://nextjs.org/docs/app/api-reference/config/next-config-js/serverActions

2) Arquitetura recomendada para seu MVP (modular + SRP)
Sua ideia está correta. Para o seu contexto, eu sugiro:

src/
  app/
    (marketing)/
      page.tsx
      sobre/
      contato/
    fretes/
      page.tsx
      [slug]/[id]/page.tsx
    api/
      freights/
      truckers/
  features/
    freights/
      components/
      hooks/
      services/
      types/
      providers/
    contact/
      components/
      services/
      types/
    shared-interest/
      components/
      services/
      types/
  shared/
    ui/
    lib/
    types/
    utils/
  config/
Regra SRP por camada
features/*/components: só UI da feature.

features/*/hooks: estado/efeitos/client logic.

features/*/services: acesso API/ações/regras de aplicação.

features/*/types: contratos da feature.

features/*/providers: contexto/DI local da feature.

shared/*: somente reutilizável transversal (não domínio específico).

3) Requisitos de segurança e qualidade para “aceite”
Antes de concluir migração:

Nenhuma credencial no código (.env* fora de git).

Validação forte de payload em route.ts e Server Actions (zod já ajuda).

serverActions.allowedOrigins configurado se tiver proxy.

serverActions.bodySizeLimit definido.

Import boundaries: feature não importa internals de outra feature direto (apenas contracts/shared).

tsconfig com alias consistente (@/* -> src/* após migração).

Sem duplicidade de pastas antigas na raiz (app/, components/, lib/ etc.) depois do corte.

4) “Concluído quando” (Definition of Done) + reprodução
DoD objetivo
Projeto roda com tudo dentro de src/ (exceto public, configs, env).

Rotas atuais do MVP intactas:

listar fretes

filtrar (origem/destino/veículo/carroceria)

detalhe

manifestar interesse

Sem regressão visual/funcional do fluxo atual.

Build e dev sobem sem erro estrutural.

Como reproduzir (local)
Instalar dependências:

pnpm install (ou npm/yarn equivalente)

Subir dev:

pnpm dev

Validar manualmente:

/fretes + filtros

/fretes/[slug]/[id]

envio de interesse

Checar build:

pnpm build

pnpm start
