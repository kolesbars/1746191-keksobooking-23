const ALERT_SHOW_TIME = 5000;

const fillWithFeatures = (featuresData, features, container) => {
  const resultFeaturesList = [];
  featuresData.forEach((feature) => {
    const foundFeature = features.find((item) => item.classList.contains(`popup__feature--${feature}`));
    if (foundFeature !== undefined) {
      resultFeaturesList.push(foundFeature);
    }
  });

  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }

  resultFeaturesList.forEach((element) => {
    container.appendChild(element);
  });
};

const fillWithPhotos = (photoTemplate, container, photoData) => {
  const photoQuantity = photoData.length;

  for (let counter = 0; counter < photoQuantity-1; counter++) {
    const clonedPhoto = photoTemplate.cloneNode(true);
    container.appendChild(clonedPhoto);
  }

  for (let counter = 0; counter < photoQuantity; counter++){
    container.children[counter].src = photoData[counter];
  }
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'black';
  alertContainer.style.color = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const successfulSubmitTemplate = document.querySelector('#success').content;
const successfulSubmitMessage = successfulSubmitTemplate.querySelector('.success');
const errorSubmitTemplate = document.querySelector('#error').content;
const errorSubmitMessage = errorSubmitTemplate.querySelector('.error');
const errorButton = errorSubmitTemplate.querySelector('.error__button');
const bodyElement = document.querySelector('body');

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const onMessageEscKeydown = (evt) => { //закрытие сообщений
  if (isEscEvent(evt)) {
    evt.preventDefault();
    successfulSubmitMessage.remove();
    errorSubmitMessage.remove();
  }
};
const  showSuccessfulMessage = () => {
  bodyElement.appendChild(successfulSubmitMessage);
  document.addEventListener('keydown', onMessageEscKeydown);
  window.addEventListener('click', () => {
    successfulSubmitMessage.remove();
  });
};

const showErrorMessage = () => {
  bodyElement.appendChild(errorSubmitMessage);
  document.addEventListener('keydown', onMessageEscKeydown);
  errorButton.addEventListener('click', () => {
    errorSubmitMessage.remove();
  });
  window.addEventListener('click', () => {
    errorSubmitMessage.remove();
  });
};

export {fillWithFeatures, fillWithPhotos, showAlert, isEscEvent, showSuccessfulMessage, showErrorMessage};
