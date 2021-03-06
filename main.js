/* eslint-disable indent */
// https://codepen.io/jaycbrf/pen/iBszr
const birthdayDateField = document.getElementById('birthday-date');
const expectedGuestsField = document.getElementById('expected-guests');
const setupBirthdayForm = document.querySelector('.setup-birthday');
const setupBirthdaySection = document.querySelector('.setup-birthday-section');
const setUpBirthdayBtn = document.querySelector('.setup-birthday-btn');
const mainContent = document.querySelector('.main-content');
const appLogo = document.querySelector('.logo-link');
const homeSection = document.querySelector('.home-section');
const setBirthdayDateWrapper = document.querySelector('.set-birthday-date');
const resetBtn = document.querySelector('.reset-btn');
const nav = document.querySelector('nav');
const summaryWrapper = document.querySelector('.summary-wrapper');
const nameField = document.getElementById('name');
const locationField = document.getElementById('location');
const successIcons = document.querySelectorAll('.add-guests .success');
const guestsSection = document.querySelector('.guests-section');
const addGuestsBtn = document.querySelector('.add-guests-btn');
const addGuestsBtnWrapper = document.querySelector('.addguests-btn-wrap');
const updateGuestsBtnWrapper = document.querySelector('.update-guests-wrap');
const formInputs = document.querySelectorAll('input');
const tableBody = document.querySelector('.guests-list tbody');
let isBirthdayFieldValid;
let isExpectedGuestsFieldValid;

const birthdayEventSet = localStorage.getItem('eventSet')
  ? JSON.parse(localStorage.getItem('eventSet'))
  : {};

