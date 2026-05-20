function povoaPostsLocalStorage() {
    var data = new Date();
    let posts = [
        { titulo: "Grupo de estudos", conteudo: "Estou a procura por um grupo de estudos de programação", categorias: ["Tecnologia", "Programação", "Ciência"], autor: "João", comentarios: 2, dataReal: (data = new Date(2025, 11, 25, 16, 50, 33)), dataVisual: formatarDataHora(data) },
        { titulo: "Ciência", conteudo: "Falando sobre ciência", categorias: ["Ciência"], autor: "Maria", comentarios: 5, dataReal: (data = new Date(2025, 4, 20, 10, 30, 0)), dataVisual: formatarDataHora(data) },
        { titulo: "Nova ferremanta", conteudo: "Novidades do mundo tech", categorias: ["Tecnologia"], autor: "Carlos", comentarios: 0, dataReal: (data = new Date(2026, 4, 19, 14, 0, 0)), dataVisual: formatarDataHora(data) },
        { titulo: "ATP", conteudo: "Dicas de estudo para programação", categorias: ["Educação", "Programação"], autor: "Ana", comentarios: 3, dataReal: (data = new Date(2026, 4, 18, 9, 15, 0)), dataVisual: formatarDataHora(data) },
        { titulo: "Sem querer quase explodi o laboratório", conteudo: "Experimentos recentes em laboratório", categorias: ["Ciência"], autor: "Bruno", comentarios: 1, dataReal: (data = new Date(2026, 4, 17, 11, 45, 0)), dataVisual: formatarDataHora(data) },
        { titulo: "PC pra facul", conteudo: "Como montar um PC para estudos", categorias: ["Tecnologia"], autor: "Laura", comentarios: 4, dataReal: (data = new Date(2026, 4, 16, 18, 20, 0)), dataVisual: formatarDataHora(data) },
        { titulo: "Arte de na PUC", conteudo: "Exposição de arte local", categorias: ["Artes", "Cultura"], autor: "Mariana", comentarios: 2, dataReal: (data = new Date(2026, 4, 15, 17, 0, 5)), dataVisual: formatarDataHora(data) },
        { titulo: "Almoço", conteudo: "Receita rápida para o almoço", categorias: ["Gastronomia"], autor: "Pedro", comentarios: 6, dataReal: (data = new Date(2026, 4, 14, 12, 30, 0)), dataVisual: formatarDataHora(data) },
        { titulo: "Campeonato de truco", conteudo: "Notícias do campeonato", categorias: ["Esportes"], autor: "Rafael", comentarios: 8, dataReal: (data = new Date(2026, 4, 13, 20, 0, 23)), dataVisual: formatarDataHora(data) },
        { titulo: "Como moggar com estilo", conteudo: "Tendências de moda 2026", categorias: ["Moda"], autor: "Sofia", comentarios: 0, dataReal: (data = new Date(2026, 4, 12, 15, 10, 45)), dataVisual: formatarDataHora(data) },
        { titulo: "Rota de viagem", conteudo: "Guia de viagem: 5 destinos", categorias: ["Viagem"], autor: "Marcos", comentarios: 2, dataReal: (data = new Date(2026, 4, 5, 8, 0, 7)), dataVisual: formatarDataHora(data) },
        { titulo: "Investimento", conteudo: "Economia em foco: mercado local", categorias: ["Economia"], autor: "Patrícia", comentarios: 3, dataReal: (data = new Date(2026, 3, 28, 10, 0, 0)), dataVisual: formatarDataHora(data) },
        { titulo: "Filme ruim dms slk", conteudo: "Filme em cartaz: críticas", categorias: ["Cinema", "Entretenimento"], autor: "Felipe", comentarios: 5, dataReal: (data = new Date(2026, 3, 1, 19, 30, 33)), dataVisual: formatarDataHora(data) },
        { titulo: "Preservação do meio ambiente", conteudo: "Como preservar o meio ambiente", categorias: ["Meio Ambiente"], autor: "Clara", comentarios: 1, dataReal: (data = new Date(2026, 2, 20, 9, 0, 0)), dataVisual: formatarDataHora(data) },
        { titulo: "Nikola Tesla era o brabo", conteudo: "História: grandes descobertas", categorias: ["História"], autor: "Luiz", comentarios: 0, dataReal: (data = new Date(2026, 2, 15, 14, 0, 23)), dataVisual: formatarDataHora(data) },
        { titulo: "Como não surtar?", conteudo: "Saúde mental na universidade", categorias: ["Saúde", "Educação"], autor: "Isabela", comentarios: 7, dataReal: (data = new Date(2026, 1, 25, 16, 0, 0)), dataVisual: formatarDataHora(data) },
        { titulo: "Só sei que nada sei", conteudo: "Introdução à filosofia", categorias: ["Filosofia"], autor: "Eduardo", comentarios: 0, dataReal: (data = new Date(2026, 0, 10, 11, 0, 0)), dataVisual: formatarDataHora(data) },
        { titulo: "Resenha detected", conteudo: "Lançamento de livro: resenha", categorias: ["Literatura"], autor: "Renata", comentarios: 2, dataReal: (data = new Date(2025, 11, 5, 13, 0, 0)), dataVisual: formatarDataHora(data) },
        { titulo: "Alguém manja de uma playlist boa?", conteudo: "Playlist: músicas para estudar", categorias: ["Música"], autor: "Vitor", comentarios: 9, dataReal: (data = new Date(2025, 10, 20, 18, 30, 0)), dataVisual: formatarDataHora(data) },
        { titulo: "Matématica é legal pô", conteudo: "Técnicas de resolução de problemas em matemática", categorias: ["Matemática", "Educação"], autor: "Fernanda", comentarios: 4, dataReal: (data = new Date(2025, 9, 1, 9, 0, 4)), dataVisual: formatarDataHora(data) }
    ];

    localStorage.setItem("listaPosts", JSON.stringify(posts));
}

