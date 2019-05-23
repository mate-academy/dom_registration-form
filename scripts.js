window.onload = () => {
  function isValidData(data, pattern) {
  return pattern.test(data);
}


document.querySelector('#submitButton').disabled = true;

const changeButtonState = function() {
  if ( 
    ((isNameEntered && isNumberEntered) || (isCheckboxChecked && isNameEntered)
    && isRegionSelected 
    && isCitySeleted)) {
    document.querySelector('#submitButton').disabled = true;
  } else {
    document.querySelector('#submitButton').disabled = false;
  }
}

let isNameEntered = false;
let isNumberEntered = false;
let isCheckboxChecked = false;
let isRegionSelected = false;
let isCitySeleted = false;

document.querySelector('#fullName').addEventListener('change', function(event) {
  const fullName = document.forms['mainForm'].elements['fullName'].value.trim();
  const validName = /^[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{0,}\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,}(\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,})?$/;
  if (isValidData(fullName, validName)) {
    document.querySelector('#fullName').style.backgroundColor = "green";
    isNameEntered = true;
  } else {
    document.querySelector('#fullName').style.backgroundColor = "red";
    isNameEntered = false;
  }
  changeButtonState();
});

document.querySelector("#phoneNumber").addEventListener('change', function(event) {
  const phoneNumber = document.forms['mainForm'].elements['phoneNumber'].value.trim();
  const validPhoneNumber = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
  if (isValidData(phoneNumber, validPhoneNumber)) {
    document.querySelector('#phoneNumber').style.backgroundColor = "green";
    isNumberEntered = true;
  } else {
    document.querySelector('#phoneNumber').style.backgroundColor = "red";
    isNumberEntered = false;
  }
  changeButtonState();
});

document.querySelector('#selectRegion').addEventListener('change', function(event) {
  
  const optionsObject = {
    Center: ["Cherkasy", "Dnipro", "Kropyvnytskyi", "Poltava", "Vinnytsia", "Zhytomyr"],
    North: ["Chernihiv", "Sumy"],
    East: ["Donetsk", "Kharkiv", "Luhansk"],
    South: ["Kherson", "Mykolaiv", "Odesa", "Zaporizhzhia"],
    West: ["Chernivtsi", "Ivano-Frankivsk", "Khmelnytskyi", "Lutsk", "Lviv", "Rivne", "Ternopil", "Uzhhorod"]
  };
  

  for (let district in optionsObject) {
    if (district === document.querySelector('#selectRegion').options[document.querySelector('#selectRegion').selectedIndex].value) {
      for ( let city of optionsObject[district]) {
        console.log(optionsObject[district]);
        let option = new Option(city);
        document.querySelector('#selectCity').insertBefore(option, document.querySelector('#Not_in_the_list'));
      }
    }
  }

  const isShouldDisplay = document.querySelector('#selectRegion').selectedIndex > 1 ?  true : false;
  if(isShouldDisplay) {
    document.querySelector('#selectCity').style.display = "block";
    isRegionSelected = true;
  } else {    
    document.querySelector('#selectCity').style.display = "";
    isRegionSelected = false;
  }
  changeButtonState();
});

document.querySelector('#checkbox').addEventListener('change', function(event) {
  if(document.querySelector('#checkbox').checked) {
    document.querySelector("#phoneNumber").style.display="none";
    document.querySelector('#selectRegion').style.display="none";
    document.querySelector('#selectCity').style.display = "none";
    isCheckboxChecked = true;
  } else {
    document.querySelector("#phoneNumber").style.display="block";
    document.querySelector('#selectRegion').style.display="block";
    document.querySelector('#selectCity').style.display = "";
    isCheckboxChecked = false;
  }
  changeButtonState();
});
}
