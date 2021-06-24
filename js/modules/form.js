const adForm = document.querySelector('.ad-form');
const adFormInputs = adForm.querySelectorAll('input');
const adFormSelects = adForm.querySelectorAll('select');
const filtersForm = document.querySelector('.map__filters');
const filtersFormInputs = filtersForm.querySelectorAll('input');
const filtersFormSelects = filtersForm.querySelectorAll('select');


adForm.classList.add('ad-form--disabled'); // неактивное состояние страницы
filtersForm.classList.add('ad-form--disabled');
adFormInputs.forEach((element) => {
  element.setAttribute('disabled', '');
});
adFormSelects.forEach((element) => {
  element.setAttribute('disabled', '');
});
filtersFormInputs.forEach((element) => {
  element.setAttribute('disabled', '');
});
filtersFormSelects.forEach((element) => {
  element.setAttribute('disabled', '');
});


const makeActiveState = () => { // перевод страницы в активное состояние
  adForm.classList.remove('ad-form--disabled');
  filtersForm.classList.remove('ad-form--disabled');
  adFormInputs.forEach((element) => {
    element.removeAttribute('disabled', '');
  });
  adFormSelects.forEach((element) => {
    element.removeAttribute('disabled', '');
  });
  filtersFormInputs.forEach((element) => {
    element.removeAttribute('disabled', '');
  });
  filtersFormSelects.forEach((element) => {
    element.removeAttribute('disabled', '');
  });
};

makeActiveState();
