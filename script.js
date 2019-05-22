const name = document.querySelector("input[name=fullname]");
name.addEventListener("blur", (event) => {
  checkName(event);
});

function checkName(event) {
  let nameWords = name.value.split(" ").filter(function (el) {
      return el != null && el != "" && el != undefined;
    });

  if(nameWords.length >= 2) {
    name.style.background = "green";
    return true;
  }

  if(nameWords.length < 2) {
    name.style.background = "red";
    return false;
  }
}

name.addEventListener("focus", (event) => {
  name.style.background = "white";
});

const textnumber = document.querySelector("input[name=number]");
textnumber.addEventListener("blur", (event) => {
  checkNumber(event);
});

function checkNumber(event) {
  let numbr = textnumber.value.split("-").join("")
                              .split(" ").join("")
                              .split("(").join("")
                              .split(")").join("");

  let phoneno = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
  
  if(numbr.match(phoneno)) {
    textnumber.style.background = "green";
    return true;
  }
  else {
    textnumber.style.background = "red";
    return false;
  }
}

textnumber.addEventListener("focus", (event) => {
  textnumber.style.background = "white";
});

const region = document.querySelector("select[name=region]");
const city =  document.querySelector("select[name=city]");
const regiontocity = {
  "Center": ["Cherkasy", "Dnipro", "Kropyvnytskyi", "Poltava", "Vinnytsia", "Zhytomyr"], 
  "North": ["Chernihiv", "Sumy"], 
  "East": ["Donetsk", "Kharkiv", "Luhansk"], 
  "South": ["Kherson", "Mykolaiv", "Odesa", "Zaporizhzhia"],
  "West": ["Chernivtsi", "Ivano-Frankivsk", "Khmelnytskyi", "Lutsk", "Lviv", "Rivne", "Ternopil", "Uzhhorod"]
}

region.addEventListener("input", (event) => {
  checkRegion(event);
});

function checkRegion(event) {
  if(region.value === "") {
    return false;
  }
  
  while (city.firstChild) city.removeChild(city.firstChild);
  let option = document.createElement("option");
  city.appendChild(option);
  
  
  
  if(region.value != "Kyiv") {
    city.style.display = "block";

    for(let cty of regiontocity[region.value]) {
      let option = document.createElement("option");
      option.innerHTML = cty;
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
btn.onsubmit = function validateForm(event) {
  
  if(!checkName(event))
  {
    return false;
  }
  if(!hideAll.checked) {
    
    if(!checkNumber(event)) return false;

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
}

