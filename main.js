// https://codepen.io/jaycbrf/pen/iBszr
const birthdayDateField = document.getElementById('birthday-date');
const expectedGuestsField = document.getElementById('expected-guests');
const setupBirthdayForm = document.querySelector('.setup-birthday');
const setUpBirthdayBtn = document.querySelector('.setup-birthday-btn');
const nameField = document.getElementById('name');
const locationField = document.getElementById('location');
const addGuestsBtn = document.querySelector('.add-guests-btn');
const formInputs = document.querySelectorAll('input');
const tableBody = document.querySelector('.guests-list tbody');
let isBirthdayFieldValid; let isExpectedGuestsFieldValid;
let isNameFieldValid; let isLocationFieldValid;


const fieldsData = {
  birthdayField: {
    regex: /20\d{2}-\d{2}-\d{2}/,
    message: 'Please enter date with a valid format: mm/dd/yyyy'
  },
  expectedGuestsField: {
    regex: /[1-9]{1,}/,
    message: 'Please enter a number or digit only'
  },
  nameField: {
    regex: /^[ \u00c0-\u01ffa-zA-Z'\-]+$/,
    message: 'Please enter a real name',
  },
  locationField: {
    regex: /^[ \u00c0-\u01ffa-zA-Z'\-]+$/,
    message: 'Please enter a valid location of the guest',
  },
};

/* Program Utilities */
const utils = {
  months: ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 
    'September', 'October', 'November', 'December'],
  getCurrentDate() {
    const date = new Date();
    const month = this.months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const dateToday = `${day} ${month} ${year}`;
    return dateToday;
  },
};

const guests = {
  guestList: localStorage.getItem('items') 
    ? JSON.parse(localStorage.getItem('items')): [],
  addGuests(name, location) {
    const guestData = {
      name,
      location,
      dateAdded: utils.getCurrentDate(),
    }
    this.guestList.push(guestData);
    localStorage.setItem('items', JSON.stringify(this.guestList));
    view.displayAddedGuest(guestData);
  },
  deleteGuest(position) {
    this.guestList.splice(position, 1);
    localStorage.setItem('items', JSON.stringify(this.guestList));
    while(tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
    view.displayAllAddedGuests();
  },
};

const view = {
  createMessage(domPath, message) {
    const paragraph = document.createElement('p');
    paragraph.textContent = message;
    paragraph.className = 'error';
    domPath.insertAdjacentElement('afterend', paragraph);
  },

  checkIfErrorMessageExists(parentSibling) {
    if (parentSibling && parentSibling.className === 'error') {
      return true;
    }
    return false;
  },

  removeErrorMessage(parentSibling) {
    if (this.checkIfErrorMessageExists(parentSibling)) {
      parentSibling.remove();
    }
  },

  showInputIsValid(parent, target, parentSibling) {
    this.removeErrorMessage(parentSibling);
    // show checkmark icon
    parent.querySelector('.icon-checkmark-outline').classList.remove('hidden');
    target.classList.add('has-success');
    // remove close/error icon
    parent.querySelector('.icon-close-outline').classList.add('hidden');
    // remove error outline
    target.classList.remove('has-error');
  },

  showInputIsInvalid(parent, target, parentSibling, message) {
    if (!this.checkIfErrorMessageExists(parentSibling)) {
      this.createMessage(parent, message);
    }
    // hide error/checkmark icon
    parent.querySelector('.icon-checkmark-outline').classList.add('hidden');
    // show error icon
    parent.querySelector('.icon-close-outline').classList.remove('hidden');
    target.classList.add('has-error');
    target.classList.remove('has-success');
  },
  displayAddedGuest(guest) {
    // guests.guestList.forEach((guest) => {     
      const tableRow = `
      <tr>
     <td>${guest.name}</td>
     <td>${guest.location}</td>
     <td>${guest.dateAdded}</td> 
     </tr>
    `;
    tableBody.insertAdjacentHTML('beforeend', tableRow);
  },
  displayAllAddedGuests() {
    guests.guestList.forEach((guest) => {     
    this.displayAddedGuest(guest)
  });
},
};

const validators = {
  validateInput(regex, fieldValue) {
    if (regex.test(fieldValue)) {
      return true;
    }
    return false;
  },

  runValidator(dataField, parent, target, parentSibling, fieldInput) {
    const { regex, message } = dataField;
    const validate = validators.validateInput(regex, fieldInput.value);
    if (validate) {
      view.showInputIsValid(parent, target, parentSibling);
      return true;
    } 
    view.showInputIsInvalid(parent, target, parentSibling, message);
    
  },
};


function validateInput(event) {
  const target = event.target;
  const targetId = event.target.id;
  const parent = event.target.parentNode;
  const parentSibling = event.target.parentNode.nextElementSibling;
  switch (targetId) {
    case 'birthday-date':
      isBirthdayFieldValid = validators.runValidator(fieldsData.birthdayField, parent, target,
        parentSibling, birthdayDateField);
      break;
    case 'expected-guests':
      isExpectedGuestsFieldValid = validators.runValidator(fieldsData.expectedGuestsField, parent, target,
        parentSibling, expectedGuestsField);
      break;
    case 'name':
      isNameFieldValid = validators.runValidator(fieldsData.nameField, parent, target,
        parentSibling, nameField);
      break;
    case 'location':
      isLocationFieldValid = validators.runValidator(fieldsData.locationField, parent, target,
        parentSibling, locationField);
      break;
    default:
      break;
  }
  if (isBirthdayFieldValid && isExpectedGuestsFieldValid) {
    setUpBirthdayBtn.removeAttribute('disabled');
  }
  if (isNameFieldValid && isLocationFieldValid) {
    addGuestsBtn.removeAttribute('disabled');
  }

}

const eventsList = ['input', 'blur'];

formInputs.forEach(inputField => {
  for (let event of eventsList) {
    inputField.addEventListener(event, function(e) {
      validateInput(e);
    });

  }

});

setUpBirthdayBtn.addEventListener('click', (e) => {
  e.preventDefault();
});

addGuestsBtn.addEventListener('click', (e) => {
  e.preventDefault();
  guests.addGuests(nameField.value, locationField.value);
  nameField.value = '';
  locationField.value = '';
});

view.displayAllAddedGuests();