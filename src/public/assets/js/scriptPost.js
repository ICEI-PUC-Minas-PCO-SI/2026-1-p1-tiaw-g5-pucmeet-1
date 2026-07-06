const campoComentario = document.getElementById("campoComentario");
const btnResponder = document.getElementById("btnResponder");
const listaComentarios = document.getElementById("listaComentarios");

const btnMostrarBusca = document.getElementById("btnMostrarBusca");
const btnMostrarFiltro = document.getElementById("btnMostrarFiltro");
const btnMostrarOrdenacao = document.getElementById("btnMostrarOrdenacao");

const painelBusca = document.getElementById("painelBusca");
const painelFiltro = document.getElementById("painelFiltro");
const painelOrdenacao = document.getElementById("painelOrdenacao");

const campoBusca = document.getElementById("campoBusca");
const filtroAutor = document.getElementById("filtroAutor");
const ordenacaoComentarios = document.getElementById("ordenacaoComentarios");
const resumoFiltros = document.getElementById("resumoFiltros");

const queryParams = new URLSearchParams(window.location.search);

function carregaJSONLocalStorage() {
  fetch("../../../db/PucMeet-db.json")
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("PucMeet-db", JSON.stringify(data));
    })
    .catch(error => console.error("Erro ao carregar posts:", error));
}

if (!localStorage.getItem("PucMeet-db")) {
  carregaJSONLocalStorage();
}

let comentarios = carregarComentarios();

function carregarComentarios() {
  return JSON.parse(localStorage.getItem("PucMeet-db") || "{}")?.comentarios || [];
}

function toTimestamp(value) {
  if (value === undefined || value === null) return 0;
  if (typeof value === "number") return value;
  const d = new Date(value);
  return isNaN(d.getTime()) ? 0 : d.getTime();
}

function salvarComentarios() {
  const db = JSON.parse(localStorage.getItem("PucMeet-db") || "{}");
  db.comentarios = comentarios;
  localStorage.setItem("PucMeet-db", JSON.stringify(db));
  atualizarFiltroAutor();
  atualizarContadorPost();
  carregarPost();
}

function atualizarContadorPost() {
  const db = JSON.parse(localStorage.getItem("PucMeet-db") || "{}");
  if (!db.posts) return;
  const postId = Number(queryParams.get("id"));
  if (Number.isNaN(postId)) return;
  const total = comentarios.filter(c => c.postId === postId).length;
  const post = db.posts.find(p => p.postId === postId);
  if (post) {
    post.comentarios = total;
    localStorage.setItem("PucMeet-db", JSON.stringify(db));
  }
}

function carregarPost() {
  const db = JSON.parse(localStorage.getItem("PucMeet-db") || "{}");
  const posts = db.posts || [];
  const postId = Number(queryParams.get("id"));
  const container = document.querySelector(".post-card");
  if (!container) return;

  if (Number.isNaN(postId)) {
    container.innerHTML = `<p>Post inválido.</p>`;
    return;
  }

  const post = posts.find(p => p.postId === postId);
  if (!post) {
    container.innerHTML = `<h2>Post não encontrado</h2><p>Verifique o ID na URL.</p>`;
    return;
  }

  const categorias = (post.categorias || []).map(c => `<span>${c}</span>`).join(" ");

  container.innerHTML = `
    <h2>${post.titulo}</h2>

    <p>${post.conteudo}</p>

    <div class="post-info">
      <span>${post.autor || 'Anônimo'}</span>
      <span>❤ ${post.curtidas || 0}</span>
      <span>${post.dataVisual || ''}</span>
    </div>
     <div style="text-align: center; margin: 2%;">${categorias}</div>
  `;
}

