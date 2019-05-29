const name = document.querySelector("input[name=fullname]");
name.addEventListener("blur", (event) => {
  checkName();
});

function checkName() {
  let nameWords = name.value.split(" ").filter(function (el) {
      return el != null && el != "" && el != undefined;
    });

  if(nameWords.length >= 2 && nameWords.length <= 3) {
    name.style.background = "green";
    return true;
  }
  name.style.background = "red";
  return false;  
}

name.addEventListener("focus", (event) => {
  name.style.background = "white";
});

const textnumber = document.querySelector("input[name=number]");
textnumber.addEventListener("blur", (event) => {
  checkNumber();
});

function checkNumber() {
  let phoneNumber = textnumber.value.replace(/[() -]/g, "");

  let phoneNo = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
  
  if(phoneNumber.match(phoneNo)) {
    textnumber.style.background = "green";
    return true;
  }
  textnumber.style.background = "red";
  return false;
}

textnumber.addEventListener("focus", (event) => {
  textnumber.style.background = "white";
});

const region = document.querySelector("select[name=region]");
const city =  document.querySelector("select[name=city]");
const regionToCity = {
  "Center": ["Cherkasy", "Dnipro", "Kropyvnytskyi", "Poltava", "Vinnytsia", "Zhytomyr"], 
  "North": ["Chernihiv", "Sumy"], 
  "East": ["Donetsk", "Kharkiv", "Luhansk"], 
  "South": ["Kherson", "Mykolaiv", "Odesa", "Zaporizhzhia"],
  "West": ["Chernivtsi", "Ivano-Frankivsk", "Khmelnytskyi", "Lutsk", "Lviv", "Rivne", "Ternopil", "Uzhhorod"]
}

region.addEventListener("input", (event) => {
  checkRegion();
});

function checkRegion() {
  if(region.value === "") {
    return false;
  }
  
  while (city.firstChild) city.removeChild(city.firstChild);
  let option = document.createElement("option");
  city.appendChild(option);
  
  
  
  if(region.value != "Kyiv") {
    city.style.display = "block";

    for(let cityLocal of regionToCity[region.value]) {
      let option = document.createElement("option");
      option.innerHTML = cityLocal;
      city.appendChild(option);
    }
    let option = document.createElement("option");
    option.innerHTML = "Not in the list";
    city.appendChild(option);
  }
  else {
    city.style.display = "none";
  }

  
  return true;
}


const hideAll = document.querySelector("input[name=hide]");
const hideable = document.querySelector("#hideable");
hideAll.addEventListener("input", () => {
  if(hideAll.checked) {
    hideable.style.display = "none";
  }
  else {
    hideable.style.display = "block";
  }
});

const btn = document.querySelector("form");
btn.addEventListener("submit", function(event) {
  
  if(!checkName())
  {
    return false;
  }
  if(!hideAll.checked) {
    
    if(!checkNumber()) return false;

    if(region.value == "") {
      region.style.background = "red"
      return false;
    }
    else {
      region.style.background = "white";
    }
    if(region.value == "Kyiv") return true;
      
      if(city.value == "") {
        city.style.background = "red";
        return false;
      }
      else {
        city.style.background = "white";
      }
  }
  return true;
});

