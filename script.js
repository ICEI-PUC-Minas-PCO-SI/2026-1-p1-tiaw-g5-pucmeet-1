function povoaPostsLocalStorage() {
    let data = new Date();
    let posts = [
        { postId: 1, titulo: "Grupo de estudos", conteudo: "Estou a procura por um grupo de estudos de programação", categorias: ["Tecnologia", "Programação", "Ciência"], autor: "João", comentarios: 2, curtidas: 0, favorito: false, dataReal: (data = new Date(2025, 11, 25, 16, 50, 33)), dataVisual: formatarDataHora(data) },
        { postId: 2, titulo: "Ciência", conteudo: "Falando sobre ciência", categorias: ["Ciência"], autor: "Maria", comentarios: 5, curtidas: 0, favorito: false, dataReal: (data = new Date(2025, 4, 20, 10, 30, 0)), dataVisual: formatarDataHora(data) },
        { postId: 3, titulo: "Nova ferremanta", conteudo: "Novidades do mundo tech", categorias: ["Tecnologia"], autor: "Carlos", comentarios: 0, curtidas: 0, favorito: false, dataReal: (data = new Date(2026, 4, 19, 14, 0, 0)), dataVisual: formatarDataHora(data) },
        { postId: 4, titulo: "ATP", conteudo: "Dicas de estudo para programação", categorias: ["Educação", "Programação"], autor: "Ana", comentarios: 3, curtidas: 0, favorito: false, dataReal: (data = new Date(2026, 4, 18, 9, 15, 0)), dataVisual: formatarDataHora(data) },
        { postId: 5, titulo: "Sem querer quase explodi o laboratório", conteudo: "Experimentos recentes em laboratório", categorias: ["Ciência"], autor: "Bruno", comentarios: 1, curtidas: 0, favorito: false, dataReal: (data = new Date(2026, 4, 17, 11, 45, 0)), dataVisual: formatarDataHora(data) },
        { postId: 6, titulo: "PC pra facul", conteudo: "Como montar um PC para estudos", categorias: ["Tecnologia"], autor: "Laura", comentarios: 4, curtidas: 0, favorito: false, dataReal: (data = new Date(2026, 4, 16, 18, 20, 0)), dataVisual: formatarDataHora(data) },
        { postId: 7, titulo: "Arte de na PUC", conteudo: "Exposição de arte local", categorias: ["Artes", "Cultura"], autor: "Mariana", comentarios: 2, curtidas: 0, favorito: false, dataReal: (data = new Date(2026, 4, 15, 17, 0, 5)), dataVisual: formatarDataHora(data) },
        { postId: 8, titulo: "Almoço", conteudo: "Receita rápida para o almoço", categorias: ["Gastronomia"], autor: "Pedro", comentarios: 6, curtidas: 0, favorito: false, dataReal: (data = new Date(2026, 4, 14, 12, 30, 0)), dataVisual: formatarDataHora(data) },
        { postId: 9, titulo: "Campeonato de truco", conteudo: "Notícias do campeonato", categorias: ["Esportes"], autor: "Rafael", comentarios: 8, curtidas: 0, favorito: false, dataReal: (data = new Date(2026, 4, 13, 20, 0, 23)), dataVisual: formatarDataHora(data) },
        { postId: 10, titulo: "Como moggar com estilo", conteudo: "Tendências de moda 2026", categorias: ["Moda"], autor: "Sofia", comentarios: 0, curtidas: 0, favorito: false, dataReal: (data = new Date(2026, 4, 12, 15, 10, 45)), dataVisual: formatarDataHora(data) },
        { postId: 11, titulo: "Rota de viagem", conteudo: "Guia de viagem: 5 destinos", categorias: ["Viagem"], autor: "Marcos", comentarios: 2, curtidas: 0, favorito: false, dataReal: (data = new Date(2026, 4, 5, 8, 0, 7)), dataVisual: formatarDataHora(data) },
        { postId: 12, titulo: "Investimento", conteudo: "Economia em foco: mercado local", categorias: ["Economia"], autor: "Patrícia", comentarios: 3, curtidas: 0, favorito: false, dataReal: (data = new Date(2026, 3, 28, 10, 0, 0)), dataVisual: formatarDataHora(data) },
        { postId: 13, titulo: "Filme ruim dms slk", conteudo: "Filme em cartaz: críticas", categorias: ["Cinema", "Entretenimento"], autor: "Felipe", comentarios: 5, curtidas: 0, favorito: false, dataReal: (data = new Date(2026, 3, 1, 19, 30, 33)), dataVisual: formatarDataHora(data) },
        { postId: 14, titulo: "Preservação do meio ambiente", conteudo: "Como preservar o meio ambiente", categorias: ["Meio Ambiente"], autor: "Clara", comentarios: 1, curtidas: 0, favorito: false, dataReal: (data = new Date(2026, 2, 20, 9, 0, 0)), dataVisual: formatarDataHora(data) },
        { postId: 15, titulo: "Nikola Tesla era o brabo", conteudo: "História: grandes descobertas", categorias: ["História"], autor: "Luiz", comentarios: 0, curtidas: 0, favorito: false, dataReal: (data = new Date(2026, 2, 15, 14, 0, 23)), dataVisual: formatarDataHora(data) },
        { postId: 16, titulo: "Como não surtar?", conteudo: "Saúde mental na universidade", categorias: ["Saúde", "Educação"], autor: "Isabela", comentarios: 7, curtidas: 0, favorito: false, dataReal: (data = new Date(2026, 1, 25, 16, 0, 0)), dataVisual: formatarDataHora(data) },
        { postId: 17, titulo: "Só sei que nada sei", conteudo: "Introdução à filosofia", categorias: ["Filosofia"], autor: "Eduardo", comentarios: 0, curtidas: 0, favorito: false, dataReal: (data = new Date(2026, 0, 10, 11, 0, 0)), dataVisual: formatarDataHora(data) },
        { postId: 18, titulo: "Resenha detected", conteudo: "Lançamento de livro: resenha", categorias: ["Literatura"], autor: "Renata", comentarios: 2, curtidas: 0, favorito: false, dataReal: (data = new Date(2025, 11, 5, 13, 0, 0)), dataVisual: formatarDataHora(data) },
        { postId: 19, titulo: "Alguém manja de uma playlist boa?", conteudo: "Playlist: músicas para estudar", categorias: ["Música"], autor: "Vitor", comentarios: 9, curtidas: 0, favorito: false, dataReal: (data = new Date(2025, 10, 20, 18, 30, 0)), dataVisual: formatarDataHora(data) },
        { postId: 20, titulo: "Matématica é legal pô", conteudo: "Técnicas de resolução de problemas em matemática", categorias: ["Matemática", "Educação"], autor: "Fernanda", comentarios: 4, curtidas: 0, favorito: false, dataReal: (data = new Date(2025, 9, 1, 9, 0, 4)), dataVisual: formatarDataHora(data) }
    ];

    localStorage.setItem("listaPosts", JSON.stringify(posts));
}

