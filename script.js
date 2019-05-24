'use strict'

const regions = {
  'Center': ['Cherkasy', 'Dnipro', 'Kropyvnytskyi', 'Poltava', 'Vinnytsia', 'Zhytomyr'],
  'North': ['Chernihiv', 'Sumy'],
  'East': ['Donetsk', 'Kharkiv', 'Luhansk'],
  'South': ['Kherson', 'Mykolaiv', 'Odesa', 'Zaporizhzhia'],
  'West': ['Chernivtsi', 'Ivano-Frankivsk', 'Khmelnytskyi', 'Lutsk', 'Lviv', 'Rivne', 'Ternopil', 'Uzhhorod'],
};

const isAllOK = {
  userName: false,
  userPhone: false,
  userMail: false,
  userRegion: false,
  userCity: false,
};

document.addEventListener('DOMContentLoaded', (event) => {
  const {userCity, userName, userMail, userPhone, userRegion, submitButton : button} = document.querySelector('#main');
 
  disableButton(button, isAllOK);

  const regMail = /^[a-z0-9\._%+-]+@[a-z0-9\.-]+\.[a-z]{2,}$/;
  const regName = /[a-zA-Zа-яА-Я]+/;
  const regPhoneSplitStart = /^[^0]+0|^0|-/g;

  userCity.parentElement.classList.add('hidden');
  event.preventDefault();
  document.addEventListener('change', (event) => {
    event.preventDefault();
    if (event.target.name === 'userName') validateName(userName, regName);
    if (event.target.name === 'userPhone') validatePhone(userPhone, regPhoneSplitStart);
    if (event.target.name === 'userMail') validateMail(userMail, regMail);
    if (event.target.name === 'userRegion') renderCity(userRegion, regions, userCity)
    if (event.target.name === 'userCity') isAllOK.userCity = !!userCity.value
    if (event.target.name === 'dataRefuse') refusing(event) 
    disableButton(button, isAllOK);
  });
});

function disableButton (button, isAllOK) {
  const bool = Object.values(isAllOK).includes(false);
  button.disabled = bool;
}

function cityCheck (city) {
    isAllOK.userCity = !!city;
}

function refusing(event) {
  if(event.target.checked){
    toggle(userPhone.parentElement, 'hidden');
    toggle(userCity.parentElement, 'hidden');
    toggle(userRegion.parentElement, 'hidden');
  } else {
    toggle(userPhone.parentElement, 'show');
    toggle(userCity.parentElement, 'show');
    toggle(userRegion.parentElement, 'show');
  }
} 

function renderCity(region, list, userCity) {
  userCity.innerHTML = '';
  if(region.value === 'Kyiv') {
    isAllOK.userRegion = true;
    isAllOK.userCity = true;
    toggle(userCity.parentElement, 'hidden');
    return;
  }
  if (region.value === '') {
    toggle(userCity.parentElement, 'hidden');
    isAllOK.userRegion = false;
    isAllOK.userCity = false;
    return;
  }
  const arr = list[region.value];
  arr.unshift('')
  for (let i = 0; i < arr.length; i++) {
    const element = document.createElement('option');
    element.innerText = arr[i];
    element.setAttribute('value', arr[i]);
    userCity.append(element);
  }
  toggle(userCity.parentElement, 'show');
  isAllOK[userRegion] = true;
}


function validatePhone(userPhone, reg) {
  let phone = userPhone.value.replace(reg, '');
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
  if (toggler === 'show') {
    input.classList.add('show');
    input.classList.remove('hidden');
    isAllOK[input.firstElementChild.name] = false;
  } else if (toggler === 'hidden') {
    input.classList.add('hidden');
    input.classList.remove('show');
    isAllOK[input.firstElementChild.name] = true;
  } else if (toggler === 'success') {
    input.classList.add('success');
    input.classList.remove('failed');
    isAllOK[input.name] = true;
  } else if (toggler === 'failed') {
    input.classList.add('failed');
    input.classList.remove('success');
    isAllOK[input.name] = false;
  } else if (toggler === ''){
    input.classList.remove('failed');
    input.classList.remove('success');
    isAllOK[input.name] = false;
  } else {
    console.log(`EROR! Unexpected input ${toggler}`);
  }
}

function validateInput(input, reg) {
  return input.match(reg);
}
