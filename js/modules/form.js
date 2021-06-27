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
    element.removeAttribute('disabled');
  });
  adFormSelects.forEach((element) => {
    element.removeAttribute('disabled');
  });
  filtersFormInputs.forEach((element) => {
    element.removeAttribute('disabled');
  });
  filtersFormSelects.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

const adFormRoomsNumber = adForm.querySelector('#room_number');
const adFormGuestsNumber = adForm.querySelector('#capacity');
const rooms = adFormRoomsNumber.options;
const guests = adFormGuestsNumber.options;

if (rooms[0].selected) {
  guests[0].setAttribute('disabled', '');
  guests[1].setAttribute('disabled', '');
  guests[3].setAttribute('disabled', '');
  guests[2].selected = true;
}

adFormRoomsNumber.addEventListener('change', () => { //валидация полей комнаты-гости
  if (rooms[1].selected) { // выбрано 2 комнаты
    guests[1].removeAttribute('disabled');
    guests[2].removeAttribute('disabled');
    guests[0].setAttribute('disabled', '');
    guests[3].setAttribute('disabled', '');
    guests[1].selected = true;
  } else if (rooms[2].selected) { // выбрано 3 комнаты
    guests[0].removeAttribute('disabled');
    guests[1].removeAttribute('disabled');
    guests[2].removeAttribute('disabled');
    guests[3].setAttribute('disabled', '');
    guests[0].selected = true;
  } else if (rooms[3].selected) { // выбрано 100 комнат
    guests[3].removeAttribute('disabled');
    guests[0].setAttribute('disabled', '');
    guests[1].setAttribute('disabled', '');
    guests[2].setAttribute('disabled', '');
    guests[3].selected = true;
  } else if (rooms[0].selected) { // выбрана 1 комната
    guests[0].setAttribute('disabled', '');
    guests[1].setAttribute('disabled', '');
    guests[3].setAttribute('disabled', '');
    guests[2].removeAttribute('disabled');
    guests[2].selected = true;
  }
});

export {makeActiveState, adForm};
