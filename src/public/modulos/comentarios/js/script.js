const campoComentario = document.getElementById("campoComentario");
const btnResponder = document.getElementById("btnResponder");
const listaComentarios = document.getElementById("listaComentarios");

let comentarios = JSON.parse(localStorage.getItem("comentariosPucMeet")) || [
  {
    id: 1,
    autor: "Maria Santos",
    conteudo: "Eu também tenho dificuldade! Podemos formar um grupo no Whatsapp?",
    data: "3 min atrás",
    postId: 10,
    dono: false
  },
  {
    id: 2,
    autor: "Carlos Silva",
    conteudo: "Posso ajudar com integrais, tive essa matéria no semestre passado 👍",
    data: "4 min atrás",
    postId: 10,
    dono: false
  }
];

function salvarComentarios() {
  localStorage.setItem("comentariosPucMeet", JSON.stringify(comentarios));
}

function renderizarComentarios() {
  listaComentarios.innerHTML = "";

  if (comentarios.length === 0) {
    listaComentarios.innerHTML = `
      <p class="sem-comentarios">Nenhum comentário publicado ainda.</p>
    `;
    return;
  }

  comentarios.forEach((comentario) => {
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
    postId: 10,
    dono: true
  };

  comentarios.unshift(novoComentario);

  salvarComentarios();
  renderizarComentarios();

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
  renderizarComentarios();
}

function excluirComentario(id) {
  const confirmar = confirm("Tem certeza que deseja excluir este comentário?");

  if (!confirmar) {
    return;
  }

  comentarios = comentarios.filter((item) => item.id !== id);

  salvarComentarios();
  renderizarComentarios();
}

btnResponder.addEventListener("click", adicionarComentario);

campoComentario.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && event.ctrlKey) {
    adicionarComentario();
  }
});

salvarComentarios();
renderizarComentarios();