function atualizarFiltroAutor() {
  const postId = Number(queryParams.get("id"));
  const autores = comentarios
    .filter(c => Number.isNaN(postId) ? true : c.postId === postId)
    .map(c => c.autor)
    .filter(Boolean);

  const autoresUnicos = Array.from(new Set(autores)).sort((a, b) => a.localeCompare(b));

  filtroAutor.innerHTML = "";
  const opcTodos = document.createElement("option");
  opcTodos.value = "todos";
  opcTodos.textContent = "Todos os Autores";
  filtroAutor.appendChild(opcTodos);

  autoresUnicos.forEach((autor) => {
    const opt = document.createElement("option");
    opt.value = autor;
    opt.textContent = autor;
    filtroAutor.appendChild(opt);
  });
}
atualizarFiltroAutor();

function mostrarOuOcultarPainel(painel) {
  painel.classList.toggle("oculto");
}

function buscarFiltrarOrdenarComentarios() {
  let resultado = [...comentarios];

  const postId = Number(queryParams.get("id"));
  if (!Number.isNaN(postId)) {
    resultado = resultado.filter((comentario) => comentario.postId === postId);
  }

  const textoBusca = campoBusca.value.trim().toLowerCase();
  const autorSelecionado = filtroAutor.value;
  const ordenacaoSelecionada = ordenacaoComentarios.value;

  if (textoBusca !== "") {
    resultado = resultado.filter((comentario) => {
      const autor = comentario.autor.toLowerCase();
      const conteudo = comentario.conteudo.toLowerCase();

      return autor.includes(textoBusca) || conteudo.includes(textoBusca);
    });
  }

  if (autorSelecionado !== "todos") {
    resultado = resultado.filter((comentario) => {
      return comentario.autor === autorSelecionado;
    });
  }

  if (ordenacaoSelecionada === "mais_recentes") {
    resultado.sort((a, b) => toTimestamp(b.dataReal) - toTimestamp(a.dataReal));
  }

  if (ordenacaoSelecionada === "mais_antigos") {
    resultado.sort((a, b) => toTimestamp(a.dataReal) - toTimestamp(b.dataReal));
  }

  if (ordenacaoSelecionada === "mais_curtidos") {
    resultado.sort((a, b) => b.curtidas - a.curtidas);
  }

  atualizarResumoFiltros(resultado.length);
  renderizarComentarios(resultado);
}

function atualizarResumoFiltros(total) {
  const textoBusca = campoBusca.value.trim();
  const autorSelecionado = filtroAutor.value;
  const ordenacaoSelecionada = ordenacaoComentarios.value;

  let textoOrdenacao = "";

  if (ordenacaoSelecionada === "mais_recentes") {
    textoOrdenacao = "mais recentes";
  } else if (ordenacaoSelecionada === "mais_antigos") {
    textoOrdenacao = "mais antigos";
  } else {
    textoOrdenacao = "mais curtidos";
  }

  const textoAutor = autorSelecionado === "todos" ? "todos os autores" : autorSelecionado;
  const textoPesquisa = textoBusca === "" ? "sem busca ativa" : `busca: "${textoBusca}"`;

  resumoFiltros.textContent =
    `${total} comentário(s) exibido(s) | ${textoPesquisa} | autor: ${textoAutor} | ordenação: ${textoOrdenacao}`;
}

function renderizarComentarios(lista = comentarios.filter(comentario => comentario.postId === Number(queryParams.get("id")))) {
  listaComentarios.innerHTML = "";

  if (lista.length === 0) {
    listaComentarios.innerHTML = `
      <p class="sem-comentarios">Nenhum comentário encontrado.</p>
    `;
    return;
  }

  lista.forEach((comentario) => {
    const card = document.createElement("div");
    card.classList.add("comentario-card");

    card.innerHTML = `
      <div class="comentario-header">
        ${comentario.autor} · ${comentario.dataVisual}
      </div>

      <div class="comentario-conteudo">
        <div class="avatar">👤</div>

        <p class="comentario-texto">${comentario.conteudo}</p>

        ${comentario.dono
        ? `
              <div class="acoes">
                <button class="btn-editar" onclick="editarComentario(${comentario.id})">✏️</button>
                <button class="btn-excluir" onclick="excluirComentario(${comentario.id})">🗑️</button>
              </div>
            `
        : ""
      }
      </div>

      <div class="info-comentario">
        <span>❤ ${comentario.curtidas} curtida(s)</span>

        ${comentario.jaCurtiu
        ? `<button class="btn-curtir" style="background-color: #0077cc; color: white;" onclick="curtirComentario(${comentario.id})">Curtir</button>`
        : `<button class="btn-curtir" onclick="curtirComentario(${comentario.id})">Curtir</button>`
      }

      </div>
    `;

    listaComentarios.appendChild(card);
  });
}

