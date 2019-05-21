function isValidData(data, pattern) {
  return pattern.test(data);
}

document.querySelector('#fullName').addEventListener('change', function(event) {
  const fullName = document.forms['mainForm'].elements['fullName'].value.trim();
  const validName = /^[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{0,}\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,}(\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,})?$/;
  if (isValidData(fullName, validName)) {
    document.querySelector('#fullName').style.backgroundColor = "green";
  } else {
    document.querySelector('#fullName').style.backgroundColor = "red";
  }
});

document.querySelector("#phoneNumber").addEventListener('change', function(event) {
  const phoneNumber = document.forms['mainForm'].elements['phoneNumber'].value.trim();
  const validPhoneNumber = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
  if (isValidData(phoneNumber, validPhoneNumber)) {
    document.querySelector('#phoneNumber').style.backgroundColor = "green";
  } else {
    document.querySelector('#phoneNumber').style.backgroundColor = "red";
  }
  
});

document.querySelector('#selectRegion').addEventListener('change', function(event) {
  
  // let optionsArray = [];
  // for (let i =0; i < document.querySelector('#selectRegion').options.length; i++) {
  //   if (document.querySelector('#selectRegion').options[i].selected) {
  //     optionsArray = document.querySelector('#selectRegion').options[i].value.match(/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/g);
  //   }
  // }


  const centralCities = ["Cherkasy", "Dnipro", "Kropyvnytskyi", "Poltava", "Vinnytsia", "Zhytomyr"];
  const northernCities = ["Chernihiv", "Sumy"];
  const easternCities = ["Donetsk", "Kharkiv", "Luhansk"];
  const southernCities = ["Kherson", "Mykolaiv", "Odesa", "Zaporizhzhia"];
  const westernCities = ["Chernivtsi", "Ivano-Frankivsk", "Khmelnytskyi", "Lutsk", "Lviv", "Rivne", "Ternopil", "Uzhhorod"];
  const districtsArray = [centralCities, northernCities, easternCities, southernCities, westernCities]
  
  for (let i = 0; i < document.querySelector('#selectRegion').options.length; i++) {
    if (document.querySelector('#selectRegion').options[i].selected) {
      for (let j = 0; j < districtsArray[i].length; i++) {
        const option = new Option(districtsArray[i][j]);
        document.querySelector('#selectCity').append(option);
      }
    }
  }


  const isShouldDisplay = document.querySelector('#selectRegion').selectedIndex > 1 ?  true : false;
  if(isShouldDisplay) {
    document.querySelector('#selectCity').style.display = "block";
  } else {    
    document.querySelector('#selectCity').style.display = "";
  }
});

document.querySelector('#checkbox').addEventListener('change', function(event) {
  if(document.querySelector('#checkbox').checked) {
    document.querySelector('#fullName').style.display="none";
    document.querySelector("#phoneNumber").style.display="none";
    document.querySelector('#selectRegion').style.display="none";
  } else {
    document.querySelector('#fullName').style.display="block";
    document.querySelector("#phoneNumber").style.display="block";
    document.querySelector('#selectRegion').style.display="block";
  }
});
