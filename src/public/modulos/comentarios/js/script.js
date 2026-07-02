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

const comentariosPadrao = [
  {
    id: 1,
    autor: "Maria Santos",
    conteudo: "Eu também tenho dificuldade! Podemos formar um grupo no Whatsapp?",
    data: "3 min atrás",
    criadoEm: Date.now() - 3 * 60 * 1000,
    curtidas: 5,
    postId: 10,
    dono: false
  },
  {
    id: 2,
    autor: "Carlos Silva",
    conteudo: "Posso ajudar com integrais, tive essa matéria no semestre passado 👍",
    data: "4 min atrás",
    criadoEm: Date.now() - 4 * 60 * 1000,
    curtidas: 3,
    postId: 10,
    dono: false
  }
];

let comentarios = carregarComentarios();

function carregarComentarios() {
  const comentariosSalvos = localStorage.getItem("comentariosPucMeet");

  if (comentariosSalvos) {
    const comentariosConvertidos = JSON.parse(comentariosSalvos);

    return comentariosConvertidos.map((comentario) => {
      return {
        ...comentario,

        
        curtidas: Number(comentario.curtidas) || 0,
        criadoEm: comentario.criadoEm || Date.now()
      };
    });
  }

  return comentariosPadrao;
}

function salvarComentarios() {
  localStorage.setItem("comentariosPucMeet", JSON.stringify(comentarios));
}

function mostrarOuOcultarPainel(painel) {
  painel.classList.toggle("oculto");
}

function buscarFiltrarOrdenarComentarios() {
  let resultado = [...comentarios];

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
    resultado.sort((a, b) => b.criadoEm - a.criadoEm);
  }

  if (ordenacaoSelecionada === "mais_antigos") {
    resultado.sort((a, b) => a.criadoEm - b.criadoEm);
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

function renderizarComentarios(lista = comentarios) {
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
        ${comentario.autor} · ${comentario.data}
      </div>

      <div class="comentario-conteudo">
        <div class="avatar">👤</div>

        <p class="comentario-texto">${comentario.conteudo}</p>

        ${
          comentario.dono
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
        <button class="btn-curtir" onclick="curtirComentario(${comentario.id})">Curtir</button>
      </div>
    `;

    listaComentarios.appendChild(card);
  });
}

function adicionarComentario() {
  const texto = campoComentario.value.trim();

  if (texto === "") {
    alert("Digite um comentário antes de responder.");
    return;
  }

  const novoComentario = {
    id: Date.now(),
    autor: "Luiz Felipe",
    conteudo: texto,
    data: "agora",
    criadoEm: Date.now(),
    curtidas: 0,
    postId: 10,
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

  if (!comentario) {
    alert("Comentário não encontrado.");
    return;
  }

  comentario.curtidas++;

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