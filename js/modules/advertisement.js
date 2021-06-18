import {ads} from './data.js';

const templateFragment = document.querySelector('#card').content;
const template = templateFragment.querySelector('.popup');
const mapContainer = document.querySelector('.map__canvas');
const similarAds = ads;
const getAdType = (type) => {switch (type) {
  case 'palace':
    return 'Дворец';
  case 'bungalow':
    return 'Бунгало';
  case 'flat':
    return 'Квартира';
  case 'house':
    return 'Дом';
  case 'hotel':
    return 'Отель';
  default:
    return 'Другое';
}
};
/* на фичак я забуксовал на 2 дня!! сломал всю голову, ничего лучше чем это родить не смог)
насколько вообще оптимально хранить в шаблоне все элементы списка сразу? не лучше ли иметь 1 и просто их отрисовывать стольок скольок нужно?*/
const getFeatures = (featuresData, features, container, collect) => {
  const resultFeaturesList = [];
  featuresData.forEach((feature) => {
    const foundFeature = features.find((item) => item.classList.contains(`popup__feature--${feature}`));
    if (foundFeature !== undefined) {
      resultFeaturesList.push(foundFeature);
    }
  });
  collect.forEach((element) =>
    element.remove(),
  );
  resultFeaturesList.forEach((element) => {
    container.appendChild(element);
  });
};

const getPhotos = (photo, container, photoData) => {
  const photoQuantity = photoData.length;
  for (let i =0; i < photoQuantity-1; i++) {
    const clonedPhoto = photo.cloneNode(true);
    container.appendChild(clonedPhoto);
  }
  for (let j=0; j <photoQuantity; j++){
    container.children[j].src = photoData[j];
  }
};

const similarAdsList = [];
similarAds.forEach((element) => {
  const similarAd = template.cloneNode(true); // заполняет заголовок
  const similarAdTitle = similarAd.querySelector('.popup__title');
  element.offer.title !== '' ? similarAdTitle.textContent = element.offer.title :
    similarAdTitle.classList.add('hidden');


  const similarAdAddres = similarAd.querySelector('.popup__text--address'); // заполняет адрес
  element.offer.address !== '' ? similarAdAddres.textContent = element.offer.address :     similarAdAddres.classList.add('hidden');

  const similarAdPrice = similarAd.querySelector('.popup__text--price'); //заполняет цену
  element.offer.price !== '' ? similarAdPrice.textContent = `${element.offer.price} ₽/ночь`: similarAdPrice.classList.add('hidden');

  const similarAdType = similarAd.querySelector('.popup__type'); // заполняет тип помещения
  element.offer.type !== '' ? similarAdType.textContent = getAdType(element.offer.type): similarAdType.classList.add('hidden');

  const similarAdRoom =similarAd.querySelector('.popup__text--capacity'); // заполняет комнаты
  (element.offer.rooms === '' || element.offer.guests) === '' ? similarAdRoom.classList.add('hidden') : similarAdRoom.textContent = `${element.offer.rooms} комнат для ${element.offer.guests} гостей`;

  const similarAdTime = similarAd.querySelector('.popup__text--time'); // заполняет время
  (element.offer.checkin === '' || element.offer.checkout === '') ? similarAdTime.classList.add('hidden') : similarAdTime.textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;

  const similarAdFeaturesList = similarAd.querySelector('.popup__features'); //заполняет удобства
  const similarAdFeatures = similarAdFeaturesList.querySelectorAll('.popup__feature');
  const similarAdFeaturesArray = Array.from(similarAdFeatures);
  if (element.offer.features.length === 0) {similarAdFeaturesList.classList.add('hidden');}
  getFeatures(element.offer.features, similarAdFeaturesArray, similarAdFeaturesList, similarAdFeatures );

  const similarAdDescription = similarAd.querySelector('.popup__description'); // заполняет описание
  element.offer.description !== '' ? similarAdDescription.textContent = element.offer.description : similarAdDescription.classList.add('hidden');

  const similarAdPhotosContainer = similarAd.querySelector('.popup__photos'); // заполняет фото
  const similarAdPhoto = similarAdPhotosContainer.querySelector('.popup__photo');
  if (element.offer.photos.length === 0) {similarAdPhotosContainer.classList.add('hidden');}
  getPhotos(similarAdPhoto, similarAdPhotosContainer, element.offer.photos );

  const similarAdAvatar = similarAd.querySelector('.popup__avatar'); //заполняет аватарку
  element.author.avatar !== '' ? similarAdAvatar.src = element.author.avatar : similarAdAvatar.classList.add('hidden');

  similarAdsList.push(similarAd);

});


mapContainer.appendChild(similarAdsList[5]);
