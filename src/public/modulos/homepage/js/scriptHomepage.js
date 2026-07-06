const usuarios = carregaUsuarios();

let usuarioAtual = JSON.parse(sessionStorage.getItem("usuarioCorrente") || "null");
const pesquisaInput = document.getElementById('pesquisa');
const btnPublicar = document.getElementById('btn-publicar');

let listaPosts = getPostsLocalStorage();
let filtrados = [];
let pesquisaAtiva = false;
let postsOrdenacaoDataDesc = false;
let postsOrdenacaoNomeDesc = false;
let postsOrdenacaoComentariosDesc = false;
let postsOrdenacaoCurtidasDesc = false;
let postsSemana = getPostSemana();
let i = 0;
let carrosselInterval = null;

const path = window.location.pathname;
const estaNoIndex = path.endsWith("index.html") || path.endsWith("/");
const fotoPerfil = document.getElementById('fotoPerfil');

if (usuarioAtual && !usuarioAtual.estatisticas) {
    usuarioAtual.estatisticas = { posts: 0, comentarios: 0 };
}

if (usuarioAtual) {
    sessionStorage.setItem("usuarioCorrente", JSON.stringify(usuarioAtual));
}

if (pesquisaInput) {
    pesquisaInput.addEventListener('input', function (event) {
        pesquisarPost();
    });
}

if (btnPublicar) {
    let categoriaSelecionada = [];
    let esAnonimo = false;

    const queryParams = new URLSearchParams(window.location.search);
    const postTitle = document.getElementById('post-title');
    const postContent = document.getElementById('post-content');

    switch (Number(queryParams.get("id"))) {
        case 1:
            postTitle.value = "Alguém pra grupo?";
            postContent.value = "Alguém para fazer grupo de ";
            break;
        case 2:
            postTitle.value = "Preciso de ajuda";
            postContent.value = "Alguém pode me ajudar em ";
            break;
        case 3:
            postTitle.value = "Quero fazer amigos";
            postContent.value = "Alguém curte ";
            break;
        case 4:
            postTitle.value = "Vamos estudar?";
            postContent.value = "Alguém para fazer grupo de estudos de";
            break;
    }


    const botoesCategoria = document.querySelectorAll('.btn-categoria');
    botoesCategoria.forEach(btn => {
        btn.addEventListener('click', () => {
            const categoria = btn.getAttribute('data-categoria');
            const indiceCategoria = categoriaSelecionada.indexOf(categoria);

            if (btn.classList.contains('active')) {
                btn.classList.remove('active');

                if (indiceCategoria !== -1) {
                    categoriaSelecionada.splice(indiceCategoria, 1);
                }
                return;
            }

            btn.classList.add('active');

            if (indiceCategoria === -1) {
                categoriaSelecionada.push(categoria);
            }
        });
    });

    const btnAnonimo = document.getElementById('btn-anonimo');
    if (btnAnonimo) {
        btnAnonimo.addEventListener('click', () => {
            esAnonimo = !esAnonimo;
            const span = btnAnonimo.querySelector('span');
            if (span) span.textContent = esAnonimo ? "Sim" : "Não";
        });
    }

    btnPublicar.addEventListener('click', () => {
        redirecionarUsuario();

        const titulo = postTitle.value.trim();
        const conteudo = postContent.value.trim();

        if (!titulo || !conteudo || categoriaSelecionada.length === 0) {
            alert("Por favor, preencha o título, o conteúdo e selecione uma categoria!");
            return;
        }

        const btnAdicionar = document.getElementById("btnAdicionar");
        const listaPosts = getPostsLocalStorage();

        let data = new Date();

        const novoPost = {
            postId: listaPosts.length + 1,
            titulo: titulo,
            conteudo: conteudo,
            categorias: categoriaSelecionada,
            autor: esAnonimo ? "Anônimo" : usuarioAtual.nome,
            comentarios: 0,
            dataReal: data,
            dataVisual: formatarDataHora(data),
            curtidas: 0,
            favoritos: 0,
            favorito: false
        };

        const btnAnonimi = document.getElementById('btn-anonimo');
        if (btnAnonimi) {
            const span = btnAnonimi.querySelector('span');
            if (span) span.textContent = "Não";
        }

        listaPosts.push(novoPost);

        const db = JSON.parse(localStorage.getItem("PucMeet-db") || "{}");
        db.posts = listaPosts;
        localStorage.setItem("PucMeet-db", JSON.stringify(db));

        document.getElementById('post-title').value = "";
        document.getElementById('post-content').value = "";
        categoriaSelecionada = [];
        esAnonimo = false;

        botoesCategoria.forEach(b => b.classList.remove('active'));

        if (usuarioAtual) {
            usuarioAtual.estatisticas = usuarioAtual.estatisticas || { posts: 0, comentarios: 0 };
            usuarioAtual.estatisticas.posts = (usuarioAtual.estatisticas.posts || 0) + 1;
            salvarDadosLocais(usuarioAtual);
        } else {
            console.warn('Nenhum usuário logado; estatísticas não atualizadas.');
        }
        window.location.href = "../homepage/index.html";
    });
}