const fieldsData = {
  birthdayField: {
    regex: /20\d{2}-\d{2}-\d{2}/,
    message: 'Please enter date with a valid format: mm/dd/yyyy',
  },
  expectedGuestsField: {
    regex: /[1-9]{1,}/,
    message: 'Please enter a number or digit only',
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
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  getCurrentDate(date = new Date()) {
    const month = this.months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const dateToday = `${day} ${month} ${year}`;
    return dateToday;
  },
  getCurrentDateAndTime() {
    return new Date();
  },
  parseDate(dateStr) {
    const ymd = dateStr.split('-');
    return new Date(ymd[0], ymd[1] - 1, ymd[2]);
  },
  dateDifference() {
    if (birthdayEventSet.birthdayDate) {
      const birthdayDate = this.parseDate(birthdayEventSet.birthdayDate);
      // Take the difference between the dates and divide by milliseconds per day.
      // Round to nearest whole number to deal with DST.
      return Math.round(
        Math.abs(birthdayDate - this.getCurrentDateAndTime()) /
          (1000 * 60 * 60 * 24),
      );
    }
  },
  getSetBirthdayDate() {
  const date = utils.parseDate(birthdayEventSet.birthdayDate);
  return utils.getCurrentDate(date);
  },
};

const guests = {
  guestList: localStorage.getItem('items')
    ? JSON.parse(localStorage.getItem('items'))
    : [],
  addGuests(name, location) {
    const guestData = {
      name,
      location,
      dateAdded: utils.getCurrentDate(),
    };
    this.guestList.push(guestData);
    const arrayIndex = this.guestList.indexOf(guestData);
    localStorage.setItem('items', JSON.stringify(this.guestList));
    view.displayAddedGuest(guestData, arrayIndex);
  },
  deleteGuest(position) {
    this.guestList.splice(position, 1);
    localStorage.setItem('items', JSON.stringify(this.guestList));
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
    view.displayAllAddedGuests();
  },
  changeGuestDetails(position, name, location) {
    // eslint-disable-next-line keyword-spacing
    if (name) {
      this.guestList[position].name = name;
    }
    if (location) {
      this.guestList[position].location = location;
    }
    localStorage.setItem('items', JSON.stringify(this.guestList));
  },
};

const view = {
  ctx: document.getElementById('mybarChart'),
   ctx2: document.getElementById('mypieChart'),

  guestsArray: [
  parseInt(birthdayEventSet.expectedGuests),
  guests.guestList.length,
  ],

  labels: ['Expected Guests', 'Added Guests'],

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
  clearSuccessFormStyles() {
    nameField.classList.remove('has-success');
    locationField.classList.remove('has-success');
    successIcons.forEach((icon) => icon.classList.add('hidden'));
  },
  displayAddedGuest(guest, index) {
    const tableRow = `
      <tr id=${index}>
     <td>${guest.name}</td>
     <td>${guest.location}</td>
     <td class="date-table-data">${guest.dateAdded}</td> 
     <td>
     <button class="btn btn-secondary updateDetailsBtn">Update</button>
     <button class="btn btn-secondary-warning deleteBtn">Delete</button>
     </td>
     </tr>
    `;
    tableBody.insertAdjacentHTML('beforeend', tableRow);
  },
  displayAllAddedGuests() {
    guests.guestList.forEach((guest, i) => {
      this.displayAddedGuest(guest, i);
    });
  },
  loadFormWithGuestData(position) {
    const guest = guests.guestList[position];
    nameField.value = guest.name;
    locationField.value = guest.location;
  },
  removeAddGuestsBtn() {
    addGuestsBtn.classList.add('hidden');
    updateGuestsBtnWrapper.classList.remove('hidden');
  },
  showAddGuestsBtn() {
    addGuestsBtn.classList.remove('hidden');
    addGuestsBtn.disabled = true;
    updateGuestsBtnWrapper.classList.add('hidden');
  },
  displayUpdateDetailsBtn(index) {
    const buttons = `
    <button class="update-guests-btn btn btn-primary" disabled id=${index}>Update</button>
    <button class="cancel-btn btn btn-secondary">Cancel</button>
    `;
    while (updateGuestsBtnWrapper.firstChild) {
      updateGuestsBtnWrapper.removeChild(updateGuestsBtnWrapper.firstChild);
    }
    updateGuestsBtnWrapper.insertAdjacentHTML('beforeend', buttons);
  },
  changeGuestDetails(position, name, location) {
    guests.changeGuestDetails(position, name, location);
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
    view.displayAllAddedGuests();
  },
  displaySummaryColumns(expectedGuests, guestsAdded) {
    const columns = `
      <div class="summary expected-guests-col card">
       <h2>${expectedGuests}</h2>
       <p>guests expected</p>
      </div>
      <div class="summary guests-added-col card">
       <h2>${guestsAdded}</h2>
       <p>guests added</p>
      </div>
      <div class="summary days-remaining-col card">
       <h2>${utils.dateDifference()}</h2>
       <p>days to go</p>
      </div>
    `;
    summaryWrapper.insertAdjacentHTML('beforeend', columns);
  },
  showAddGuestsSection() {
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
    view.displayAllAddedGuests();
    homeSection.classList.add('hidden');
    guestsSection.classList.remove('hidden');
  },
  showSetBirthdayDate() {
    setBirthdayDateWrapper.innerHTML = utils.getSetBirthdayDate();
  },
  showHomeSection() {
  this.guestsArray =  [
  parseInt(birthdayEventSet.expectedGuests),
  guests.guestList.length,
  ];
    while (summaryWrapper.firstChild) {
      summaryWrapper.removeChild(summaryWrapper.firstChild);
    }
    mainContent.classList.remove('hidden');
    homeSection.classList.remove('hidden');
    this.showSetBirthdayDate();
    view.displayAllAddedGuests();
    view.displaySummaryColumns(
      birthdayEventSet.expectedGuests,
      guests.guestList.length,
);
  // show bar and pie chart
  this.createBarChart();
  this.createPieChart();
  },
createBarChart() {
  return new Chart(this.ctx, {
  type: 'bar',
  data: {
    labels: this.labels,
    datasets: [
      {
        label: 'guests',
        data: this.guestsArray,
        backgroundColor: [
          'rgba(26, 78, 208, .4)',
           'rgba(255, 206, 86, 0.4)',
            'rgba(75, 192, 192, 0.2)',
        ],
      },
    ],
  },
});
},
createPieChart() {
  return new Chart(this.ctx2, {
  type: 'pie',
  data: {
    labels: this.labels,
    datasets: [
      {
        label: 'guests',
        data: this.guestsArray,
        backgroundColor: [
          'rgba(26, 78, 208, .4)',
           'rgba(255, 206, 86, 0.4)',
            'rgba(75, 192, 192, 0.2)',
        ],
      },
    ],
  },
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
validateInputRealtime(event) {
  const target = event.target;
  const targetId = event.target.id;
  const parent = event.target.parentNode;
  const parentSibling = event.target.parentNode.nextElementSibling;
  const updateBtn = updateGuestsBtnWrapper.querySelector('.update-guests-btn');
  const nameFieldHasSuccess = nameField.classList.contains('has-success');
  const locationFieldHasSuccess = locationField.classList.contains('has-success');
  switch (targetId) {
    case 'birthday-date':
      isBirthdayFieldValid = this.runValidator(
        fieldsData.birthdayField,
        parent,
        target,
        parentSibling,
        birthdayDateField,
      );
      break;
    case 'expected-guests':
      isExpectedGuestsFieldValid = this.runValidator(
        fieldsData.expectedGuestsField,
        parent,
        target,
        parentSibling,
        expectedGuestsField,
      );
      break;
    case 'name':
      this.runValidator(
        fieldsData.nameField,
        parent,
        target,
        parentSibling,
        nameField,
      );
      break;
    case 'location':
      this.runValidator(
        fieldsData.locationField,
        parent,
        target,
        parentSibling,
        locationField,
      );
      break;
    default:
      break;
  }
  if (isBirthdayFieldValid && isExpectedGuestsFieldValid) {
    setUpBirthdayBtn.removeAttribute('disabled');
  }
  if (nameFieldHasSuccess && locationFieldHasSuccess) {
    addGuestsBtn.removeAttribute('disabled');
  } else {
    addGuestsBtn.disabled = true;
  }
  if (nameFieldHasSuccess || locationFieldHasSuccess) {
    if (updateBtn) {
      updateBtn.removeAttribute('disabled');
    }
  } else {
    if (updateBtn) {
      updateBtn.disabled = true;
    }
  }
},
};


const eventsList = ['input', 'blur'];

formInputs.forEach((inputField) => {
  for (let event of eventsList) {
    inputField.addEventListener(event, function(e) {
      validators.validateInputRealtime(e);
    });
  }
});

setUpBirthdayBtn.addEventListener('click', (e) => {
  e.preventDefault();
  birthdayEventSet.birthdayDate = birthdayDateField.value;
  birthdayEventSet.expectedGuests = expectedGuestsField.value;
  localStorage.setItem('eventSet', JSON.stringify(birthdayEventSet));
  setupBirthdaySection.classList.add('hidden');
  // display all added guests from local storage when page loads/refresh
  view.showHomeSection();
});

// add event listener to parent element of add guests btn
addGuestsBtnWrapper.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('add-guests-btn')) {
    guests.addGuests(nameField.value, locationField.value);
    nameField.value = '';
    locationField.value = '';
    e.target.disabled = true;
    view.clearSuccessFormStyles();
  }
});

updateGuestsBtnWrapper.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('update-guests-btn')) {
    view.changeGuestDetails(e.target.id, nameField.value, locationField.value);
    nameField.value = '';
    locationField.value = '';
    view.clearSuccessFormStyles();
    view.showAddGuestsBtn();
  }
  if (e.target.classList.contains('cancel-btn')) {
    nameField.value = '';
    locationField.value = '';
    view.showAddGuestsBtn();
    view.clearSuccessFormStyles();
  }
});

