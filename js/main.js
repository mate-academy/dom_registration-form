document.addEventListener("DOMContentLoaded", function() {
  fillRegionSelect(regions);
});
document.querySelector("form").addEventListener("change", validate);
const submit = document.querySelector('#submit');
const checkbox = document.querySelector('#checkbox');
const option = (...args) => new Option(...args);

function validate(ev) {
  let target = ev.target;
  let validName = isValid(document.querySelector('#name'), regExp.name);
  let validPhone = isValid(document.querySelector('#phone'), regExp.phone);
  let validregion =  document.querySelector('#region').value ? true : false;

  switch (target.id) {
    case "name":
      validName;
      break;

    case "phone":
      isValid(target, regExp.phone);
      break;

    case "region":
      const city = document.querySelector("#city");
      if (target.value === "Kiev" || target.value === "") {
        if (city) {
          city.remove()
        }
        return;
      }
      const cityList = fillCitySelect(regions[target.value]);
      city ? city.replaceWith(cityList) : target.after(cityList);
      break;

    case "checkbox":
      document.querySelector(".hide_wrap").hidden = target.checked;
      break;

    default:
      break;
  }
  submit.disabled = !allChecked(validName, validPhone, validregion);
}

function allChecked(...args) {
  if (checkbox.checked) {
    return args[0];
  } else {
    return [...args].every((i) => i === true);
  }
}

function isValid(elem, reg) {
  if (reg.test(elem.value)) {
    elem.classList.add("valid");
    elem.classList.remove("invalid");
  } else {
    elem.classList.add("invalid");
    elem.classList.remove("valid");
  }
  return reg.test(elem.value);
}

function fillRegionSelect(list) {
  const selectMenu = document.getElementById("region");
  selectMenu.append(option());
  for (let key in list) {
    selectMenu.append(option(key, key));
  }
}

function fillCitySelect(region) {
  const cityList = document.createElement("select");
  cityList.id = "city";

  region.forEach(i => {
    cityList.append(option(i, i));
  });
  return cityList;
}

const regions = {
  Kiev: "Kiev",
  Center: [
    "Cherkasy",
    "Dnipro",
    "Kropyvnytskyi",
    "Poltava",
    "Vinnytsia",
    "Zhytomyr"
  ],
  North: ["Chernihiv", "Sumy"],
  East: ["Donetsk", "Kharkiv", "Luhansk"],
  South: ["Kherson", "Mykolaiv", "Odesa", "Zaporizhzhia"],
  West: [
    "Chernivtsi",
    "Ivano-Frankivsk",
    "Khmelnytskyi",
    "Lutsk",
    "Lviv",
    "Rivne",
    "Ternopil",
    "Uzhhorod"
  ]
};
const regExp = {
  name: /^[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{0,}\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,}(\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,})?$/,
  phone: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
};
