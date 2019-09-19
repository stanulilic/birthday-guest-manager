// https://codepen.io/jaycbrf/pen/iBszr
const birthdayDateField = document.getElementById('birthday-date');
const expectedGuestsField = document.getElementById('expected-guests');
const setupBirthdayForm = document.querySelector('.setup-birthday');


birthdayDateField.addEventListener('focus', function (e) {
  console.log(this.parentNode.querySelector('.icon').classList.add('hidden'));
})

const eventsList = ['blur', 'input'];

eventsList.forEach(event => 

  birthdayDateField.addEventListener(event, function (e) {
    let regex = /20\d{2}-\d{2}-\d{2}/;
    let parent = this.parentNode;


    let errorMessage = setupBirthdayForm.querySelector('.error');

    if (regex.test(this.value)) {
      console.log(this.parentNode.querySelector('.error'));
      if(setupBirthdayForm.querySelector('#birthday-date').parentNode.nextElementSibling === errorMessage) {
        setupBirthdayForm.removeChild(setupBirthdayForm.querySelector('#birthday-date').parentNode.nextElementSibling);
      }
      parent.querySelector('.icon').classList.remove('hidden');
    }
    else {
      if(errorMessage) {
        return false;
      }
      else {
        let p = document.createElement('p');
        p.textContent = 'Please enter date using the following format: /mm/dd/yyyy';
        p.className = 'error';
        parent.parentNode.insertBefore(p, this.parentNode.nextSibling);
      }
    }
  })
);