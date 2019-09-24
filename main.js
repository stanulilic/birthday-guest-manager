// https://codepen.io/jaycbrf/pen/iBszr
const birthdayDateField = document.getElementById('birthday-date');
const expectedGuestsField = document.getElementById('expected-guests');
const setupBirthdayForm = document.querySelector('.setup-birthday');
const formInputs = document.querySelectorAll('input');

const fieldsData = {
  birthdayField: {
    regex: /20\d{2}-\d{2}-\d{2}/,
    message: 'Please enter date with a valid format: mm/dd/yyyy'
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
    if (parentSibling.className === 'error') {
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
};

const validators = {
  validateInput(regex, fieldValue) {
    if (regex.test(fieldValue)) {
      return true;
    }
    return false;
  },

  runValidator(field, parent, target, parentSibling) {
    const { regex, message } = field;
    const validate = validators.validateInput(regex, birthdayDateField.value);
    if (validate) {
      view.showInputIsValid(parent, target, parentSibling);
    } else {
      view.showInputIsInvalid(parent, target, parentSibling, message);
    }
  },
};


function validateInput(event) {
  const target = event.target;
  const targetId = event.target.id;
  const parent = event.target.parentNode;
  const parentSibling = event.target.parentNode.nextElementSibling;
  switch (targetId) {
    case 'birthday-date':
      validators.runValidator(fieldsData.birthdayField, parent, target, parentSibling);
      break;
    default:
      console.log('do nothing');
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
