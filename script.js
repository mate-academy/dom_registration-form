const name = document.querySelector('.name');
const phone = document.querySelector('.phone');
const select = document.querySelector('.regions');
const selectCity = document.createElement('select');
const checkbox = document.querySelector('.check');
let label = document.createElement('label');
const button = document.querySelector('button');
const cities = {
  center: ['Cherkasy', 'Dnipro', 'Kropyvnytskyi', 'Poltava', 'Vinnytsia','Zhytomyr'],
  north: ['Chernihiv', 'Sumy'],
  east: ['Donetsk', 'Kharkiv', 'Luhansk'],
  south: ['Kherson', 'Mykolaiv', 'Odesa', 'Zaporizhzhia'],
  west: ['Chernivtsi', 'Ivano-Frankivsk', 'Khmelnytskyi', 'Lutsk', 'Lviv', 'Rivne', 'Ternopil', 'Uzhhorod']
}

label.classList.add('city');

name.addEventListener('blur', function(){
  const nameArray = this.value.trim().split(/\s+/);
  const notWord = /[^a-z]+/i;
  nameArray.forEach((item) => {
    if (notWord.test(item) || (nameArray.length < 2 || nameArray.Length > 3)) {
      this.style.backgroundColor = 'red';
      this.setAttribute('data-validation', 'invalid');
    } else {
      this.style.backgroundColor = 'lightgreen';
      this.setAttribute('data-validation', 'valid');
    }
  });
});

phone.addEventListener('blur', function(){
  const phoneNumber = /\+?\d{3}\s?\d{3}?-?\d\d-?\d\d/;
  if (phoneNumber.test(this.value)) {
    this.style.backgroundColor = 'lightgreen';
    this.setAttribute('data-validation', 'valid');
  } else {
    this.style.backgroundColor = 'red';
    this.setAttribute('data-validation', 'invalid');
  }
});

select.addEventListener('change', function() {
  const region = this.options[this.selectedIndex].value.toLowerCase();
  
  if(selectCity.children.length) {
    for (let i = 0; i < selectCity.children.length; i++) {
      selectCity.removeChild(selectCity.lastChild);
      i--;
    }
  }

  if (region !== "kyiv") {
    label.innerHTML = 'City';
    for (let i = 0; i <= cities[region].length; i++) {
      const option = document.createElement('option');
      if (i === 0) {
        option.innerHTML = '';
      } else if (i === cities[region].length) {
        option.innerHTML = 'Not in the list';
      } else {
        option.innerHTML = cities[region][i];
      }
      selectCity.append(option);
    }
    
    label.style.margin = '0 0 20px';
    label.append(selectCity);
    document.forms[0].insertBefore(label, button);
  } else {
    if(document.forms[0].querySelector('.city')){
      document.forms[0].removeChild(document.querySelector('.city'));
    }
  }
});

checkbox.addEventListener('change', function() {
  if (this.checked) {
    phone.parentElement.style.display = 'none';
    select.parentElement.style.display = 'none';
    if (selectCity.children.length) {
      selectCity.parentElement.style.display = 'none';
    }
    
  } else {
    phone.parentElement.style.display = 'inherit';
    select.parentElement.style.display = 'inherit';
    if (selectCity.children.length) {
      selectCity.parentElement.style.display = 'inherit';
    }
  }
});

button.addEventListener('click', (e) => e.preventDefault());
window.addEventListener('click', function(){
  if (checkbox.checked) {
    if(name.dataset.validation === 'valid') {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  } else {
   if(name.dataset.validation === 'valid' && phone.dataset.validation === 'valid' && select.selectedIndex !== 0 && selectCity.selectedIndex !== 0) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
 }
});