'use strict';

function main() {

  const fullNameField = document.querySelector('.full-name-field');
  const phoneField = document.querySelector('.phone-field');

  const fullNamePattern = /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/;
  const phonePattern = /^((8|\+3)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,9}$/;

  fullNameField.addEventListener('change', () => {
    if (validateInput(fullNameField.value, fullNamePattern)) {
      fullNameField.classList.add('success', 'passed');
      fullNameField.classList.remove('unsuccess');
    } else {
      fullNameField.classList.add('unsuccess');
      fullNameField.classList.remove('success', 'passed');
    }
    buttoActive()
  })

  phoneField.addEventListener('change', () => {
    if (validateInput(phoneField.value, phonePattern)) {
      phoneField.classList.add('success', 'passed');
      phoneField.classList.remove('unsuccess');
    } else {
      phoneField.classList.add('unsuccess');
      phoneField.classList.remove('success', 'passed');
    }
    buttoActive()
  })

  const selectRegion = document.querySelector('.select-region');
  const checkbox = document.querySelector('.checkbox');
  const detalInfoBlock = document.querySelector('.detailed-info');

  checkbox.addEventListener('click', () => {
    if (checkbox.checked) {
      detalInfoBlock.classList.add('hide');
    } else {
      detalInfoBlock.classList.remove('hide');
    }
    buttoActive();
  })

  selectRegion.addEventListener('click', () => {
    const center = document.querySelector('.center');
    const north = document.querySelector('.north');
    const east = document.querySelector('.east');
    const south = document.querySelector('.south');
    const west = document.querySelector('.west');

    if (selectRegion.value === 'Center') {
      center.classList.add('block');
    } else {
      center.classList.remove('block');
      center.classList.add('hide');
      center.value = '';
    }

    if (selectRegion.value === 'North') {
      north.classList.add('block');
    } else {
      north.classList.remove('block');
      north.classList.add('hide');
      north.value = '';
    }

    if (selectRegion.value === 'East') {
      east.classList.add('block');
    } else {
      east.classList.remove('block');
      east.classList.add('hide');
      east.value = '';
    }

    if (selectRegion.value === 'South') {
      south.classList.add('block');
    } else {
      south.classList.remove('block');
      south.classList.add('hide');
      south.value = '';
    }

    if (selectRegion.value === 'West') {
      west.classList.add('block');
    } else {
      west.classList.remove('block');
      west.classList.add('hide');
      west.value = '';
    }
    buttoActive();
  })

  function buttoActive() {
    const fullNameFieldPassed = fullNameField.classList.contains('passed');
    const phoneFieldPassed = phoneField.classList.contains('passed');

    if (checkbox.checked && fullNameFieldPassed) {
      document.querySelector('#formButton').disabled = false;
    } else if (fullNameFieldPassed && phoneFieldPassed && selectRegion.value != '') {
      document.querySelector('#formButton').disabled = false;
    } else {
      document.querySelector('#formButton').disabled = true;
    }
  }
  buttoActive()
}



function validateInput(value, pattern) {
  return value.match(pattern);
}

window.addEventListener('load', main);
