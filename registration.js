'use strict';
const form = document.forms[0];
const inputFullname = form.querySelector('input#fullname');
const fullNameInformer = form.querySelector('div#fullname');
const inputPhoneNumber = form.querySelector('input#phone');
const phoneNumberInformer = form.querySelector('div#phone');
const inputHiddenInfo = form.querySelector('input#hidden-info');
const extraInfoInformer = form.querySelector('div#extra-info');
const inputRegion = form.querySelector('select#region');
const selectCities = form.querySelector('select#city');
const cityInformer = form.querySelector('div#city');
const submit = form.querySelector('input#submit');

function setValidStyle (element, informer, valid) {
  if (valid) {
    element.classList.remove('no-valid');
    element.classList.add('valid');
    if (informer) {
      informer.classList.add('display-none');
    }
  } else {
    element.classList.remove('valid');
    if (valid !== undefined) {
      element.classList.add('no-valid');
      if (informer) {
        informer.classList.remove('display-none');
      }
    } else {
      element.classList.remove('no-valid');
    }
  }
}

function checkFullName(event) {
  const fullNameValue = inputFullname.value.replace(/\s+/g, ' ').trim();
  console.log(fullNameValue);
  const wordsNum = fullNameValue.split(' ').length;
  const valid = fullNameValue.length === 0 ? undefined : (wordsNum > 1) && (wordsNum < 4);
  setValidStyle(inputFullname, fullNameInformer, valid);
}

function checkPhoneNumber(event) {
  const phoneNumberValue = inputPhoneNumber.value.replace(/[\s\-\(\)]/g, '');
  const valid = phoneNumberValue.length === 0 ? undefined : phoneNumberValue.match(/^((\+?3)?8)?0\d{9}$/) !== null;
  setValidStyle(inputPhoneNumber, phoneNumberInformer, valid);
}

inputFullname.addEventListener('focus', checkFullName);
inputFullname.addEventListener('input', checkFullName);

inputPhoneNumber.addEventListener('focus', checkPhoneNumber);
inputPhoneNumber.addEventListener('input', checkPhoneNumber);

inputHiddenInfo.addEventListener('input', (event) => {
  const checked = inputHiddenInfo.checked;
  if (checked) {
    extraInfoInformer.classList.add('display-none');
  } else {
    extraInfoInformer.classList.remove('display-none');
  }
});

inputRegion.addEventListener('input', (event) => {
  const regionValue = inputRegion.value.toLowerCase();
  if (regionValue) {
    cityInformer.classList.remove('display-none');
  } else {
    cityInformer.classList.add('display-none');
  }
  if (selectCities.selectedIndex >= 0) {
    selectCities.selectedIndex = -1;
  }
  const cityOptions = cityInformer.querySelectorAll('[data-region]');
  cityOptions.forEach((element) => {
    if (regionValue === element.dataset.region) {
      element.classList.remove('display-none');
    } else {
      element.classList.add('display-none');
    }
  })
});

function checkFormValidity () {
  const validFullName = inputFullname.classList.contains('valid');
  const validPhoneNumber = inputPhoneNumber.classList.contains('valid');
  if (validFullName) {
    if (inputHiddenInfo.checked) {
      submit.removeAttribute('disabled');
    } else if (validPhoneNumber && inputRegion.selectedIndex === 1) {
        submit.removeAttribute('disabled');
    } else if (validPhoneNumber && inputRegion.selectedIndex > 1 && selectCities.selectedIndex > 0) {
        submit.removeAttribute('disabled');
    } else {
      submit.setAttribute('disabled', 'disabled');
    }
 }
}

form.addEventListener('change', checkFormValidity);
