'use strict';
const form = document.querySelector('form');
const inputFullname = document.querySelector('input#fullname');
const fullNameHelper = document.querySelector('div#fullname');
const inputPhoneNumber = document.querySelector('input#phone');
const phoneNumberHelper = document.querySelector('div#phone');
const inputHiddenInfo = document.querySelector('input#hidden-info');
const extraInfoHelper = document.querySelector('div#extra-info');
const inputRegion = document.querySelector('select#region');
const selectCities = document.querySelector('select#city');
const cityHelper = document.querySelector('div#city');
const submit = document.querySelector('input#submit');

function setValidStyle (element, helper, valid) {
  if (valid) {
    element.classList.remove('no-valid');
    element.classList.add('valid');
    if (helper) {
      helper.classList.add('display-none');
    }
  } else {
    element.classList.remove('valid');
    if (valid !== undefined) {
      element.classList.add('no-valid');
      if (helper) {
        helper.classList.remove('display-none');
      }
    } else {
      element.classList.remove('no-valid');
    }
  }
}

function checkFullName(event) {
  const fullNameValue = inputFullname.value.trim();
  const wordsNum = fullNameValue.split(' ').length;
  const valid = fullNameValue.length === 0 ? undefined : (wordsNum > 1) && (wordsNum < 4);
  setValidStyle(inputFullname, fullNameHelper, valid);
}

function checkPhoneNumber(event) {
  const phoneNumberValue = inputPhoneNumber.value.replace(/[\s\-\(\)]/g, '');
  const valid = phoneNumberValue.length === 0 ? undefined : phoneNumberValue.match(/^((\+?3)?8)?0\d{9}$/) !== null;
  setValidStyle(inputPhoneNumber, phoneNumberHelper, valid);
}

inputFullname.addEventListener('focus', checkFullName);
inputFullname.addEventListener('input', checkFullName);

inputPhoneNumber.addEventListener('focus', checkPhoneNumber);
inputPhoneNumber.addEventListener('input', checkPhoneNumber);

inputHiddenInfo.addEventListener('input', (event) => {
  const checked = inputHiddenInfo.checked;
  if (checked) {
    extraInfoHelper.classList.add('display-none');
  } else {
    extraInfoHelper.classList.remove('display-none');
  }
});

inputRegion.addEventListener('input', (event) => {
  const regionValue = inputRegion.value.toLowerCase();
  if (regionValue) {
    const cityOptions = cityHelper.querySelectorAll('[data-region="'+regionValue+'"]');
    cityHelper.classList.remove('display-none');
    cityOptions.forEach((element) => {
      element.classList.remove('display-none');
    })

  } else {
    const cityOptions = cityHelper.querySelectorAll('[data-region]');
    cityHelper.classList.add('display-none');
    cityOptions.forEach((element) => {
      element.classList.add('display-none');
    })
  }
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
