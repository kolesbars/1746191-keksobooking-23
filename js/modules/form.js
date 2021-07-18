import {setDefaultLatlng, setAdAddress} from './map.js';
import {sendData} from './server-data.js';
import {showErrorMessage} from './util.js';
import {avatarPreview} from './images.js';
import {resetFilterForm} from './filter.js';

const BUNGALOW_PRICE = '0';
const FLAT_PRICE = '1000';
const HOTEL_PRICE = '3000';
const HOUSE_PRICE = '5000';
const PALACE_PRICE = '10000';

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
    guests[2].selected = true;
  } else if (rooms[2].selected) { // выбрано 3 комнаты
    guests[0].removeAttribute('disabled');
    guests[1].removeAttribute('disabled');
    guests[2].removeAttribute('disabled');
    guests[3].setAttribute('disabled', '');
    guests[2].selected = true;
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

const adFormType = adForm.querySelector('#type');
const adFormPrice = adForm.querySelector('#price');

if (adFormType.value === 'flat') {
  adFormPrice.setAttribute('min', FLAT_PRICE);
  adFormPrice.setAttribute('placeholder', FLAT_PRICE);
}

adFormType.addEventListener('change', () => { // валидация поля цены
  if(adFormType.value === 'palace') {
    adFormPrice.setAttribute('min', PALACE_PRICE);
    adFormPrice.setAttribute('placeholder', PALACE_PRICE);
  } else if (adFormType.value === 'bungalow') {
    adFormPrice.setAttribute('min', BUNGALOW_PRICE);
    adFormPrice.setAttribute('placeholder', BUNGALOW_PRICE);
  } else if (adFormType.value === 'flat') {
    adFormPrice.setAttribute('min', FLAT_PRICE);
    adFormPrice.setAttribute('placeholder', FLAT_PRICE);
  } else if (adFormType.value === 'house') {
    adFormPrice.setAttribute('min', HOUSE_PRICE);
    adFormPrice.setAttribute('placeholder', HOUSE_PRICE);
  } else if (adFormType.value === 'hotel') {
    adFormPrice.setAttribute('min', HOTEL_PRICE);
    adFormPrice.setAttribute('placeholder', HOTEL_PRICE);
  }
});

const adFormTimeIn = adForm.querySelector('#timein');
const adFormTimeOut = adForm.querySelector('#timeout');

adFormTimeIn.addEventListener('change', () => { // синхронизация времени заезда и выезда
  adFormTimeOut.value = adFormTimeIn.value;
});
adFormTimeOut.addEventListener('change', () => {
  adFormTimeIn.value = adFormTimeOut.value;
});

const resetForm = () => { //приведение формы в исходное состоние
  adForm.reset();
  resetFilterForm();
  guests[2].selected = true;
  setDefaultLatlng();
  setAdAddress();
  adFormPrice.placeholder = FLAT_PRICE;
  adFormType.value = 'flat';
  const imagesPreview = document.querySelectorAll('#images-preview');
  if (imagesPreview) {
    for (let counter = 0; counter < imagesPreview.length; counter++){
      imagesPreview[counter].remove();
    }
  }
  avatarPreview.src = 'img/muffin-grey.svg';
};

const adFormReset = adForm.querySelector('.ad-form__reset');
adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

const submitForm = (onSuccess) => { //отправка формы
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    sendData(
      () => onSuccess(),
      () => showErrorMessage(),
      formData,
    );

  });
};

submitForm(resetForm);

export {makeActiveState, adForm};
