'use strict'

const regions = {
  'Center': ['Cherkasy', 'Dnipro', 'Kropyvnytskyi', 'Poltava', 'Vinnytsia', 'Zhytomyr'],
  'North': ['Chernihiv', 'Sumy'],
  'East': ['Donetsk', 'Kharkiv', 'Luhansk'],
  'South': ['Kherson', 'Mykolaiv', 'Odesa', 'Zaporizhzhia'],
  'West': ['Chernivtsi', 'Ivano-Frankivsk', 'Khmelnytskyi', 'Lutsk', 'Lviv', 'Rivne', 'Ternopil', 'Uzhhorod'],
};

const formState = {
  userName: false,
  userMail: false,
  userPhone: false,
  userRegion: false,
  userCity: false,
};

const regMail = /^[a-z0-9\._%+-]+@[a-z0-9\.-]+\.[a-z]{2,}$/;
const regName = /[a-zA-Zа-яА-Я]+/;
const regPhoneSplitStart = /^[^0]+0|^0|-/g;

document.addEventListener('DOMContentLoaded', () => {
  const { userCity, userName, userMail, userPhone, userRegion, submitButton } = document.forms.main;

  isInvalid(submitButton, formState);
  toggle(userCity.parentElement, 'hidden')

  document.addEventListener('change', event => {
    event.preventDefault();

    if (event.target.name === 'userName') validateName(userName, regName);
    if (event.target.name === 'userPhone') validatePhone(userPhone, regPhoneSplitStart);
    if (event.target.name === 'userMail') validateMail(userMail, regMail);
    if (event.target.name === 'userRegion') renderCity(userRegion, regions, userCity)
    if (event.target.name === 'userCity') cityCheck(userCity);
    if (event.target.name === 'dataRefuse') refusing(event);
    isInvalid(submitButton, formState);
    console.log(formState)
  });
});

function isInvalid (button, isAllOK) {
  const bool = Object.values(isAllOK).includes(false);
  button.disabled = bool;
}

function cityCheck (city) {
  formState.userCity = !!city;
}

function refusing(event) {
  if(event.target.checked){
    toggle(userPhone.parentElement, 'hidden');
    toggle(userCity.parentElement, 'hidden');
    toggle(userRegion.parentElement, 'hidden');
  } else {
    toggle(userPhone.parentElement, 'show');
    formStateTogler(userCity.parentElement, 'show');
    toggle(userRegion.parentElement, 'show');
  }
}

function renderCity(region, list, userCity) {
  while (userCity.firstChild) {
    userCity.removeChild(userCity.firstChild);
  }

  if(region.value === 'Kyiv') {
    formState.userRegion = true;
    formState.userCity = true;
    toggle(userCity.parentElement, 'hidden');
    return;
  }
  if (region.value === '') {
    toggle(userCity.parentElement, 'hidden');
    formState.userRegion = false;
    formState.userCity = false;
    return;
  }

  const arr = ['', ...list[region.value]];
  arr.forEach(item => {
    const element = document.createElement('option');
    element.innerText = item;
    element.setAttribute('value', item);
    userCity.append(element);
  });
  toggle(userCity.parentElement, 'show');
  formState.userRegion = true;
}


function validatePhone(userPhone, reg) {
  const phone = userPhone.value.replace(reg, '');
  if (!isNaN(+phone) && phone.length === 9) {
    toggle(userPhone, 'success');
  } else if (userPhone.value === '') {
    toggle(userPhone);
  } else {
    toggle(userPhone, 'failed');
  }
}

function validateName(userName, reg) {
  const name = userName.value;
  const partsName = name.trim().split(' ');
  if (!name) {
    toggle(userName);
    return;
  }
  if (!(partsName.length < 4 && partsName.length > 1)) {
    toggle(userName, 'failed');
    return;
  }
  for (let i = 0; i < partsName.length; i++) {
    if (!validateInput(partsName[i], reg)) {
      toggle(userName, 'failed');
      return;
    }
  }
  toggle(userName, 'success');
}

function validateMail(userMail, reg) {
  if (validateInput(userMail.value, reg)) {
    toggle(userMail, 'success');
  } else if (userMail.value === '') {
    toggle(userMail);
  } else {
    toggle(userMail, 'failed');
  }
}

function toggle(input, toggler='') {
  const properties = {show: 'hidden', hidden: 'show', failed: 'success', success: 'failed'};
  input.classList.add(toggler);
  input.classList.remove(properties[toggler]);
  formStateTogler (input, toggler);
}

function formStateTogler (input, toggler) {
  const item = input.name || input.firstElementChild.name
  toggler === 'hidden' || toggler === 'success' ? formState[item] = true : formState[item] = false;
}

function validateInput(input, reg) {
  return input.match(reg);
}
