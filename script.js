window.addEventListener('load', () => {
    const form = document.getElementById('form');
    const fullName = document.getElementById('fullName');
    const phoneNumber = document.getElementById('phoneNumber');
    const selectRegion = document.getElementById('selectRegion');
    const additionalInfo = document.querySelector('.additionalInfo');
    const agreeChBox = document.getElementById('agreeChBox');
    const submitBtn = document.getElementById('submitBtn');



    const selectData = {
        'center': 'Cherkasy, Dnipro, Kropyvnytskyi, Poltava, Vinnytsia, Zhytomyr, Not in the list',
        'north': 'Chernihiv, Sumy, Not in the list',
        'east': 'Donetsk, Kharkiv, Luhansk, Not in the list',
        'south': 'Kherson, Mykolaiv, Odesa, Zaporizhzhia, Not in the list',
        'west': 'Chernivtsi, Ivano-Frankivsk, Khmelnytskyi, Lutsk, Lviv, Rivne, Ternopil, Uzhhorod, Not in the list'
    };


    fullName.addEventListener('focus', () => {
        const {classList: inputClassList} = fullName;
        inputClassList.remove('not-valid');
        inputClassList.remove('valid');
    });

    fullName.addEventListener('blur', () => {
        const {classList: inputClassList} = fullName;
        if (fullNameTest(fullName)) {
            inputClassList.add('valid');
            fullName.dataset.isValid = 'yes';
        } else {
            inputClassList.add('not-valid');
            fullName.dataset.isValid = 'no';
        }
        validationForm();
    });

    function fullNameTest(input) {
        const {value} = input;
        const partsOfName = value.trim().split(' ');
        const validLength = (partsOfName.length > 1 && partsOfName.length <4);
        const regStr = /^[A-Z][a-z]*$/;
        const allIsName = partsOfName.every((item) => {
            return regStr.test(item);
        });
        return (validLength && allIsName);
    }

    agreeChBox.addEventListener('change', () => {
        const {classList: infoClassList} = additionalInfo;
        if (agreeChBox.checked) {
            infoClassList.add('hidden');
        } else {
            infoClassList.remove('hidden');
        }
        validationForm();
    });

    phoneNumber.addEventListener('focus', () => {
        const {classList: inputClassList} = phoneNumber;
        inputClassList.remove('not-valid');
        inputClassList.remove('valid');
    });

    phoneNumber.addEventListener('blur', () => {
        const {classList: inputClassList} = phoneNumber;
        if (phoneNumberTest(phoneNumber)) {
            inputClassList.add('valid');
            phoneNumber.dataset.isValid = 'yes';
        } else {
            inputClassList.add('not-valid');
            phoneNumber.dataset.isValid = 'no';
        }
        validationForm();
    });

    function phoneNumberTest(input) {
        const {value} = input;
        const regStr =  /^(((380)?[0-9]{9})|(0[0-9]{9}))$/;
        return regStr.test(value);


    }

    selectRegion.addEventListener('change', () => {
        const {value} = selectRegion;
        const containerSelectTowns = document.querySelector('.containerSelectTowns');

        if (containerSelectTowns !== null) {
            containerSelectTowns.remove();
        }

        const newSelect = createSelect(selectData, value);

        if(newSelect) {
            selectRegion.dataset.isValid = 'yes';
            additionalInfo.appendChild(newSelect);
        }

        validationForm();
    });

    function createSelect(selectData, selectParam) {

        if(selectData.hasOwnProperty(selectParam)) {
            const townsStr = selectData[selectParam];
            const townsArray = townsStr.split(', ');
            const div = document.createElement('div');
            div.classList.add('form-item');
            div.classList.add('containerSelectTowns');
            const label = document.createElement('label');
            label.textContent = 'Select your city:';
            label.htmlFor = 'selectTowns';
            div.appendChild(label);
            const selectElem = document.createElement('select');
            const emptyElem = document.createElement('option');
            emptyElem.selected = true;
            emptyElem.disabled = true;
            selectElem.appendChild(emptyElem);
            selectElem.id = 'selectTowns';
            selectElem.name = 'selectTowns';
            selectElem.class = 'form-field';
            selectElem.dataset.isValid = 'no';

            townsArray.forEach((item) => {
                const optionElem = document.createElement('option');
                optionElem.textContent = item;
                optionElem.value = item.toLowerCase().replace(/\s/g, '');
                selectElem.appendChild(optionElem);
            });

            div.appendChild(selectElem);

            return div;
        }

    }

    function validationForm() {
        const {classList: btnClassList} = submitBtn;
        let valid;
        if(agreeChBox.checked) {
            valid = fullName.dataset.isValid === 'yes';
        } else {
            valid = [...form.querySelectorAll('.form-field')]
                .every(item => item.dataset.isValid === 'yes');
        }

        if (valid) {
            btnClassList.remove('disabledBtn');
        } else {
            btnClassList.add('disabledBtn');
        }
    }
});





