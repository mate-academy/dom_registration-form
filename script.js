'use strict';

const formBox = document.querySelector('#form');
const name = document.querySelector('#full-name');
const number = document.querySelector('#number');
const regionSelect = document.querySelector('#region');
const citySelect = document.querySelector('#city');
const selectBox = document.querySelector('#select-box');
const privacy = document.querySelector('#privacyCheck');
const submit = document.querySelector('#submit');

const regions = {
  Kyiv: 'Kyiv',
  Center: ['Cherkasy', 'Dnipro', 'Kropyvnytskyi', 'Poltava', 'Vinnytsia', 'Zhytomyr'],
  North: ['Chernihiv', 'Sumy'],
  East: ['Donetsk', 'Kharkiv', 'Luhansk'],
  South: ['Kherson', 'Mykolaiv', 'Odesa', 'Zaporizhzhia'],
  West: ['Chernivtsi', 'Ivano-Frankivsk', 'Khmelnytskyi', 'Lutsk', 'Lviv', 'Rivne', 'Ternopil', 'Uzhhorod']
};

const ignoreStrings = ['', 'Kyiv', 'Not in the list'];

const isValid = (stringToValidate, regex) => {
  if (regex.test(stringToValidate)) {
    return true;
  }

  return false;
};

const inputValidation = (input, normalizeString, regex) => {
  input.classList.toggle('input_correct', isValid(normalizeString, regex));
  input.classList.toggle('input_incorrect', !isValid(normalizeString, regex));
};

const removeClassIfEmpty = (input) => {
  if (input.value === '') {
    input.classList.remove('input_correct');
    input.classList.remove('input_incorrect');
  }
}

name.addEventListener('change', () => {
  const normalizeName = name.value.trim().split(/\s+/).join(' ');
  const regex = /^[a-zA-Zа-яА-ЯёЁїЇ'\-]{2,30} [a-zA-Zа-яА-ЯёЁїЇ'\-]{2,30} ?([a-zA-Zа-яА-ЯёЁїЇ'\-]{2,30})$/;
  
  inputValidation(name, normalizeName, regex);
  removeClassIfEmpty(name);

  name.value = normalizeName;
});

number.addEventListener('input', () => {
  const normalizeNumber = number.value.split(/\D/).join('');
  number.value = normalizeNumber;
});

number.addEventListener('change', () => {
  const regex = /^(((380)?[0-9]{9})|(0[0-9]{9}))$/;
  inputValidation(number, number.value, regex);
  removeClassIfEmpty(number);
});

const addSelectList = (elements, select) => {
  elements.reverse().forEach(itemText => {
    const option = document.createElement('option');
    option.textContent = itemText;
    select.children[0].after(option);
  })
}

const clearSelectList = (select) => {
  const countOfElems = select.children.length;
  [...select.children].slice(1, countOfElems - 1)
    .forEach(option => option.remove());
}

addSelectList(Object.keys(regions), regionSelect);

regionSelect.addEventListener('change', () => {
  citySelect.classList.add('elem_hidden');
  const region = regionSelect.value;

  if (!ignoreStrings.includes(region)) {
    clearSelectList(citySelect);
    addSelectList(regions[region], citySelect);
    citySelect.classList.remove('elem_hidden');
  }
})

privacy.addEventListener('click', () => {
  const privacyIsChecked = privacy.checked;
  number.classList.toggle('elem_hidden', privacyIsChecked);
  selectBox.classList.toggle('elem_hidden', privacyIsChecked);
})

selectBox.addEventListener('change', event => {
  const { target } = event;
  if(!target.classList.contains('form__input')) return;
  inputValidation(target, target.value, /\w+/)
  removeClassIfEmpty(target);
})

const isFormDataValid = () => {
  if (privacy.checked) {
    return name.classList.contains('input_correct');
  } else {
    return [...formBox.querySelectorAll('.form__field')]
      .filter(input => !input.classList.contains('elem_hidden'))
      .every(input => input.classList.contains('input_correct'));
  }
}

formBox.addEventListener('change', () => {
  submit.disabled = !isFormDataValid();
})
