const userForm = document.getElementById('userForm');
const userTableBody = document.getElementById('userTableBody');

const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');

let users = carregaUsuarios();

const loginForm = document.getElementById('loginForm');
const loginNameInput = document.getElementById('loginName');
const loginEmailInput = document.getElementById('loginEmail');
const loginMessage = document.getElementById('loginMessage');

if (userForm) {
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();


        const newUser = {
            id: users.length + 1,
            login: "",
            senha: 123,
            nome: usernameInput.value,
            email: emailInput.value,
            foto: "",
            interesses: [],
            estatisticas: {
                posts: 0,
                comentarios: 0
            },
            membroDesde: formatarDataHora(new Date())
        };

        users.push(newUser);
        const db = JSON.parse(localStorage.getItem("PucMeet-db") || "{}");
        db.usuarios = users;
        localStorage.setItem("PucMeet-db", JSON.stringify(db));
        users = carregaUsuarios();
        userForm.reset();
        renderTable();
    });
}

window.editUser = function (index) {
    userIdInput.value = index;
    usernameInput.value = users[index].nome;
    emailInput.value = users[index].email;
};

window.deleteUser = function (index) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        users.splice(index, 1);
        const db = JSON.parse(localStorage.getItem("PucMeet-db") || "{}");
        db.usuarios = users;
        localStorage.setItem("PucMeet-db", JSON.stringify(db));
        renderTable();
    }
};

if (userForm) {
    renderTable();
}

if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = loginNameInput.value.trim();
        const email = loginEmailInput.value.trim().toLowerCase();

        if (!nome || !email) {
            loginMessage.textContent = 'Preencha nome e e-mail.';
            return;
        }

        const user = users.find(item => item.nome === nome && item.email.toLowerCase() === email);
        if (!user) {
            loginMessage.textContent = 'Usuário não encontrado. Faça cadastro primeiro.';
            return;
        }

        sessionStorage.setItem("usuarioCorrente", JSON.stringify(user));
        window.location.href = '../Homepage/index.html';
    });
}

function carregaUsuarios() {
    try {
        const db = JSON.parse(localStorage.getItem("PucMeet-db") || "{}");
        return Array.isArray(db.usuarios) ? db.usuarios : [];
    } catch (e) {
        console.error("Erro ao carregar usuários:", e);
        return [];
    }
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

function renderTable() {
    userTableBody.innerHTML = '';
    if (!Array.isArray(users)) {
        users = carregaUsuarios();
    }
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.nome}</td>
            <td>${user.email}</td>
            <td>
                <button class="btn-edit" onclick="editUser(${index})">Editar</button>
                <button class="btn-delete" onclick="deleteUser(${index})">Excluir</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
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

function getUsuarioSessionStorage() {
    return JSON.parse(sessionStorage.getItem("usuarioCorrente") || "{}");
}

function setLoggedInUser(user) {
    if (usuarioAtual) {
        sessionStorage.setItem("usuarioCorrente", JSON.stringify(usuarioAtual));
    }
}
