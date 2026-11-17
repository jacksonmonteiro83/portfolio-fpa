/* Projetos do portfólio: edite data/projects.json e recarregue a página. */
(() => {
  "use strict";

  const grade = document.getElementById("projetos-grade");
  const filtros = document.getElementById("filtros");
  const vazio = document.getElementById("projetos-vazio");
  const ano = document.getElementById("ano");
  if (ano) ano.textContent = String(new Date().getFullYear());

  let projetos = [];
  let ativo = "Todos";

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));

  function card(p) {
    const el = document.createElement("article");
    el.className = "projeto";
    const tags = (p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
    const link = p.link
      ? `<a class="ir" href="${esc(p.link)}" target="_blank" rel="noopener">Abrir projeto ↗</a>`
      : `<a class="ir" href="#contato">Falar sobre este projeto ↗</a>`;
    el.innerHTML = `
      <div class="projeto-topo">
        <h3>${esc(p.titulo)}</h3>
        <span class="ano">${p.ano ? esc(p.ano) : ""}</span>
      </div>
      ${p.exemplo ? '<span class="selo-exemplo">exemplo — substituir</span>' : ""}
      <p>${esc(p.resumo)}</p>
      <div class="tags">${tags}</div>
      ${link}`;
    return el;
  }

  function render() {
    grade.innerHTML = "";
    const visiveis = projetos.filter((p) => ativo === "Todos" || (p.tags || []).includes(ativo));
    visiveis.forEach((p) => grade.appendChild(card(p)));
    vazio.hidden = visiveis.length > 0;
  }

  function montarFiltros() {
    const tags = [...new Set(projetos.flatMap((p) => p.tags || []))].sort((a, b) => a.localeCompare(b, "pt-BR"));
    const todos = ["Todos", ...tags];
    filtros.innerHTML = "";
    todos.forEach((nome) => {
      const b = document.createElement("button");
      b.className = "filtro";
      b.type = "button";
      b.textContent = nome;
      b.setAttribute("aria-pressed", String(nome === ativo));
      b.addEventListener("click", () => {
        ativo = nome;
        [...filtros.children].forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        render();
      });
      filtros.appendChild(b);
    });
  }

  fetch("data/projects.json")
    .then((r) => {
      if (!r.ok) throw new Error(`projects.json: HTTP ${r.status}`);
      return r.json();
    })
    .then((lista) => {
      projetos = Array.isArray(lista) ? lista : [];
      montarFiltros();
      render();
    })
    .catch((e) => {
      vazio.hidden = false;
      vazio.textContent = `Não foi possível carregar os projetos (${e.message}).`;
    });
})();