if (!localStorage.getItem("PucMeet-db")) {
    carregaJSONLocalStorage();
}

if (estaNoIndex) {
    ordenarPostsPorData(true);
    renderizarPost();
    postsSemana = getPostSemana();
    renderizarCarrossel(i);
    iniciarCarrosselAutomatico();
}

if (usuarioAtual && usuarioAtual.foto && fotoPerfil) {
    fotoPerfil.src = usuarioAtual.foto;
}

function toLogin() {
    if (!usuarioAtual) {
        window.location.href = "../login/login.html"
    }
    else {
        window.location.href = "../perfil/perfil.html"
    }
}
renderLoginButton();

function carregaUsuarios() {
    return JSON.parse(localStorage.getItem("PucMeet-db") || "{}")?.usuarios || [];
}

function getUsuarioSessionStorage() {
    return JSON.parse(sessionStorage.getItem("usuarioCorrente") || "{}");
}

function carregaJSONLocalStorage() {
    fetch("../../../db/PucMeet-db.json")
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

function redirecionarUsuario() {
    usuarioAtual = getUsuarioSessionStorage()
    if (!usuarioAtual.id) {
        alert("Faça Login!");
        window.location.href = "../login/login.html";
        sessionStorage.clear();
    }
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
            window.location.href = "../post/post.html?id=" + encodeURIComponent(post.postId);
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

        const miniCurtidasPost = document.createElement("button");
        miniCurtidasPost.classList.add("miniCurtidasPost");
        miniCurtidasPost.textContent = (post.jaCurtiu ? "👍" : "🤜") + " " + (post.curtidas || 0);
        miniCurtidasPost.style = post.jaCurtiu ? "background-color: #0077cc;" : ""

        miniCurtidasPost.onclick = function (event) {
            event.stopPropagation();
            curtirPost(post.postId);
        };

        const miniFavoritarPost = document.createElement("button");
        miniFavoritarPost.classList.add("miniFavoritarPost");
        miniFavoritarPost.textContent = post.favorito ? "⭐" : "☆";
        miniFavoritarPost.style = post.favorito ? "background-color: #ccb800;" : ""

        miniFavoritarPost.onclick = function (event) {
            event.stopPropagation();
            favoritarPost(post.postId);
        };

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
        miniPostFooter.appendChild(miniCurtidasPost);
        miniPostFooter.appendChild(miniFavoritarPost);
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
        curtidas: 33,
        favoritos: 1,
        favorito: false
    };

    listaPosts.push(novoPost);

    const db = JSON.parse(localStorage.getItem("PucMeet-db") || "{}");
    db.posts = listaPosts;
    localStorage.setItem("PucMeet-db", JSON.stringify(db));

    if (pesquisaAtiva) {
        pesquisarPost();
    }
    postsSemana = getPostSemana();
    renderizarCarrossel(0);
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
    const listaPosts = getPostsLocalStorage();
    let alvo = pesquisaAtiva ? filtrados : listaPosts;

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
        const db = JSON.parse(localStorage.getItem("PucMeet-db") || "{}");
        db.posts = listaPosts;
        localStorage.setItem("PucMeet-db", JSON.stringify(db));
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
    const listaPosts = getPostsLocalStorage();
    let alvo = pesquisaAtiva ? filtrados : listaPosts;

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
        const db = JSON.parse(localStorage.getItem("PucMeet-db") || "{}");
        db.posts = listaPosts;
        localStorage.setItem("PucMeet-db", JSON.stringify(db));
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
    const listaPosts = getPostsLocalStorage();
    let alvo = pesquisaAtiva ? filtrados : listaPosts;

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
        const db = JSON.parse(localStorage.getItem("PucMeet-db") || "{}");
        db.posts = listaPosts;
        localStorage.setItem("PucMeet-db", JSON.stringify(db));
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
        const curtidasA = Number(a.curtidas) || 0;
        const curtidasB = Number(b.curtidas) || 0;
        const comentariosA = Number(a.comentarios) || 0;
        const comentariosB = Number(b.comentarios) || 0;

        const scoreA = curtidasA + comentariosA;
        const scoreB = curtidasB + comentariosB;

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
    postSemanaDiv.onclick = function () {
        window.location.href = "../post/post.html?id=" + encodeURIComponent(postsSemana[id].postId);
    };

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

    const miniCurtidasPost = document.createElement("button");
    miniCurtidasPost.classList.add("miniCurtidasPost");
    miniCurtidasPost.textContent = (postsSemana[id].jaCurtiu ? "👍" : "🤜") + " " + (postsSemana[id].curtidas || 0);
    miniCurtidasPost.style = postsSemana[id].jaCurtiu ? "background-color: #0077cc;" : ""

    miniCurtidasPost.onclick = function (event) {
        event.stopPropagation();
        curtirPost(postAtual.postId);
    };

    const miniFavoritarPost = document.createElement("button");
    miniFavoritarPost.classList.add("miniFavoritarPost");
    miniFavoritarPost.textContent = postsSemana[id].favorito ? "⭐" : "☆";
    miniFavoritarPost.style = postsSemana[id].favorito ? "background-color: #ccb800;" : ""

    miniFavoritarPost.onclick = function (event) {
        event.stopPropagation();
        favoritarPost(postAtual.postId);
    };

    const data = document.createElement("p");
    data.textContent = postAtual.dataVisual;

    const miniPostCategorias = document.createElement("div");
    miniPostCategorias.classList.add("miniPostCategorias");

    (postAtual.categorias || []).forEach(categoria => {
        const categoriaDiv = document.createElement("div");
        categoriaDiv.textContent = categoria;
        miniPostCategorias.appendChild(categoriaDiv);
    });

    miniPostFooter.appendChild(autor);
    miniPostFooter.appendChild(qtdComentarios);
    miniPostFooter.appendChild(miniCurtidasPost);
    miniPostFooter.appendChild(miniFavoritarPost);

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

function getPostsLocalStorage() {
    return JSON.parse(localStorage.getItem("PucMeet-db") || "{}")?.posts || [];
}

function curtirPost(postId) {
    let listaPosts = getPostsLocalStorage();
    let post = listaPosts.find(post => post.postId === postId);

    if (post) {
        if (post.jaCurtiu === undefined) post.jaCurtiu = false;
        if (post.curtidas === undefined) post.curtidas = 0;

        if (post.jaCurtiu === false) {
            post.curtidas++;
            post.jaCurtiu = true;
        }
        else {
            post.curtidas--;
            post.jaCurtiu = false;
        }

        const db = JSON.parse(localStorage.getItem("PucMeet-db") || "{}");
        db.posts = listaPosts;
        localStorage.setItem("PucMeet-db", JSON.stringify(db));

        renderizarPost();
        postsSemana = getPostSemana();
        renderizarCarrossel(i);
    }
}

function favoritarPost(postId) {
    let listaPosts = getPostsLocalStorage();
    let post = listaPosts.find(post => post.postId === postId);

    if (post) {
        post.favorito = !post.favorito;
        const db = JSON.parse(localStorage.getItem("PucMeet-db") || "{}");
        db.posts = listaPosts;
        localStorage.setItem("PucMeet-db", JSON.stringify(db));
        renderizarPost();
        postsSemana = getPostSemana();
        renderizarCarrossel(i);
    }
}

function iniciarCarrosselAutomatico() {
    if (carrosselInterval) {
        clearInterval(carrosselInterval);
    }

    if (!postsSemana.length) return;

    carrosselInterval = setInterval(() => {
        btnCarrossel(1);
    }, 10000);
}

function salvarDadosLocais(dados) {
    sessionStorage.setItem("usuarioCorrente", JSON.stringify(dados));
    const db = JSON.parse(localStorage.getItem("PucMeet-db") || "{}");
    if (!Array.isArray(db.usuarios)) {
        db.usuarios = [];
    }
    const index = db.usuarios.findIndex(u => u.email === dados.email);
    if (index >= 0) {
        db.usuarios[index] = dados;
    } else {
        db.usuarios.push(dados);
    }
    localStorage.setItem("PucMeet-db", JSON.stringify(db));
}

function ordenarPostsPorCurtidas(desc) {
    const listaPosts = getPostsLocalStorage();
    let alvo = pesquisaAtiva ? filtrados : listaPosts;

    alvo.sort((a, b) => {
        const curtidasA = Number(a.curtidas) || 0;
        const curtidasB = Number(b.curtidas) || 0;
        if (desc) {
            return curtidasB - curtidasA;
        }
        else {
            return curtidasA - curtidasB;
        }
    });

    if (!pesquisaAtiva) {
        const db = JSON.parse(localStorage.getItem("PucMeet-db") || "{}");
        db.posts = listaPosts;
        localStorage.setItem("PucMeet-db", JSON.stringify(db));
    }

    renderizarPost(pesquisaAtiva ? filtrados : undefined);
}

function toggleOrdenarPostsPorCurtidas() {
    postsOrdenacaoCurtidasDesc = !postsOrdenacaoCurtidasDesc;
    ordenarPostsPorCurtidas(postsOrdenacaoCurtidasDesc);

    const btnData = document.getElementById('filtroData');
    const btnAutor = document.getElementById('filtroAlfabeticoNomeAutor');
    const btnComentarios = document.getElementById('filtroQtdComentarios');
    const btnCurtidas = document.getElementById('filtroCurtidas');

    if (btnCurtidas) {
        if (btnData) { btnData.textContent = '⏳'; }
        if (btnAutor) { btnAutor.textContent = '👤 ABC'; }
        if (btnComentarios) { btnComentarios.textContent = '💬'; }

        if (postsOrdenacaoCurtidasDesc) {
            btnCurtidas.textContent = '👍 ▲';
            btnCurtidas.title = 'Ordenar: Mais curtidas primeiro';
        }
        else {
            btnCurtidas.textContent = '👍 ▼';
            btnCurtidas.title = 'Ordenar: Menos curtidas primeiro';
        }
    }
}


function setLoggedInUser(user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
}

function logoutUser() {
    sessionStorage.clear();
    window.location.href = "../homepage/index.html";
}

function renderLoginButton() {
    const loginButton = document.getElementById("btnLogin");
    const userGreeting = document.getElementById("userGreeting");
    const user = usuarioAtual;

    if (!loginButton) {
        return;
    }

    if (user) {
        loginButton.textContent = "Sair";
        loginButton.onclick = logoutUser;
        if (userGreeting) {
            userGreeting.textContent = `Olá, ${user.nome}`;
        }
    } else {
        loginButton.textContent = "Login";
        loginButton.onclick = function () {
            window.location.href = "../login/login.html";
        };
        if (userGreeting) {
            userGreeting.textContent = "";
        }
    }
}