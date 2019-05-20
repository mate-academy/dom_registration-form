document.addEventListener('DOMContentLoaded', function() {
  let input = document.querySelector('.input-fullname');
  input.onblur = function() {
    if (input.value.split(' ').filter(elem => elem.length > 0).length < 2 || input.value.split(' ').filter(elem => elem.length > 0).length > 3) {
      input.classList.add('error');
      input.classList.remove('submit');
    }else if (input.value.split(' ').filter(elem => elem.length > 0).length >= 2 && input.value.split(' ').filter(elem => elem.length > 0).length <= 3) {
      input.classList.add('submit')
      input.classList.remove('error');
    }
  }
})