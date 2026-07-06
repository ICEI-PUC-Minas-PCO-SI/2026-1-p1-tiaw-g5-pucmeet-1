const DADOS_PADRAO = {
    nome: "João Silva",
    email: "joao.silva@gmail.com",
    foto: null,
    interesses: ["Tecnologia", "Jogos", "Música", "Estudos"]
};

const outroUsuarioMock = {
    nome: "Maria Santos",
    foto: null,
    interesses: ["Cálculo 2", "Física", "Café", "Desenvolvimento"],
    estatisticas: { posts: 5, comentarios: 12 },
    membroDesde: "Junho 2024"
};

let usuarioAtual = getUsuarioSessionStorage();

document.getElementById('input-foto').addEventListener('change', function (e) {
    const reader = new FileReader();
    reader.onload = function () {
        usuarioAtual.foto = reader.result;
        document.getElementById('foto-preview-edit').innerHTML = `<img src="${reader.result}">`;
    };
    if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
    }
});

document.getElementById("novo-interesse").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        adicionarInteresse();
    }
});

if (!localStorage.getItem("PucMeet-db")) {
    carregaJSONLocalStorage();
}

atualizarTelaPrincipal();
renderizarTagsPrincipal();
atualizarEstatisticasUsuario();

function getUsuarioSessionStorage() {
    return JSON.parse(sessionStorage.getItem("usuarioCorrente") || "{}");
}

function carregaUsuarios() {
    return JSON.parse(localStorage.getItem("PucMeet-db") || "{}")?.usuarios || [];
}

function carregaJSONLocalStorage() {
    fetch("../../../db/PucMeet-db.json")
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("PucMeet-db", JSON.stringify(data));
        })
        .catch(error => console.error("Erro ao carregar posts:", error));
}

function salvarDadosLocais(dados) {
    sessionStorage.setItem("usuarioCorrente", JSON.stringify(dados));
    const db = JSON.parse(localStorage.getItem("PucMeet-db") || "{}");
    db.usuarios = dados;
    localStorage.setItem("PucMeet-db", JSON.stringify(db));
}

function irPara(idTela) {
    const telasPermitidas = ['tela-perfil', 'tela-editar', 'tela-senha', 'tela-interesses', 'tela-visualizar-outro'];

    telasPermitidas.forEach(tela => {
        document.getElementById(tela).classList.add('oculto');
    });

    document.getElementById(idTela).classList.remove('oculto');

    if (idTela === 'tela-editar') {
        document.getElementById('input-nome').value = usuarioAtual.nome;
        document.getElementById('input-email').value = usuarioAtual.email;
    }

    if (idTela === 'tela-interesses') {
        renderizarGerenciarInteresses();
    }

    if (idTela === 'tela-visualizar-outro') {
        carregarPerfilOutro(outroUsuarioMock);
    }
}

function salvarPerfil() {
    const nomeInput = document.getElementById('input-nome').value.trim();
    const emailInput = document.getElementById('input-email').value.trim();

    if (nomeInput === "" || emailInput === "") {
        alert("Nome e e-mail não podem ficar vazios.");
        return;
    }

    usuarioAtual.nome = nomeInput;
    usuarioAtual.email = emailInput;

    salvarDadosLocais(usuarioAtual);
    atualizarTelaPrincipal();

    alert("Perfil atualizado com sucesso!");
    irPara('tela-perfil');
}

function validarEAlterarSenha() {
    const senhaAtual = document.getElementById('senha-atual').value;
    const senhaNova = document.getElementById('senha-nova').value;
    const senhaConfirma = document.getElementById('senha-confirma').value;

    if (senhaAtual.trim() === "" || senhaNova.trim() === "" || senhaConfirma.trim() === "") {
        alert("Por favor, preencha todos os campos de senha.");
        return;
    }

    if (senhaNova.length < 6) {
        alert("A nova senha precisa ter pelo menos 6 caracteres!");
        return;
    }

    if (senhaNova !== senhaConfirma) {
        alert("A nova senha e a confirmação não são iguais.");
        return;
    }

    alert("Senha alterada com sucesso!");

    document.getElementById('senha-atual').value = "";
    document.getElementById('senha-nova').value = "";
    document.getElementById('senha-confirma').value = "";

    irPara('tela-perfil');
}

