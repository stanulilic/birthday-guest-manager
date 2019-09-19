// https://codepen.io/jaycbrf/pen/iBszr
const birthdayDateField = document.getElementById('birthday-date');
const expectedGuestsField = document.getElementById('expected-guests');
const setupBirthdayForm = document.querySelector('.setup-birthday');


// eslint-disable-next-line func-names
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