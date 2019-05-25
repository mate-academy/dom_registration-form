'use strict';

const fullNameRegExp = new RegExp(
  "^([A-Z][a-z]*'?[a-z]*[-]?[A-Z]?[a-z]*('[a-z]*)?\\s){1,2}"
  + "[A-Z][a-z]*'?[a-z]*[-]?[A-Z]?[a-z]*('[a-z]*)?$"
);
const phoneNumberRegExp = /^(((\+?3)?\s?8\s?)?0)?(\d{2,4}(\s|-)?){1,4}$/;
const citiesByRegionsObject = {
  'Kyiv': [],
  'Center':
    ['Cherkasy', 'Dnipro', 'Kropyvnytskyi', 'Poltava', 'Vinnytsia', 'Zhytomyr'],
  'North': ['Chernihiv', 'Sumy'],
  'East': ['Donetsk', 'Kharkiv', 'Luhansk'],
  'South': ['Kherson', 'Mykolaiv', 'Odesa', 'Zaporizhzhia'],
  'West':
    ['Chernivtsi', 'Ivano-Frankivsk', 'Khmelnytskyi', 'Lutsk', 'Lviv', 'Rivne',
      'Ternopil', 'Uzhhorod'],
};

function main() {
  const registrationForm = document.forms.registrationForm;
  const fullName = document.registrationForm.fullName;
  const needMore = document.registrationForm.needMore;
  const phoneNumber = document.registrationForm.phoneNumber;
  const region = document.registrationForm.region;
  const city = document.registrationForm.city;
  const submitButton = registrationForm.querySelector('input[type="submit"]');

  const initBlankInSelect = function(selectElement) {
    const blankOption = document.createElement('option');

    selectElement.options.length = 0;
    blankOption.value = 'blank';
    blankOption.text = '';
    selectElement.add(blankOption, null);
  };

  const validateAll = function() {
    let isValid;
    const backgroundRed = function(someInput) {
      someInput.classList.remove('inputs-column_valid');
      someInput.classList.add('inputs-column_invalid');
    };
    const backgroundGreen = function(someInput) {
      someInput.classList.remove('inputs-column_invalid');
      someInput.classList.add('inputs-column_valid');
    };
    const emptied = function(someInput) {
      someInput.classList
        .remove('inputs-column_invalid', 'inputs-column_invalid');
    };

    isValid = fullNameRegExp.test(fullName.value.trim());
    if (fullName.value !== '') {
      if (isValid) {
        backgroundGreen(fullName);
      } else {
        backgroundRed(fullName);
      }
    } else {
      emptied(fullName);
    }
    if (!needMore.checked) {
      const nextResult = phoneNumberRegExp.test(phoneNumber.value.trim());
      if (phoneNumber.value !== '') {
        if (nextResult) {
          backgroundGreen(phoneNumber);
        } else {
          backgroundRed(phoneNumber);
        }
      } else {
        emptied(phoneNumber);
      }
      isValid &= nextResult;
      isValid &= region.options.selectedIndex !== 0;
      isValid &= city.options.selectedIndex !== 0;
    }
    return isValid;
  };

  const renderByCheckBox = function() {
    phoneNumber.hidden = needMore.checked;
    document.querySelector(`label[for='${phoneNumber.id}']`)
      .hidden = needMore.checked;
    region.hidden = needMore.checked;
    document.querySelector(`label[for='${region.id}']`)
      .hidden = needMore.checked;
    city.hidden = needMore.checked;
    document.querySelector(`label[for='${city.id}']`)
      .hidden = needMore.checked;
  };

  // Initializing region and city selects
  initBlankInSelect(region);
  initBlankInSelect(city);
  Object.keys(citiesByRegionsObject).forEach((someRegion) => {
    region.options[region.options.length] = new Option(someRegion, someRegion);
  });
  region.addEventListener('change', (someEvent) => {
    const selectedItem = someEvent.currentTarget
      .options[region.options.selectedIndex];
    if (selectedItem.value === 'blank') { return; }

    citiesByRegionsObject[selectedItem.value].forEach((someCity) => {
      city.options[city.options.length] = new Option(someCity, someCity);
    });
    city.options[city.options.length] = new Option(
      'Not in the list', 'Other city'
    );
  });

  const validateAndRender = function(someEvent) {
    if (someEvent) {
      someEvent.target.classList.remove('inputs-column_inputting');
    }
    if (validateAll()) {
      submitButton.disabled = false;
      submitButton.classList.add('hover');
    } else {
      submitButton.disabled = true;
      submitButton.classList.remove('hover');
    }
  };

  // Add trigger for listing changing checkbox and rendering the form
  // according to it's value
  needMore.addEventListener('change', renderByCheckBox);

  registrationForm.addEventListener('keyup', (someEvent) => {
    if (someEvent.key === 'Enter') {
      let nextIndex
        = someEvent.target.tabIndex === 6 ? 1 : someEvent.target.tabIndex + 1;
      if (someEvent.target.type === 'checkbox') {
        needMore.checked = !needMore.checked;
        renderByCheckBox();
        validateAndRender();
        if (needMore.checked) {
          nextIndex = submitButton.disabled ? 1 : 6;
        }
      }
      someEvent.target.blur();
      registrationForm.querySelector(`[tabindex="${nextIndex}"]`).focus();
    }
  });

  registrationForm.addEventListener('focus', (someEvent) => {
    someEvent.target.classList
      .remove('inputs-column_valid', 'inputs-column_invalid');
    someEvent.target.classList.add('inputs-column_inputting');
  });

  registrationForm.addEventListener('change', validateAndRender);
}

document.addEventListener('DOMContentLoaded', main);

console.log('Thank you, mate academy!');