var listaPosts = getPostsLocalStorage();

function renderizarPost() {
    const miniPostsList = document.getElementById("miniPostsList");
    listaPosts = getPostsLocalStorage();

    miniPostsList.innerHTML = "";

    listaPosts.forEach(post => {
        const miniPost = document.createElement("div");
        miniPost.classList.add("miniPost")

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

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function adicionarPost() { // Função somente de teste
    const btnAdicionar = document.getElementById("btnAdicionar");
    const listaPosts = JSON.parse(localStorage.getItem("listaPosts")) || [];
    let data = new Date();

    const novoPost = {
        titulo: "Teste",
        conteudo: "Conteúdo exemplo",
        categorias: ["Teste"],
        autor: "Fulano de Tal",
        comentarios: getRandomIntInclusive(1, 100),
        dataReal: data,
        dataVisual: formatarDataHora(data),
    };

    listaPosts.push(novoPost);

    localStorage.setItem(
        "listaPosts",
        JSON.stringify(listaPosts)
    );
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
    let valorRetorno = false;

    posts.sort((a, b) => {
        const tempoA = new Date(a.dataReal).getTime();
        const tempoB = new Date(b.dataReal).getTime();
        if (desc) {
            valorRetorno = tempoB - tempoA;
        }
        else {
            valorRetorno = tempoA - tempoB;
        }
        return valorRetorno;
    });

    localStorage.setItem("listaPosts", JSON.stringify(posts));
    renderizarPost();
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

    posts.sort((a, b) => {
        const nomeA = (a.autor || "").toString().trim().toLocaleLowerCase('pt-BR');
        const nomeB = (b.autor || "").toString().trim().toLocaleLowerCase('pt-BR');
        if (desc) {
            return nomeA.localeCompare(nomeB, 'pt-BR');
        }
        else {
            return nomeB.localeCompare(nomeA, 'pt-BR');
        }
    });

    localStorage.setItem("listaPosts", JSON.stringify(posts));
    renderizarPost();
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

    posts.sort((a, b) => {
        const qtdComentariosA = Number(a.comentarios) || 0;
        const qtdComentariosB = Number(b.comentarios) || 0;
        if (desc) {
            return qtdComentariosB - qtdComentariosA;
        }
        else {
            return qtdComentariosA - qtdComentariosB;
        }
    });

    localStorage.setItem("listaPosts", JSON.stringify(posts));
    renderizarPost();
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

if (!localStorage.getItem("listaPosts")) {
    povoaPostsLocalStorage();
}

function getPostsLocalStorage() {
    return JSON.parse(localStorage.getItem("listaPosts")) || [];
}

let postsOrdenacaoDataDesc = false;
let postsOrdenacaoNomeDesc = false;
let postsOrdenacaoComentariosDesc = false;
ordenarPostsPorData(true);
renderizarPost();