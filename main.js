// https://taniarascia.github.io/react-hooks/ inspiration
const users = [];
const userForm = document.querySelector('.user_form');
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

function validateForm() {
  if (usernameField.value === '' || nameField.value === '') {
    const errorMessage = document.querySelector('.error');
    // check if error message element does not exists
    if(!errorMessage) {
      const p = document.createElement('p');
      p.textContent = 'you need to fill both name and username';
      p.className = 'error';
      userForm.append(p);
    }
    // if error message element already exists
    else {
      return false; 
    }
  }
  else {
    return true;
  }
}
function clearFormInputs() {
  nameField.value = '';
  usernameField.value = '';
}

function removeErrorMessage() {
  const errorMessage = document.querySelector('.error');
  if (errorMessage) {
    errorMessage.parentNode.removeChild(errorMessage);
  }
}

addUserBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const isFormValid = validateForm();
  if (isFormValid) {
    removeErrorMessage();
    addUser(); // adds user object into array users
    clearFormInputs(); // clears form inputs
    displayUsers();
  }
});
