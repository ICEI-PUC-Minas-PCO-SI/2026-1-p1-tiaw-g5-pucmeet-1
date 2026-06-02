function carregaJSONLocalStorage() {
    fetch("../../../../db/PucMeet-db.json")
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("PucMeet-db", JSON.stringify(data));
            ordenarPostsPorData(true);
            renderizarPost();
        })
        .catch(error => console.error("Erro ao carregar posts:", error));
}

function renderizarPost(postsRenderizados) {
    const miniPostsList = document.getElementById("miniPostsList");
    const lista = postsRenderizados || getPostsLocalStorage();

    miniPostsList.innerHTML = "";

    lista.forEach(post => {
        const miniPost = document.createElement("div");
        miniPost.classList.add("miniPost")
        miniPost.onclick = function () {
            window.location.href = "teste.html?postId=" + encodeURIComponent(post.postId);
        };

        const h3MiniPost = document.createElement("h3");
        h3MiniPost.textContent = post.titulo;

        const pMiniPost = document.createElement("p");
        pMiniPost.textContent = post.conteudo;

        const miniPostFooter = document.createElement("div");
        miniPostFooter.classList.add("miniPostFooter");

        const miniAutorPost = document.createElement("div");
        miniAutorPost.classList.add("miniAutorPost");
        miniAutorPost.textContent = post.autor;

        const miniQtdComentariosPost = document.createElement("div");
        miniQtdComentariosPost.classList.add("miniQtdComentariosPost");
        miniQtdComentariosPost.textContent = "💬" + " " + post.comentarios;

        const miniDataPost = document.createElement("div");
        miniDataPost.classList.add("miniDataPost");
        miniDataPost.textContent = post.dataVisual;

        const miniPostCategorias = document.createElement("div");
        miniPostCategorias.classList.add("miniPostCategorias");

        post.categorias.forEach(categoria => {
            const categoriaDiv = document.createElement("div");
            categoriaDiv.textContent = categoria;
            miniPostCategorias.appendChild(categoriaDiv);
        });

        miniPost.appendChild(h3MiniPost);
        miniPost.appendChild(pMiniPost);
        miniPost.appendChild(miniPostFooter);
        miniPost.appendChild(miniDataPost);
        miniPost.appendChild(miniPostCategorias);
        miniPostFooter.appendChild(miniAutorPost);
        miniPostFooter.appendChild(miniQtdComentariosPost);

        miniPostsList.appendChild(miniPost);
    });
}

