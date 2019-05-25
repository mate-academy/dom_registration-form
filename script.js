'use strict';

function main() {
  const formBox = document.forms['reg-form'];
  const extra = formBox.querySelector('#extra-info');
  const regionSelect = formBox['region'];
  const selectBox = formBox.querySelector('#select-box');
  const privacy = formBox['privacy-check'];
  const submit = formBox['submit'];
  const regions = {
    Kyiv: true,
    Center: ['Cherkasy', 'Dnipro', 'Kropyvnytskyi', 'Poltava', 'Vinnytsia', 'Zhytomyr'],
    North: ['Chernihiv', 'Sumy'],
    East: ['Donetsk', 'Kharkiv', 'Luhansk'],
    South: ['Kherson', 'Mykolaiv', 'Odesa', 'Zaporizhzhia'],
    West: ['Chernivtsi', 'Ivano-Frankivsk', 'Khmelnytskyi', 'Lutsk', 'Lviv', 'Rivne', 'Ternopil', 'Uzhhorod']
  };
  const ignoreStrings = ['', 'Kyiv', 'Not in the list'];

  submit.disabled = true;
  formBox.addEventListener('input', checkInput);
  addSelectList(Object.keys(regions), regionSelect);
  regionSelect.addEventListener('change', selectHandle.bind(null, ignoreStrings, regions));
  privacy.addEventListener('click', privacyHandle.bind(null, extra));
  selectBox.addEventListener('change', checkInput);
  formBox.addEventListener('change', validateForm.bind(null, submit));
}

const isValid = (stringToValidate, regex) => {
  if (regex.test(stringToValidate)) {
    return true;
  }

  return false;
};

const inputValidation = (input, normalizeString, type) => {
  let regex;
  switch(type) {
    case 'full-name': 
      regex = /^[a-zA-Zа-яА-ЯёЁїЇІі'\-]{2,30} [a-zA-Zа-яА-ЯёЁїЇІі'\-]{2,30} ?([a-zA-Zа-яА-ЯёЁїЇІі'\-]{2,30})$/;
      break;
    case 'number':
      regex = /^(((380)?[0-9]{9})|(0[0-9]{9}))$/;
      break;
    default:
      regex = /\w+/;
    break;
  }

  input.classList.toggle('input_correct', isValid(normalizeString, regex));
  input.classList.toggle('input_incorrect', !isValid(normalizeString, regex));
};

const removeClassIfEmpty = (input) => {
  if (input.value === '') {
    input.classList.remove('input_correct');
    input.classList.remove('input_incorrect');
  }
};

const normalizeInput = (value, type) => {
  switch (type) {
    case 'full-name': 
      return value.trim().split(/\s+/).join(' ');
    case 'number':
      return value.split(/\D/).join('');
    default: 
      return value;
  }
};

const checkInput = (event) => {
  const { target } = event;
  let { name, value } = event.target;
  const normalizeString = normalizeInput(value, name);
  const form = target.closest('form');

  if (name === 'number') {
    target.value = normalizeString;
  }

  inputValidation(target, normalizeString, name);
  removeClassIfEmpty(target);
  validateForm(form['submit']);
};

const addSelectList = (elements, select) => {
  elements.reverse().forEach(itemText => {
    const option = document.createElement('option');
    option.textContent = itemText;
    select.children[0].after(option);
  })
};

const createCitySelect = (regionSelect) => {
  const citySelect = regionSelect.cloneNode();
  const blankElem = regionSelect.children[0].cloneNode();
  const lastElem = document.createElement('option');

  lastElem.textContent = 'Not in the list';
  citySelect.append(blankElem, lastElem);
  citySelect.name = 'city';
  citySelect.classList.remove('input_correct');

  return citySelect;
};

const selectHandle = (ignoreList, selectList, event) => {
  const { target } = event;
  const region = target.value;
  const selectWrapper = target.parentElement;
  const selects = selectWrapper.children;

  if (selects.length > 1) {
    selectWrapper.lastElementChild.remove();
  }

  if (!ignoreList.includes(region)) {
    const citySelect = createCitySelect(target);
    addSelectList(selectList[region], citySelect);
    selectWrapper.append(citySelect);
  }
};

const privacyHandle = (extraBlock, event) => {
  const privacyIsChecked = event.target.checked;
  extraBlock.classList.toggle('elem_hidden', privacyIsChecked);
};

const isFormDataValid = (privacy, form) => {
  if (privacy.checked) {
    return form['full-name'].classList.contains('input_correct');
  } else {
    return [...form.querySelectorAll('.form__field')]
      .every(input => input.classList.contains('input_correct'));
  }
}

const validateForm = (submitButton) => {
  const form = submitButton.closest('form');
  const privacySettings = form['privacy-check'];
  submitButton.disabled = !isFormDataValid(privacySettings, form);
}

main();