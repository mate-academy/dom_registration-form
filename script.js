'use strict';

window.addEventListener('load', main);

const regions =  {
  'none': [
    '-'
  ],

  'kyiv': [
    'Kyiv'
  ],

  'center': [
    'Cherkasy',
    'Dnipo',
    'Kropyvnytskyi',
    'Poltava',
    'Vinnytsia',
    'Zhytomyr',
    'Not in the list'
  ],

  'north': [
    'Chernihiv',
    'Sumy',
    'Not in the list'
  ],

  'east': [
    'Donetsk',
    'Kharkiv',
    'Luhansk',
    'Not in the list'
  ],

  'south': [
    'Odesa',
    'Mikolaiv',
    'Kherson',
    'Zaporizhzhia',
    'Not in the list'
  ],

  'west': [
    'Chernivtsi',
    'Ivano-Frankivsk',
    'Khmelnytskyi',
    'Lviv',
    'Rivne',
    'Ternopil',
    'Uzhhorod',
    'Not in the list'
  ]
};

function main() {
  confirmCheckbox();
  validateInputName();
  validateInputPhone();
  validateRegion();
  submitCheck();
}

function validateInputName() {
  const regexpName = /^[а-яa-zА-ЯA-Z\-]{0,}\s[а-яa-zА-ЯA-Z\-]{1,}(\s[а-яa-zА-ЯA-Z\-]{1,})?$/;
  const form = document.forms.validateForm;
  const inputName = form.elements.inputName;
  
  inputName.addEventListener('blur', () => {
    const name = event.target.value;
    const validName = name.trim().match(regexpName); 
    confirm(inputName, validName);
  });

  inputName.addEventListener('focus', () => {
    focusDissapear(inputName);
  })
}

function validateInputPhone() {
  const regExpPhone = /^((\+)?\b(8|38)?(0[\d]{2}))([\d-]{5,8})([\d]{2})$/;
  const form = document.forms.validateForm;
  const inputPhone = form.elements.inputPhone;

  inputPhone.addEventListener('blur', () => {
    const phone = event.target.value;
    const validPhone = phone.trim().match(regExpPhone);
    console.log(validPhone);
     
    confirm(inputPhone, validPhone);
  });

  inputPhone.addEventListener('focus', () => {
    focusDissapear(inputPhone);
  })
}

function validateRegion() {
  const form = document.forms.validateForm;
  const selectRegion = form.elements.selectRegion;

  selectRegion.addEventListener('change', () => {
    const section = document.querySelector('.form__hometown');
    if (!section.classList.contains('hidden')) {
      section.classList.add('hidden');
    }
    for (let place in regions) {
      if (regions[place] === regions[selectRegion.value] 
        && selectRegion.value !== 'none' 
        && selectRegion.value !== 'kyiv') {
          createHometown(regions[place]);
      }
    }
  })
}

function createHometown(region) {
  const form = document.forms.validateForm;
  const selectRegion = form.elements.selectHometown;
  const section = document.querySelector('.form__hometown');
  if (selectRegion.childNodes) {
    while (selectRegion.firstChild) {
      selectRegion.removeChild(selectRegion.firstChild);
  }
  }
  if (section.classList.contains('hidden')) {
    section.classList.remove('hidden');
  }
  region.forEach(town => {
    const option = new Option(town, town);
    selectRegion.append(option);
  })
  
}

function confirm(element, validate) {
  if (validate) {
    element.classList.add('form_success');
  } else {
    element.classList.add('form_invalid');
  }
}

function focusDissapear(element) {
  if (element.classList.contains('form_success')) {
    element.classList.remove('form_success');
  }
  if (element.classList.contains('form_invalid')) {
    element.classList.remove('form_invalid');
  }
}

function confirmCheckbox() {
  const form = document.forms.validateForm;
  const checkbox = form.elements.checkboxValidate;
  const inputPhone = document.querySelector('.form__phone');
  const selectRegion = document.querySelector('.form__region');

  checkbox.addEventListener('click', () => {
   if (event.target.checked) {
    inputPhone.classList.add('hidden');
    selectRegion.classList.add('hidden');
   } 
   if (!event.target.checked) {
    inputPhone.classList.remove('hidden');
    selectRegion.classList.remove('hidden');
   }
  })
}

function submitCheck() {
  const form = document.forms.validateForm;
  const inputName = form.elements.inputName;
  const inputPhone = form.elements.inputPhone;
  const selectRegion = form.elements.selectRegion;
  const selectHometown = form.elements.selectHometown;
  const submit = form.elements.submitButton;
  const checkbox = form.elements.checkboxValidate;

  submit.disabled = true;

  form.addEventListener('change', () => {
    if (inputName.classList.contains('form_success')
    && inputPhone.classList.contains('form_success')
    && (selectRegion.value && selectHometown.value) || checkbox.chacked) {
      submit.disabled = false;
    }
  })
}