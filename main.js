'use strict';

const form = document.querySelector('form');
const nameInput = document.querySelector('.validate-form__input-name');
const phoneInput = document.querySelector('.validate-form__input-phone');
const selectRegion = document.querySelector('.validate-form__select-region');
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
    'Zhytomyr'
  ],

  'north': [
    'Chernihiv',
    'Sumy'
  ],

  'east': [
    'Donetsk',
    'Kharkiv',
    'Luhansk'
  ],

  'south': [
    'Odesa',
    'Mikolaiv',
    'Kherson',
    'Zaporizhzhia'
  ],

  'west': [
    'Chernivtsi',
    'Ivano-Frankivsk',
    'Khmelnytskyi',
    'Lviv',
    'Rivne',
    'Ternopil',
    'Uzhhorod'
  ]
};

nameInput.addEventListener('focus', () => {
  if (nameInput.classList.contains('form_success')) {
    nameInput.classList.remove('form_success');
  }
  if (nameInput.classList.contains('form_invalid')) {
    nameInput.classList.remove('form_invalid');
  }
})

phoneInput.addEventListener('focus', () => {
  if (phoneInput.classList.contains('form_success')) {
    phoneInput.classList.remove('form_success');
  }
  if (phoneInput.classList.contains('form_invalid')) {
    phoneInput.classList.remove('form_invalid');
  }
})

nameInput.addEventListener('blur', function() {
  const data = this.value;
  const formatingData = data.trim().replace(/ {1,}/g," ").split(' ');

  if (formatingData.length >= 2) {
    const lengthWords = formatingData.every(word => {
      return  word.split('').length >= 2;
    });

    if (lengthWords) {
      this.classList.add('form_success');
    } else {
      this.classList.add('form_invalid');
    };
  } else {
    this.classList.add('form_invalid');
  }
})

phoneInput.addEventListener('blur', function() {
  const data = this.value;
  const formatingData = data.trim().replace(/[\s\-\(\)]/g, '');
  if (formatingData.match(/^((\+?3)?8)?0\d{9}$/)) {
    this.classList.add('form_success');
  } else {
    this.classList.add('form_invalid');
  }
});

selectRegion.addEventListener('change', function() {
  for (let place in regions) {
    if (regions[place] === regions[this.value]) {
      createSelect(regions[place])
    }
  }
});

function createSelect(region) {
  const section = document.createElement('section');
  const select = document.createElement('select');
  const description = document.createElement('span');
  select.classList.add('validate-form__select-town');
  section.classList.add('form__select-town');
  section.prepend(description);
  section.append(select);

    for (let i = 0; i < region.length; i++) {
      let option = document.createElement('option');
      select.append(option);
      option.textContent = region[i];
    }

  description.textContent = 'Select your hometown';
  form.append(section);
}



function validate(element, proof) {

}

function focusChange() {}