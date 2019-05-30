const form = document.getElementById('registrationForm');
const fullName = document.getElementById('fullName');
const phoneNumber =  document.getElementById('phoneNumber');
const hideInfo = form.querySelector('#hidden-info');
const privateInfo = document.getElementById('privateInfo');
const inputRegion = form.querySelector('#region');
const city = form.querySelector('select#city');
const cities = form.querySelector('#cities');
const submit = form.querySelector('input#submit');

fullName.addEventListener('blur', () => {
  console.log(fullName);
  const regStr = /^[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{0,}\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,}(\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,})?$/;
    if (regStr.test(fullName.value)) {
      fullName.style.backgroundColor = 'green';
    } else {
      fullName.style.backgroundColor = 'red';
    }
  });

phoneNumber.addEventListener('blur', () => {
  console.log('work')
  const regPhone =/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    if (regPhone.test(phoneNumber.value)) {
      phoneNumber.style.backgroundColor = 'green';
    } else if (!phoneNumber.value) {
      phoneNumber.style.backgroundColor = 'white';
    } else {
      phoneNumber.style.backgroundColor = 'red';
    }
});

hideInfo.addEventListener('input', (event) => {
  if (hideInfo.checked) {
    privateInfo.classList.add('display-none');
  } else {
    privateInfo.classList.remove('display-none');
  }
});

inputRegion.addEventListener('input', (event) => {
  const regionValue = inputRegion.value.toLowerCase();
  if (regionValue) {
    cities.classList.remove('display-none');
  } else {
    cities.classList.add('display-none');
  }
  if (city.selectedIndex >= 0) {
    city.selectedIndex = -1;
  }
  const cityOptions = cities.querySelectorAll('[data-region]');
  cityOptions.forEach((element) => {
    if (regionValue === element.dataset.region) {
      element.classList.remove('display-none');
    } else {
      element.classList.add('display-none');
    }
  })
});
