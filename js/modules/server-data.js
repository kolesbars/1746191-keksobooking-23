import {showAlert, showSuccessfulMessage} from './util.js';

const getData = (onSuccess) => fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json()) // получение данных с сервера
  .then((advertisements) => {
    onSuccess(advertisements);
  })
  .catch(() => {
    showAlert('При загрузке данных с сервера произошла ошибка!');
  });

const sendData = (onSuccess, onError, body) => { //отпрвка данных на сервер
  fetch('https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        showSuccessfulMessage();
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export {getData, sendData};
