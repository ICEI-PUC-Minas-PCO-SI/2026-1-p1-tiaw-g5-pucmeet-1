function povoaPostsLocalStorage() {
    let posts = [{
        titulo: "Primeiro post",
        conteudo: "Este é o conteúdo do primeiro post",
        categorias: ["Tecnologia",
            "Programação", "Ciência"],
        autor: "João",
        comentarios: 2,
        data: "10 min atrás"
    },
    {
        titulo: "Segundo post",
        conteudo: "Falando sobre ciência",
        categorias: ["Ciência"],
        autor: "Maria",
        comentarios: 5,
        data: "1 hora atrás"
    },
    {
        titulo: "Terceiro post",
        conteudo: "Novidades do mundo tech",
        categorias: ["Tecnologia"],
        autor: "Carlos",
        comentarios: 0,
        data: "1 dia atrás"
    }
    ];

    localStorage.setItem("listaPosts", JSON.stringify(posts));
}

if (!localStorage.getItem("listaPosts")) {
    povoaPostsLocalStorage();
}

function carregaPostsLocalStorage() {
    return JSON.parse(localStorage.getItem("listaPosts"));
}

const listaPosts = carregaPostsLocalStorage();

function renderizarPost() {
    const miniPostsList = document.getElementById("miniPostsList");

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
        miniAutorPost.textContent = post.autor

        const miniQtdComentariosPost = document.createElement("div");
        miniQtdComentariosPost.classList.add("miniQtdComentariosPost");
        miniQtdComentariosPost.textContent = "💬" + " " + post.comentarios;

        const miniDataPost = document.createElement("div");
        miniDataPost.classList.add("miniDataPost");
        miniDataPost.textContent = post.data;

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
        miniPost.appendChild(miniPostCategorias);

        miniPostFooter.appendChild(miniAutorPost);
        miniPostFooter.appendChild(miniQtdComentariosPost);
        miniPostFooter.appendChild(miniDataPost);

        miniPostsList.appendChild(miniPost);
    });
}

renderizarPost();

const btnAdicionar = document.getElementById("btnAdicionar");

btnAdicionar.addEventListener("click", adicionarPost);

function adicionarPost() {
    const listaPosts = JSON.parse(localStorage.getItem("listaPosts")) || [];

    const novoPost = {
        titulo: "Teste",
        conteudo: "Conteúdo exemplo",
        categorias: ["Teste"],
        autor: "Fulano de Tal",
        comentarios: 0,
        data: "Agora"
    };

    listaPosts.push(novoPost);

    localStorage.setItem(
        "listaPosts",
        JSON.stringify(listaPosts)
    );

    renderizarPosts();
}


