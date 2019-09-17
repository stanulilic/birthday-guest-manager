// https://taniarascia.github.io/react-hooks/ inspiration
const users = [];
const nameField = document.getElementById('name');
const usernameField = document.getElementById('username');
const addUserBtn = document.querySelector('.add-user-btn');


function addUser() {
  users.push({
    name: nameField.value,
    username: usernameField.value,
  });
}

function displayUsers() { 
  console.log('users');
    
  users.forEach((user) => console.log(user));
}

function clearFormInputs() {
  nameField.value = '';
  usernameField.value = '';
}

addUserBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addUser();
  clearFormInputs();
  displayUsers();
});
