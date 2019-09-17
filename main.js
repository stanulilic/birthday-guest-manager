const users = [];
const nameField = document.getElementById('name');
const usernameField = document.getElementById('username');
const addUserBtn = document.querySelector('.add-user-btn');


addUserBtn.addEventListener('click', (e) => {
  e.preventDefault();
  users.push({
    name: nameField.value,
    username: usernameField.value,
  });
});
