'use strict';

const form = document.forms.user;
const refuse = form.elements[1];
const selectRegion = form.elements[3];
const regExpName = /^[а-яa-zА-ЯA-Z\-]{0,}\s[а-яa-zА-ЯA-Z\-]{1,}(\s[а-яa-zА-ЯA-Z\-]{1,})?$/;
const regExpPhone = /^((\+)?\b(8|38)?(0[\d]{2}))([\d-]{5,8})([\d]{2})$/;

//скрываем всё после checked
refuse.addEventListener('click', () => {
  form.querySelector('.refus').classList.toggle('hidden');
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

//получение вводимых данных
const getInput = function(fieldName) {
    return form.elements[fieldName].value.trim();
};

//валидация поля имени
const validateInputName= function() {
    const name = getInput('name');
    if(name.match(regExpName)) {
      form.elements['name'].classList.add('approved');
    } else {
      form.elements['name'].classList.add('error');
    }
};

form.elements['name'].addEventListener('input', validateInputName);

//валидация поля номера
const validateInputPhone = function() {
  const phone = getInput('phone');
  if(phone.match(regExpPhone)) {
    form.elements['phone'].classList.add('approved');
  } else {
    form.elements['phone'].classList.add('error');
  }
};

form.elements['phone'].addEventListener('input', validateInputPhone);

//изменение состояния кнопки
form.addEventListener('change', ()=> {
  const index = selectRegion.selectedIndex;
  if(getInput('name').match(regExpName)&&refuse.checked) {
    form.elements.submit.disabled = false;
  } else if(getInput('name').match(regExpName) && 
  getInput('phone').match(regExpPhone) && 
  selectRegion.value!=="" && document.getElementById(index).value!=="") {
    form.elements.submit.disabled = false;
  }
});