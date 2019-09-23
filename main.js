// https://codepen.io/jaycbrf/pen/iBszr
const birthdayDateField = document.getElementById('birthday-date');
const expectedGuestsField = document.getElementById('expected-guests');
const setupBirthdayForm = document.querySelector('.setup-birthday');
const formInputs = document.querySelectorAll('input');

const fieldsData = {
  birthdayField: {
    regex:/20\d{2}-\d{2}-\d{2}/, 
    message: 'Please enter date with a valid format: mm/dd/yyyy'
  }
}

const validators = {
  validateInput(regex, fieldValue) {
    if(regex.test(fieldValue)){ return true; }
  }
}

const view = {
  createMessage(domPath, message) {
    const paragraph = document.createElement('p');
    paragraph.textContent = message;
    paragraph.className = 'error';
    domPath.insertAdjacentElement('afterend', paragraph);

  },

  checkIfErrorMessageExists(parentSibling) {
    if(parentSibling.className === 'error') {
      return true;
      }
  },

  removeErrorMessage(parentSibling) {
    if(this.checkIfErrorMessageExists(parentSibling)) {
       parentSibling.remove();
    }
  }
}

// eslint-disable-next-line func-names
/* 
birthdayDateField.addEventListener('focus', function (e) {
  // hide any icon appearing in the text field
  this.parentNode.querySelector('.icon').classList.add('hidden');
  if(this.classList.contains('has-error')) {
    this.classList.add('focus-error');
  }


});

const eventsList = ['input', 'blur'];

eventsList.forEach((event) => birthdayDateField.addEventListener(event, function (e) {
  const regex = /20\d{2}-\d{2}-\d{2}/;
  const parent = this.parentNode;
  const errorMessage = setupBirthdayForm.querySelector('.error');
  const getNextSibling = setupBirthdayForm.querySelector('#birthday-date')
    .parentNode.nextElementSibling; 

  // if input is valid
  if (regex.test(this.value)) {
    // check if an error message exists
    if (getNextSibling === errorMessage) {
      // remove error message if it exists
      setupBirthdayForm.removeChild(getNextSibling);
    }
    this.classList.remove('has-error', 'focus-error');
    parent.querySelector('.icon').classList.remove('hidden');
  }
  // input is invalid
  else{ 
      this.classList.add('has-error');
      parent.querySelector('.icon').classList.add('hidden');
      // check if error messages already exists
      if(errorMessage) {
        return false;
       }
       // create error message if it doesn't exist
  else {
      let p = document.createElement('p');
      p.textContent = 'Please enter date using the following format: /mm/dd/yyyy';
      p.className = 'error';
      parent.parentNode.insertBefore(p, this.parentNode.nextSibling);
    }
}
}));

*/

function validateInput(event) {
  let target = event.target;
  let targetId = event.target.id;
  let parent = event.target.parentNode;
  let parentSibling = event.target.parentNode.nextElementSibling;
  switch (targetId) {
    case 'birthday-date':
      const {regex, message} = fieldsData.birthdayField;
      validate = validators.validateInput(regex, birthdayDateField.value);
      if(validate) {
        view.removeErrorMessage(parentSibling);
        // show checkmark icon
        parent.querySelector('.icon-checkmark-outline').classList.remove('hidden');
        target.classList.add('has-success');

        // remove close/error icon
        parent.querySelector('.icon-close-outline').classList.add('hidden');
        // remove error outline
        target.classList.remove('has-error');
      }
      else {
        if(!view.checkIfErrorMessageExists(parentSibling)) {
        view.createMessage(parent, message);
        }
        // hide error/checkmark icon 
        parent.querySelector('.icon-checkmark-outline').classList.add('hidden');
        // show error icon
        parent.querySelector('.icon-close-outline').classList.remove('hidden');
        target.classList.add('has-error');
        target.classList.remove('has-success');
      }
      break;
    default:
      console.log(' aim nothing');
      break;
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
