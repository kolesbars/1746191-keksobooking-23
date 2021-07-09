
import {showAlert, isEscEvent} from './util.js';

const getData = (onSuccess) => fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json()) // получение данных с сервера
  .then((advertisements) => {
    onSuccess(advertisements);
  })
  .catch(() => {
    showAlert('При загрузке данных с сервера произошла ошибка!');
  });

const successfulSubmitTemplate = document.querySelector('#success').content;
const successfulSubmitMessage = successfulSubmitTemplate.querySelector('.success');
const errorSubmitTemplate = document.querySelector('#error').content;
const errorSubmitMessage = errorSubmitTemplate.querySelector('.error');
const errorButton = errorSubmitTemplate.querySelector('.error__button');
const bodyElement = document.querySelector('body');

const onMessageEscKeydown = (evt) => { //закрытие сообщений
  if (isEscEvent(evt)) {
    evt.preventDefault();
    successfulSubmitMessage.remove();
    errorSubmitMessage.remove();
  }
};

const sendData = (onSuccess, onError, body) => { //отпрвка данных на сервер
  fetch('https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        bodyElement.appendChild(successfulSubmitMessage);
        document.addEventListener('keydown', onMessageEscKeydown);
        window.addEventListener('click', () => {
          successfulSubmitMessage.remove();
        });
        onSuccess();
      } else {
        bodyElement.appendChild(errorSubmitMessage);
        document.addEventListener('keydown', onMessageEscKeydown);
        errorButton.addEventListener('click', () => {
          errorSubmitMessage.remove();
        });
        window.addEventListener('click', () => {
          errorSubmitMessage.remove();
        });
      }
    })
    .catch(() => {
      bodyElement.appendChild(errorSubmitMessage);
      document.addEventListener('keydown', onMessageEscKeydown);
      errorButton.addEventListener('click', () => {
        errorSubmitMessage.remove();
      });
      window.addEventListener('click', () => {
        errorSubmitMessage.remove();
      });
    });
};

export {getData, sendData};
