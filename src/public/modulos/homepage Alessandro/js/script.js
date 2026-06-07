function carregaJSONLocalStorage() {
    fetch("../../../../db/PucMeet-db.json")
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("PucMeet-db", JSON.stringify(data));
            ordenarPostsPorData(true);
            renderizarPost();
            postsSemana = getPostSemana();
            i = 0;
            renderizarCarrossel(i);
            iniciarCarrosselAutomatico();
        })
        .catch(error => console.error("Erro ao carregar posts:", error));
}

function renderizarPost(postsRenderizados) {
    postsSemana = getPostSemana();
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

function getPostSemana() {
    const posts = getPostsLocalStorage();
    const agora = new Date();
    const seteDiasAtras = new Date(agora.getTime() - (7 * 24 * 60 * 60 * 1000));

    const ordenarPorRelevancia = (lista) => lista.sort((a, b) => {
        const likesA = Number(a.likes) || 0;
        const likesB = Number(b.likes) || 0;
        const comentariosA = Number(a.comentarios) || 0;
        const comentariosB = Number(b.comentarios) || 0;

        const scoreA = likesA + comentariosA;
        const scoreB = likesB + comentariosB;

        if (scoreB !== scoreA) {
            return scoreB - scoreA;
        }

        const dataA = new Date(a.dataReal).getTime();
        const dataB = new Date(b.dataReal).getTime();
        return dataB - dataA;
    });

    const postsUltimos7Dias = posts.filter(post => {
        if (!post || !post.dataReal) return false;
        const dataPost = new Date(post.dataReal);
        if (Number.isNaN(dataPost.getTime())) return false;
        return dataPost >= seteDiasAtras && dataPost <= agora;
    });

    const postsDaSemana = ordenarPorRelevancia([...postsUltimos7Dias]).slice(0, 7);

    if (postsDaSemana.length > 0) {
        return postsDaSemana;
    }

    return ordenarPorRelevancia([...posts]).slice(0, 7);
}

function btnCarrossel(acao) {
    if (!postsSemana.length) return;

    if (acao === 1) {
        i = (i + 1) % postsSemana.length;
    }

    if (acao === -1) {
        i = (i - 1 + postsSemana.length) % postsSemana.length;
    }

    renderizarCarrossel(i);
    iniciarCarrosselAutomatico();
}

function renderizarCarrossel(id) {
    const idPost = document.createElement("p");
    idPost.classList.add("topBar");
    idPost.textContent = "Top: " + (id + 1);

    const postSemanaDiv = document.getElementById("postSemana");

    if (!postSemanaDiv || !postsSemana.length) return;

    const postAtual = postsSemana[id];

    postSemanaDiv.innerHTML = "";

    const h2 = document.createElement("h2");
    h2.textContent = postAtual.titulo;

    const conteudo = document.createElement("p");
    conteudo.textContent = postAtual.conteudo;

    const miniPostFooter = document.createElement("div");
    miniPostFooter.classList.add("miniPostFooter");

    const autor = document.createElement("p");
    autor.textContent = postAtual.autor;

    const qtdComentarios = document.createElement("p");
    qtdComentarios.textContent = postAtual.comentarios + " 💬";

    const data = document.createElement("p");
    data.textContent = postAtual.dataVisual;

    const likes = document.createElement("p");
    likes.textContent = postAtual.likes + " 👍";

    const miniPostCategorias = document.createElement("div");
    miniPostCategorias.classList.add("miniPostCategorias");

    (postAtual.categorias || []).forEach(categoria => {
        const categoriaDiv = document.createElement("div");
        categoriaDiv.textContent = categoria;
        miniPostCategorias.appendChild(categoriaDiv);
    });

    miniPostFooter.appendChild(autor);
    miniPostFooter.appendChild(qtdComentarios);
    miniPostFooter.appendChild(likes);

    postSemanaDiv.appendChild(idPost)
    postSemanaDiv.appendChild(h2);
    postSemanaDiv.appendChild(conteudo);
    postSemanaDiv.appendChild(miniPostFooter);
    postSemanaDiv.appendChild(data);
    postSemanaDiv.appendChild(miniPostCategorias);

    postSemanaDiv.classList.remove("carrossel-animado");
    void postSemanaDiv.offsetWidth;
    postSemanaDiv.classList.add("carrossel-animado");

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
let postsSemana = getPostSemana();
let i = 0;
let carrosselInterval = null;

function iniciarCarrosselAutomatico() {
    if (carrosselInterval) {
        clearInterval(carrosselInterval);
    }

    if (!postsSemana.length) return;

    carrosselInterval = setInterval(() => {
        btnCarrossel(1);
    }, 10000);
}

if (!localStorage.getItem("PucMeet-db")) {
    carregaJSONLocalStorage();
} else {
    ordenarPostsPorData(true);
    renderizarPost();
    postsSemana = getPostSemana();
    renderizarCarrossel(i);
    iniciarCarrosselAutomatico();
}