function adicionarPost() { // Função somente de teste
    const btnAdicionar = document.getElementById("btnAdicionar");
    const listaPosts = getPostsLocalStorage();

    let data = new Date();

    const novoPost = {
        postId: 1000,
        titulo: "Teste",
        conteudo: "Conteúdo exemplo",
        categorias: ["Teste"],
        autor: "Fulano de Tal",
        comentarios: getRandomIntInclusive(1, 100),
        dataReal: data,
        dataVisual: formatarDataHora(data),
        likes: 33,
        favoritos: 1
    };

    listaPosts.push(novoPost);
    localStorage.setItem("PucMeet-db", JSON.stringify({ posts: listaPosts }));

    if (pesquisaAtiva) {
        pesquisarPost();
    }
    ordenarPostsPorData(true);
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

function ordenarPostsPorData(desc) {
    const posts = getPostsLocalStorage();
    let alvo = pesquisaAtiva ? filtrados : posts;

    alvo.sort((a, b) => {
        const tempoA = new Date(a.dataReal).getTime();
        const tempoB = new Date(b.dataReal).getTime();
        if (desc) {
            return tempoB - tempoA;
        }
        else {
            return tempoA - tempoB;
        }
    });

    if (!pesquisaAtiva) {
        localStorage.setItem("PucMeet-db", JSON.stringify({ posts }));
    }

    renderizarPost(pesquisaAtiva ? filtrados : undefined);
}

function toggleOrdenarPostsPorData() {
    postsOrdenacaoDataDesc = !postsOrdenacaoDataDesc;
    ordenarPostsPorData(postsOrdenacaoDataDesc);

    const btnData = document.getElementById('filtroData');
    const btnAutor = document.getElementById('filtroAlfabeticoNomeAutor');
    const btnComentarios = document.getElementById('filtroQtdComentarios');

    if (btnData) {
        btnAutor.textContent = '👤 ABC';
        btnComentarios.textContent = '💬';
        if (postsOrdenacaoDataDesc) {
            btnData.textContent = '⏳ ▲';
        }
        else {
            btnData.textContent = '⏳ ▼';
        }
    }
}

function ordenarPostsPorNomeAutorAlfabeticamente(desc) {
    const posts = getPostsLocalStorage();
    let alvo = pesquisaAtiva ? filtrados : posts;

    alvo.sort((a, b) => {
        const nomeA = (a.autor || "").toString().trim().toLocaleLowerCase('pt-BR');
        const nomeB = (b.autor || "").toString().trim().toLocaleLowerCase('pt-BR');
        if (desc) {
            return nomeA.localeCompare(nomeB, 'pt-BR');
        }
        else {
            return nomeB.localeCompare(nomeA, 'pt-BR');
        }
    });

    if (!pesquisaAtiva) {
        localStorage.setItem("PucMeet-db", JSON.stringify({ posts }));
    }

    renderizarPost(pesquisaAtiva ? filtrados : undefined);
}

function toggleOrdenarPostsPorNomeAutorAlfabeticamente() {
    postsOrdenacaoNomeDesc = !postsOrdenacaoNomeDesc;
    ordenarPostsPorNomeAutorAlfabeticamente(postsOrdenacaoNomeDesc);

    const btnData = document.getElementById('filtroData');
    const btnAutor = document.getElementById('filtroAlfabeticoNomeAutor');
    const btnComentarios = document.getElementById('filtroQtdComentarios');

    if (btnAutor) {
        btnData.textContent = '⏳';
        btnComentarios.textContent = '💬';
        if (postsOrdenacaoNomeDesc) {
            btnAutor.textContent = '👤 ABC ▲';
        }
        else {
            btnAutor.textContent = '👤 ABC ▼';
        }
    }
}

function ordenarPostsPorComentarios(desc) {
    const posts = getPostsLocalStorage();
    let alvo = pesquisaAtiva ? filtrados : posts;

    alvo.sort((a, b) => {
        const qtdComentariosA = Number(a.comentarios) || 0;
        const qtdComentariosB = Number(b.comentarios) || 0;
        if (desc) {
            return qtdComentariosB - qtdComentariosA;
        }
        else {
            return qtdComentariosA - qtdComentariosB;
        }
    });

    if (!pesquisaAtiva) {
        localStorage.setItem("PucMeet-db", JSON.stringify({ posts }));
    }

    renderizarPost(pesquisaAtiva ? filtrados : undefined);
}

function toggleOrdenarPostsPorComentarios() {
    postsOrdenacaoComentariosDesc = !postsOrdenacaoComentariosDesc;
    ordenarPostsPorComentarios(postsOrdenacaoComentariosDesc);

    const btnData = document.getElementById('filtroData');
    const btnAutor = document.getElementById('filtroAlfabeticoNomeAutor');
    const btnComentarios = document.getElementById('filtroQtdComentarios');

    if (btnComentarios) {
        btnData.textContent = '⏳';
        btnAutor.textContent = '👤 ABC';
        if (postsOrdenacaoComentariosDesc) {
            btnComentarios.textContent = '💬 ▲';
            btnComentarios.title = 'Ordenar: Mais comentários primeiro';
        }
        else {
            btnComentarios.textContent = '💬 ▼';
            btnComentarios.title = 'Ordenar: Menos comentários primeiro';
        }
    }
}

function pesquisarPost(event) {
    if (event && typeof event.preventDefault === 'function') {
        event.preventDefault();
    }

    const campoPesquisa = document.getElementById('pesquisa');

    if (!campoPesquisa) return;

    const valorPesquisado = campoPesquisa.value.trim().toLowerCase();

    if (!valorPesquisado) {
        pesquisaAtiva = false;
        renderizarPost();
        return;
    }

    pesquisaAtiva = true;
    const posts = getPostsLocalStorage();
    filtrados = posts.filter(post => {
        if (!post) return false;
        const titulo = (post.titulo || '').toString().toLowerCase();
        const autor = (post.autor || '').toString().toLowerCase();
        const categorias = (post.categorias || []).join(' ').toLowerCase();

        return titulo.includes(valorPesquisado) || autor.includes(valorPesquisado) || categorias.includes(valorPesquisado);
    });

    renderizarPost(filtrados);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const pesquisaInput = document.getElementById('pesquisa');
if (pesquisaInput) {
    pesquisaInput.addEventListener('input', function (event) {
        pesquisarPost();
    });
}

function getPostsLocalStorage() {
    return JSON.parse(localStorage.getItem("PucMeet-db") || "{}")?.posts || [];
}

let listaPosts = getPostsLocalStorage();
let filtrados = [];
let pesquisaAtiva = false;
let postsOrdenacaoDataDesc = false;
let postsOrdenacaoNomeDesc = false;
let postsOrdenacaoComentariosDesc = false;

if (!localStorage.getItem("PucMeet-db")) {
    carregaJSONLocalStorage();
} else {
    ordenarPostsPorData(true);
    renderizarPost();
}