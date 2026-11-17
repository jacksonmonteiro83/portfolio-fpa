# Portfólio — Jackson Monteiro (FP&A e Controladoria)

Site estático (HTML + CSS + JS puro) com a trajetória profissional, competências,
certificações e uma lista de projetos que você preenche em um único arquivo.

## Rodar localmente

```bash
python -m http.server 8000
# abra http://localhost:8000
```

## Adicionar um projeto

Edite `data/projects.json` e inclua um objeto no começo da lista:

```json
{
  "titulo": "Nome do projeto",
  "resumo": "Uma ou duas frases: problema, o que você fez e o resultado.",
  "tags": ["Power BI", "FP&A"],
  "ano": 2026,
  "link": "https://github.com/jacksonmonteiro83/repositorio-do-projeto",
  "exemplo": false
}
```

Regras:
- `titulo` e `resumo` são obrigatórios; `link` pode ficar vazio.
- `tags` viram os filtros da página (use poucas e consistentes).
- `"exemplo": true` mostra o selo laranja "exemplo — substituir". Apague o campo
  nos projetos reais.
- Projeto sigiloso de empresa: use base fictícia/anonimizada, diga isso no resumo
  e não publique dado real.

## Estrutura

```
index.html          página única (herói, sobre, trajetória, competências, projetos, contato)
styles.css          layout e tema
app.js              lê data/projects.json, monta cards e filtros
data/projects.json  a lista de projetos
```

## Publicar no GitHub Pages

1. Crie um repositório (ex.: `portfolio-fpa`) e suba estes arquivos.
2. Em **Settings → Pages**, escolha **GitHub Actions** como fonte.
3. O workflow `.github/workflows/pages.yml` publica a cada push no `main`.
4. O site fica em `https://<usuário>.github.io/portfolio-fpa/`.

Para URL curta (`https://jacksonmonteiro83.github.io`), o repositório precisa se
chamar `jacksonmonteiro83.github.io`. Domínio próprio: crie um arquivo `CNAME`
com o domínio e aponte o DNS.

## Editar textos

- Trajetória, formação e certificações estão no `index.html` (seções comentadas).
- O resumo "Sobre" é um rascunho feito a partir do LinkedIn — ajuste com suas
  palavras.
- Cores e tipografia ficam nas variáveis do topo de `styles.css`.