function formatarDataHora(data) {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  const hora = String(data.getHours()).padStart(2, "0");
  const minuto = String(data.getMinutes()).padStart(2, "0");
  const segundo = String(data.getSeconds()).padStart(2, "0");

  return dia + "/" + mes + "/" + ano + " às " + hora + ":" + minuto + ":" + segundo;
}

function adicionarComentario() {
  const texto = campoComentario.value.trim();

  if (texto === "") {
    alert("Digite um comentário antes de responder.");
    return;
  }

  let data = new Date();

  const novoComentario = {
    id: Date.now(),
    autor: "Luiz Felipe",
    conteudo: texto,
    dataReal: data.toISOString(),
    dataVisual: formatarDataHora(data),
    curtidas: 0,
    postId: Number(queryParams.get("id")),
    dono: true
  };

  comentarios.push(novoComentario);

  salvarComentarios();
  buscarFiltrarOrdenarComentarios();

  campoComentario.value = "";
}

function editarComentario(id) {
  const comentario = comentarios.find((item) => item.id === id);

  if (!comentario) {
    alert("Comentário não encontrado.");
    return;
  }

  const novoTexto = prompt("Edite seu comentário:", comentario.conteudo);

  if (novoTexto === null) {
    return;
  }

  if (novoTexto.trim() === "") {
    alert("O comentário não pode ficar vazio.");
    return;
  }

  comentario.conteudo = novoTexto.trim();
  comentario.data = "editado agora";

  salvarComentarios();
  buscarFiltrarOrdenarComentarios();
}

function excluirComentario(id) {
  const confirmar = confirm("Tem certeza que deseja excluir este comentário?");

  if (!confirmar) {
    return;
  }

  comentarios = comentarios.filter((item) => item.id !== id);

  salvarComentarios();
  buscarFiltrarOrdenarComentarios();
}

function curtirComentario(id) {
  const comentario = comentarios.find((item) => item.id === id);

  if (comentario) {
    if (comentario.jaCurtiu === undefined) comentario.jaCurtiu = false;
    if (comentario.curtidas === undefined) comentario.curtidas = 0;

    if (comentario.jaCurtiu === false) {
      comentario.curtidas++;
      comentario.jaCurtiu = true;
    }
    else {
      comentario.curtidas--;
      comentario.jaCurtiu = false;
    }
  }

  salvarComentarios();
  buscarFiltrarOrdenarComentarios();
}

btnResponder.addEventListener("click", adicionarComentario);

campoComentario.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && event.ctrlKey) {
    adicionarComentario();
  }
});

btnMostrarBusca.addEventListener("click", function () {
  mostrarOuOcultarPainel(painelBusca);
});

btnMostrarFiltro.addEventListener("click", function () {
  mostrarOuOcultarPainel(painelFiltro);
});

btnMostrarOrdenacao.addEventListener("click", function () {
  mostrarOuOcultarPainel(painelOrdenacao);
});

campoBusca.addEventListener("input", buscarFiltrarOrdenarComentarios);
filtroAutor.addEventListener("change", buscarFiltrarOrdenarComentarios);
ordenacaoComentarios.addEventListener("change", buscarFiltrarOrdenarComentarios);

salvarComentarios();
buscarFiltrarOrdenarComentarios();