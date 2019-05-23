// array cities and variables

const cityOfUkraine =  {
  Center: ['Cherkasy', 'Dnipo', 'Kropyvnytskyi', 'Poltava', 'Vinnytsia', 'Zhytomyr'],
  North: ['Chernihiv', 'Sumy'],
  East: ['Donetsk', 'Kharkiv', 'Luhansk'],
  South: ['Odesa', 'Mikolaiv', 'Kherson', 'Zaporizhzhia'],
  West: ['Chernivtsi', 'Ivano-Frankivsk', 'Khmelnytskyi', 'Lviv', 'Rivne', 'Ternopil', 'Uzhhorod']
}

const form = document.querySelector('form');
const inputFullName = document.querySelector('#fullName');
const inputPhoneNumber = document.querySelector('#phoneNumber');
const selectRegion = document.querySelector('#selectRegion');
const hiddenPhoneAndTown = document.querySelector('#checkbox');
const submit = document.querySelector('#submit');


// events 

form.addEventListener('change', (e) => {
  if (e.target === inputFullName) {
    isCorrectFullName(e.target);
  }
  if (e.target === inputPhoneNumber) {
    isCorrectPhoneNubmer(e.target);
  }
  if (e.target === selectRegion) {
    isCorrcetRegion(e.target);
  }
  if (e.target === hiddenPhoneAndTown) {
    hidePhoneAndTown(e.target.checked);
  }
  validateAllForm();
})
 
// secondary functions for event handler

function hidePhoneAndTown(isChecked) {
   if (isChecked) {
     selectRegion.parentNode.style.display = 'none';
     inputPhoneNumber.parentNode.style.display = 'none';
   } else {
     selectRegion.parentNode.style.display = '';
     inputPhoneNumber.parentNode.style.display = '';
   }
}

function isCorrectFullName(fullName) {
 const amountWords = fullName.value.trim().split(' ').length;
 if (amountWords > 1 && amountWords <= 3) {
   fullName.className = 'correct';
 } else {
  fullName.className = 'incorrect';
 }
}

function isCorrectPhoneNubmer(phoneNumber) {
  const onlyNums = phoneNumber.value.replace(/[\s\-\(\)]/g, '');
  if (onlyNums.match(/^((\+?3)?8)?0\d{9}$/)) {
    phoneNumber.className = 'correct'
  } else {
    phoneNumber.className = 'incorrect';
  }
}

function isCorrcetRegion(selectedRegion) {
  const index = selectedRegion.selectedIndex;
  const region = selectedRegion.options[index].value;
  console.log(region)
  createSelectCity(region);
  validateSelect(selectedRegion);
}


function validateAllForm() {
  const fullNameCorrect = inputFullName.classList.contains('correct');
  const phoneNumCorrect = inputPhoneNumber.classList.contains('correct');
  const regionCorrect = selectRegion.classList.contains('correct');

  if (hiddenPhoneAndTown.checked && fullNameCorrect) {
    submit.disabled = false;
  } else if (fullNameCorrect && phoneNumCorrect && regionCorrect) {
      if (selectRegion.nextElementSibling) {
         const cityCorrect = selectRegion.nextElementSibling.children[1].classList.contains('correct');
         cityCorrect ? submit.disabled = false : submit.disabled = true;
      } else {
        submit.disabled = false;
      }
  } else {
    submit.disabled = true;
  }
}

function validateSelect(e) {
  if (e.selectedIndex) {
    e.className = 'correct'
  } else {
    e.className = 'incorrect'
  }
}

// i don't now how i can call this func, but it's function help my secondary function selectRegion :)

function createSelectCity(value) {
  const removeContainer = document.querySelector('#containerCity');

  if ((value === 'Kiev' || value === 'empty') && !!removeContainer) {
    removeContainer.remove();
  }

  if (value === 'Kiev' || value === 'empty') return;

  if (removeContainer) {
    removeContainer.remove();
  } 

  const container = document.createElement('div');
  container.id = 'containerCity';
  const label = document.createElement('label');
  label.htmlFor = 'city';
  label.innerHTML = 'city ';
  container.append(label);

  const selectCity = document.createElement('select');
  selectCity.id = 'city';
  const emptyOption = new Option('', 'empty', true, true);
  const optionNotInTheList = new Option('Not in the list', 'Not in the list')
  selectCity.append(emptyOption);
  selectCity.append(optionNotInTheList);

  for (let key of cityOfUkraine[value]) {
    const option = new Option(`${key}`, `${key}`)
    optionNotInTheList.before(option);
  }
  
  selectCity.addEventListener('blur', (e) => {
    if (e.target.selectedIndex) {
      e.target.className = 'correct';
    } else {
      e.target.className = 'incorrect';
    }
    validateAllForm()
  })
  container.append(selectCity);
  selectRegion.after(container);
}