function adicionarInteresse() {
    const input = document.getElementById('novo-interesse');
    const valor = input.value.trim();

    if (valor !== "") {
        usuarioAtual.interesses.push(valor);
        input.value = "";

        salvarDadosLocais(usuarioAtual);
        renderizarGerenciarInteresses();
        renderizarTagsPrincipal();
    }
}

function removerInteresse(index) {
    const confirmar = confirm("Tem certeza que deseja remover este interesse?");
    if (!confirmar) return;

    usuarioAtual.interesses.splice(index, 1);

    salvarDadosLocais(usuarioAtual);
    renderizarGerenciarInteresses();
    renderizarTagsPrincipal();
}

function atualizarTelaPrincipal() {
    document.getElementById('nome-exibicao').innerText = usuarioAtual.nome;
    document.getElementById('email-exibicao').innerText = usuarioAtual.email;

    if (usuarioAtual.foto) {
        document.getElementById('foto-preview-principal').innerHTML = `<img src="${usuarioAtual.foto}">`;
        document.getElementById('foto-preview-edit').innerHTML = `<img src="${usuarioAtual.foto}">`;
    }
}

function carregarPerfilOutro(usuario) {
    document.getElementById('outro-nome-titulo').innerText = `Perfil de ${usuario.nome.split(' ')[0]}`;
    document.getElementById('outro-nome-exibicao').innerText = usuario.nome;
    document.getElementById('outro-num-posts').innerText = usuario.estatisticas.posts;
    document.getElementById('outro-num-comentarios').innerText = usuario.estatisticas.comentarios;
    document.getElementById('outro-membro-desde').innerText = `Membro desde: ${usuario.membroDesde}`;

    const containerTags = document.getElementById('outro-lista-interesses');
    containerTags.innerHTML = "";
    usuario.interesses.forEach(item => {
        containerTags.innerHTML += `<span class="tag">${item}</span>`;
    });

    if (usuario.foto) {
        document.getElementById('outro-foto-exibicao').innerHTML = `<img src="${usuario.foto}">`;
    } else {
        document.getElementById('outro-foto-exibicao').innerHTML = `<span>👤</span>`;
    }
}

function renderizarGerenciarInteresses() {
    const container = document.getElementById('gerenciar-lista-interesses');
    container.innerHTML = "";

    if (usuarioAtual.interesses.length === 0) {
        container.innerHTML = "<p style='font-size: 14px; text-align: center; margin-top: 10px;'>Nenhum interesse adicionado.</p>";
        return;
    }

    usuarioAtual.interesses.forEach((item, index) => {
        container.innerHTML += `
            <div class="item-interesse">
                ${item}
                <button class="btn-del" onclick="removerInteresse(${index})">X</button>
            </div>
        `;
    });
}

function renderizarTagsPrincipal() {
    const container = document.getElementById('lista-interesses-perfil');
    container.innerHTML = "";

    if (usuarioAtual.interesses.length === 0) {
        container.innerHTML = "<span class='tag' style='background: #ccc;'>Sem interesses</span>";
        return;
    }

    usuarioAtual.interesses.forEach(item => {
        container.innerHTML += `<span class="tag">${item}</span>`;
    });
}

function logout() {
    sessionStorage.clear();
    window.location.href = "../homepage/index.html";
}

function atualizarEstatisticasUsuario() {
    if (!usuarioAtual || !usuarioAtual.nome) return;

    const qtdPosts = document.getElementById('meu-num-posts');
    const qtdComentarios = document.getElementById('meu-num-comentarios');
    if (qtdComentarios) qtdComentarios.innerText = usuarioAtual.estatisticas.comentarios;
    if (qtdPosts) qtdPosts.innerText = usuarioAtual.estatisticas.posts;
}