const userForm = document.getElementById('userForm');
const userTableBody = document.getElementById('userTableBody');
const userIdInput = document.getElementById('userId');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');

let users = JSON.parse(localStorage.getItem('users')) || [];

function renderTable() {
    userTableBody.innerHTML = '';
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button class="btn-edit" onclick="editUser(${index})">Editar</button>
                <button class="btn-delete" onclick="deleteUser(${index})">Excluir</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const id = userIdInput.value;
    const userData = {
        name: usernameInput.value,
        email: emailInput.value
    };

    if (id === '') {
        users.push(userData);
    } else {
        users[id] = userData;
        userIdInput.value = '';
    }

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
    userForm.reset();
    renderTable();
    window.location.href = 'index.html';
});

window.editUser = function(index) {
    userIdInput.value = index;
    usernameInput.value = users[index].name;
    emailInput.value = users[index].email;
};

window.deleteUser = function(index) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        renderTable();
    }
};

renderTable();