// Event delegation to make delete and update buttons clickable
tableBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('deleteBtn')) {
    guests.deleteGuest(e.target.parentNode.parentNode.id);
  }
  if (e.target.classList.contains('updateDetailsBtn')) {
    view.loadFormWithGuestData(e.target.parentNode.parentNode.id);
    view.removeAddGuestsBtn();
    view.displayUpdateDetailsBtn(e.target.parentNode.parentNode.id);
  }
});

nav.addEventListener('click', (e) => {
  if (e.target.id === 'addguests') {
  view.showAddGuestsSection();
  }
  if (e.target.id === 'home') {
    view.showHomeSection();
    guestsSection.classList.add('hidden');
  }
});

appLogo.addEventListener('click', (e) => {
  view.showHomeSection();
    guestsSection.classList.add('hidden');
});

resetBtn.addEventListener('click', (e) => {
  localStorage.clear();
  document.location.reload();
});

// check if birthday event is set
if (birthdayEventSet.hasOwnProperty('birthdayDate')) {
  // hide setup birthday section
  setupBirthdaySection.classList.add('hidden');
  // show homepage section with data
  view.showHomeSection();
} else {
  mainContent.classList.add('hidden');
}

// check when the page is refreshed
// if url hash is equal to 'addguests', who add guests section
 if (performance.navigation.type === 1) {
    if (window.location.hash === '#addguests') {
    view.showAddGuestsSection();
    }
  }