function renderizarPost(postsRenderizados) {
    const miniPostsList = document.getElementById("miniPostsList");
    const lista = postsRenderizados || getPostsLocalStorage();

    miniPostsList.innerHTML = "";

    lista.forEach(post => {
        const miniPost = document.createElement("div");
        miniPost.classList.add("miniPost")
        miniPost.onclick = function () {
            window.location.href = "#post-" + encodeURIComponent(post.postId);
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
        miniCurtidasPost.textContent = "👍" + " " + (post.curtidas || 0);

        miniCurtidasPost.onclick = function (event) {
            event.stopPropagation();
            curtirPost(post.postId);
        };

        const miniFavoritarPost = document.createElement("button");
        miniFavoritarPost.classList.add("miniFavoritarPost");
        miniFavoritarPost.textContent = post.favorito ? "⭐" : "☆";

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

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function adicionarPost() { // Função somente de teste
    const listaPosts = JSON.parse(localStorage.getItem("listaPosts")) || [];

    let data = new Date();
    const proximoId = listaPosts.length > 0 ? Math.max(...listaPosts.map(post => Number(post.postId) || 0)) + 1 : 1;

    const novoPost = {
        postId: proximoId,
        titulo: "Teste",
        conteudo: "Conteúdo exemplo",
        categorias: ["Teste"],
        autor: "Fulano de Tal",
        comentarios: getRandomIntInclusive(1, 100),
        dataReal: data,
        dataVisual: formatarDataHora(data),
        curtidas: 0,
        favorito: false,
    };

    listaPosts.push(novoPost);
    localStorage.setItem("listaPosts", JSON.stringify(listaPosts));

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
        localStorage.setItem("listaPosts", JSON.stringify(posts));
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
            return nomeB.localeCompare(nomeA, 'pt-BR');
        }
        else {
            return nomeA.localeCompare(nomeB, 'pt-BR');
        }
    });

    if (!pesquisaAtiva) {
        localStorage.setItem("listaPosts", JSON.stringify(posts));
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
        localStorage.setItem("listaPosts", JSON.stringify(posts));
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

if (!localStorage.getItem("listaPosts")) {
    povoaPostsLocalStorage();
}

const pesquisaInput = document.getElementById('pesquisa');
if (pesquisaInput) {
    pesquisaInput.addEventListener('input', function (event) {
        pesquisarPost();
    });
}

function getPostsLocalStorage() {
    return JSON.parse(localStorage.getItem("listaPosts")) || [];
}

let filtrados = [];
let pesquisaAtiva = false;
let postsOrdenacaoDataDesc = false;
let postsOrdenacaoNomeDesc = false;
let postsOrdenacaoComentariosDesc = false;
ordenarPostsPorData(true);
renderizarPost();
renderLoginButton();

function getLoggedInUser() {
    try {
        return JSON.parse(localStorage.getItem("loggedInUser")) || null;
    } catch (error) {
        return null;
    }
}

function setLoggedInUser(user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
}

function logoutUser() {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
}

function renderLoginButton() {
    const loginButton = document.getElementById("btnLogin");
    const avatarLink = document.getElementById("linkAvatar");
    const avatarImg = avatarLink ? avatarLink.querySelector('img') : null;
    const userGreeting = document.getElementById("userGreeting");
    const user = getLoggedInUser();

    if (!loginButton || !avatarLink || !avatarImg) {
        return;
    }

    const defaultAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Ccircle cx='24' cy='18' r='14' fill='%239faee4'/%3E%3Crect x='12' y='28' width='24' height='12' rx='6' fill='%239faee4'/%3E%3C/svg%3E";

    if (user) {
        const initials = user.name
            .split(' ')
            .filter(Boolean)
            .map(word => word[0].toUpperCase())
            .slice(0, 2)
            .join('');

        const svg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Ccircle cx='24' cy='24' r='24' fill='%232b6cb0'/%3E%3Ctext x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' font-family='Segoe UI, sans-serif' font-size='20' fill='white'%3E${encodeURIComponent(initials)}%3C/text%3E%3C/svg%3E`;

        loginButton.textContent = "Sair";
        loginButton.onclick = logoutUser;
        avatarLink.href = "#";
        avatarImg.src = svg;
        avatarImg.alt = `Avatar de ${user.name}`;
        avatarLink.title = `Usuário: ${user.name}`;
        if (userGreeting) {
            userGreeting.textContent = `Olá, ${user.name}`;
        }
    } else {
        loginButton.textContent = "Login";
        loginButton.onclick = function () {
            window.location.href = "login.html";
        };
        avatarLink.href = "login.html";
        avatarImg.src = defaultAvatar;
        avatarImg.alt = "Avatar perfil";
        avatarLink.title = "Faça login";
        if (userGreeting) {
            userGreeting.textContent = "";
        }
    }
}

function curtirPost(postId) {
    let posts = getPostsLocalStorage();
    let post = posts.find(post => post.postId === postId);

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
        localStorage.setItem("listaPosts", JSON.stringify(posts));
        renderizarPost(pesquisaAtiva ? filtrados : undefined);
    }
}

function favoritarPost(postId) {
    let posts = getPostsLocalStorage();
    let post = posts.find(post => post.postId === postId);

    if (post) {
        post.favorito = !post.favorito;
        localStorage.setItem("listaPosts", JSON.stringify(posts));
        renderizarPost(pesquisaAtiva ? filtrados : undefined);
    }
}
