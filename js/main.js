document.addEventListener('DOMContentLoaded', function () {
  let input = document.querySelector('.input-fullname');
  input.onblur = function () {
    if (input.value.split(' ').filter(elem => elem.length > 0).length < 2 || input.value.split(' ').filter(elem => elem.length > 0).length > 3) {
      input.classList.add('error');
      input.classList.remove('submit');
    } else if (input.value.split(' ').filter(elem => elem.length > 0).length >= 2 && input.value.split(' ').filter(elem => elem.length > 0).length <= 3) {
      input.classList.add('submit')
      input.classList.remove('error');
    }
  }
  let phoneInput = document.querySelector('.input-phonenumber');
  let phoneReg = /^((8|\+3)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,9}$/;
  phoneInput.onblur = function () {
    if (phoneInput.value.match(phoneReg)) {
      phoneInput.classList.add('submit');
      phoneInput.classList.remove('error');
    } else if (!phoneInput.value.match(phoneReg)) {
      phoneInput.classList.add('error');
      phoneInput.classList.remove('submit');
    }
  }

  let selectBox = document.querySelector('.select');
  let checkbox = document.querySelector('[type="checkbox"]');
  checkbox.addEventListener('click', function(){
    if (checkbox.checked) {
      document.querySelector('.more-info').classList.add('none');
    }else {
      document.querySelector('.more-info').classList.remove('none');
    }
  })
  selectBox.addEventListener('click', function () {
    if (selectBox.value === 'Center') {
      document.querySelector('.center').style.display = 'inline-block';
      console.dir(checkbox);
    } else {
      document.querySelector('.center').style.display = 'none';
    }
    if (selectBox.value === 'North') {
      document.querySelector('.North').style.display = 'inline-block';
    } else {
      document.querySelector('.North').style.display = 'none';
    }
    if (selectBox.value === 'East') {
      document.querySelector('.East').style.display = 'inline-block';
    } else {
      document.querySelector('.East').style.display = 'none';
    }
    if (selectBox.value === 'South') {
      document.querySelector('.South').style.display = 'inline-block';
    } else {
      document.querySelector('.South').style.display = 'none';
    }
    if (selectBox.value === 'West') {
      document.querySelector('.West').style.display = 'inline-block';
    } else {
      document.querySelector('.West').style.display = 'none';
    }
  })
})