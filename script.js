if (!localStorage.getItem('posts_comunidade')) {
    const postsIniciais = [
        { id: 101, title: "Alguém pra grupo de Cálculo 2?", content: "Estou procurando pessoas para estudar cálculo 2 juntos. Tenho dificuldade com integrais.", category: "Estudos", author: "Anônimo" },
        { id: 102, title: "Alguém joga Valorant? Bora ranqueada", content: "Bora fechar um squad para subir elo no Valorant. Sem trolls por favor!", category: "Jogos", author: "Estudante123" }
    ];
    localStorage.setItem('posts_comunidade', JSON.stringify(postsIniciais));
}

let idPostSelecionado = null;

const btnPublicar = document.getElementById('btn-publicar');
if (btnPublicar) {
    let categoriaSelecionada = "";
    let esAnonimo = false;

    const botoesCategoria = document.querySelectorAll('.btn-categoria');
    botoesCategoria.forEach(btn => {
        btn.addEventListener('click', () => {
            botoesCategoria.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            categoriaSelecionada = btn.getAttribute('data-categoria');
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
        const titulo = document.getElementById('post-title').value.trim();
        const conteudo = document.getElementById('post-content').value.trim();

        if (!titulo || !conteudo || !categoriaSelecionada) {
            alert("Por favor, preencha o título, o conteúdo e selecione uma categoria!");
            return;
        }

        const todosPosts = JSON.parse(localStorage.getItem('posts_comunidade')) || [];
        
        const novoPost = {
            id: Date.now(), 
            title: titulo,
            content: conteudo,
            category: categoriaSelecionada,
            author: esAnonimo ? "Anônimo" : "Estudante123"
        };

        todosPosts.unshift(novoPost);
        localStorage.setItem('posts_comunidade', JSON.stringify(todosPosts));
        
        document.getElementById('post-title').value = "";
        document.getElementById('post-content').value = "";
        categoriaSelecionada = "";
        esAnonimo = false;
        
        // Resetar UI
        botoesCategoria.forEach(b => b.classList.remove('active'));
        const btnAnonimi = document.getElementById('btn-anonimo');
        if (btnAnonimi) {
            const span = btnAnonimi.querySelector('span');
            if (span) span.textContent = "Não";
        }
        
        window.location.href = "feed.html";
    });
}

const listaOl = document.getElementById('lista-links-posts');
if (listaOl) {
    montarListaDePosts();
}

function montarListaDePosts() {
    const todosPosts = JSON.parse(localStorage.getItem('posts_comunidade')) || [];
    listaOl.innerHTML = "";

    if (todosPosts.length === 0) {
        listaOl.innerHTML = "<p style='color:gray; font-weight:normal;'>Nenhum post disponível no feed.</p>";
        document.getElementById('area-visualizacao').style.display = "none";
        return;
    }

    todosPosts.forEach(post => {
        const itemLista = document.createElement('li');
        itemLista.textContent = post.title;
        itemLista.style.cursor = "pointer";
        itemLista.addEventListener('click', () => {
            carregarPostParaVisualizar(post.id);
        });

        listaOl.appendChild(itemLista);
    });
}

function carregarPostParaVisualizar(id) {
    const todosPosts = JSON.parse(localStorage.getItem('posts_comunidade')) || [];
    const postEncontrado = todosPosts.find(p => p.id === Number(id));

    if (postEncontrado) {
        idPostSelecionado = id; 
        document.getElementById('edit-titulo').value = postEncontrado.title;
        document.getElementById('edit-conteudo').value = postEncontrado.content;
        document.getElementById('view-categoria').textContent = postEncontrado.category;
        document.getElementById('view-autor').textContent = postEncontrado.author;
        document.getElementById('area-visualizacao').style.display = "block";
    }
}

const btnSalvarEdicao = document.getElementById('btn-salvar-edicao');
if (btnSalvarEdicao) {
    btnSalvarEdicao.addEventListener('click', () => {
        const todosPosts = JSON.parse(localStorage.getItem('posts_comunidade')) || [];
        const index = todosPosts.findIndex(p => p.id === Number(idPostSelecionado));

        if (index !== -1) {
            todosPosts[index].title = document.getElementById('edit-titulo').value.trim(); 
            todosPosts[index].content = document.getElementById('edit-conteudo').value.trim();

            localStorage.setItem('posts_comunidade', JSON.stringify(todosPosts));
            alert("Post atualizado com sucesso!");
            
            montarListaDePosts(); 
        }
    });
}

const btnExcluirPost = document.getElementById('btn-excluir-post');
if (btnExcluirPost) {
    btnExcluirPost.addEventListener('click', () => {
        if (confirm("Deseja mesmo excluir definitivamente este post?")) {
            const todosPosts = JSON.parse(localStorage.getItem('posts_comunidade')) || [];
            const listaFiltrada = todosPosts.filter(p => p.id !== Number(idPostSelecionado));

            localStorage.setItem('posts_comunidade', JSON.stringify(listaFiltrada));
            alert("Post deletado com sucesso!");

            document.getElementById('area-visualizacao').style.display = "none"; 

            montarListaDePosts(); 
        }
    });
}