const form = document.forms.registration;
const fullname = form.fullname;
const phone = form.phone;
let inputState

const validationRules = {
    phone: '^(?<country>((\\+)?\\d{2})?' +
        '(?<region>((\\s|-|\\()?){0,2}\\d{3}(\\s|-|\\))?(\\s|-)?)?' +
        '(?<city>\\d{3}((\\s|-)?\\d{2}){2}))$',
    fullname: '^([a-zA-z]{2,15}\\s?){2,3}$'
};

function regTest(rule) {
    return new RegExp(validationRules[rule], 'g').test(form[rule].value);
}

function styleIt(validity) {
    console.log(this)
    if (validity === "is-valid") {
       console.log ("is valid");
        this.classList.toggle("is-valid", true);

    } else {
        console.log ("not valid")
        this.classList.toggle("invalid", true);
    }
}

function validateInput() {
    regTest(this["name"]) ? styleIt.call(this, "is-valid") : styleIt.call(this, "invalid");
}

fullname.addEventListener('blur', validateInput);
phone.addEventListener('blur', validateInput);

