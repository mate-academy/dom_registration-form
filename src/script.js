'use strict';

const form = document.forms.user;
const refuse = form.elements[1];
const selectRegion = form.elements[3];
let state = false;

//скрываем всё после checked
refuse.addEventListener('click', () => {
  form.querySelector('.refus').classList.toggle('hidden');
  state = refuse.checked;  
});

//выбираем регион и город
selectRegion.addEventListener('change', (event) => {
  const index =  event.target.value;
  const city = document.body.querySelectorAll('.city');

  for(let i = 0; i < city.length; i++) {
    if (!city[i].classList.contains('hidden')) {
        city[i].classList.add('hidden');
    }
  }
    if(index!=='Kiev') {
  document.getElementById(index).classList.remove('hidden');
  }
})

//валидация вводимых данных
const getInput = function(fieldName) {
    return form.elements[fieldName].value.trim();
};

const regExpName = /^[а-яa-zА-ЯA-Z\-]{0,}\s[а-яa-zА-ЯA-Z\-]{1,}(\s[а-яa-zА-ЯA-Z\-]{1,})?$/;
const regExpPhone = /^((\+)?\b(8|38)?(0[\d]{2}))([\d-]{5,8})([\d]{2})$/;

const validateInput = function() {
    const name = getInput('name');
    const phone = getInput('phone');
    return name.match(regExpName) && phone.match(regExpPhone);
};

const validateInputСheck = function() {
    const name = getInput('name');
    return name.match(regExpName)
};

const updateButtonState = function(){

if(state) {
   form.elements.submit.disabled = !validateInputСheck();
} form.elements.submit.disabled = !validateInput();
};

form.addEventListener('input', updateButtonState);