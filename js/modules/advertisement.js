import { ads } from './data.js';
import { fillWithFeatures, fillWithPhotos} from './util.js';

const templateFragment = document.querySelector('#card').content;
const template = templateFragment.querySelector('.popup');
const similarAds = ads;
const getAdType = (type) => {
  switch (type) {
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
const fillSimilarAd = () => { //заполняет данными карточку похожего объявления
  const adsList = [];
  similarAds.forEach((element) => {
    const similarAd = template.cloneNode(true);
    const adTitle = similarAd.querySelector('.popup__title');
    if (element.offer.title === '') {
      adTitle.classList.add('hidden');
    }
    adTitle.textContent = element.offer.title; // заполняет заголовок

    const adAddres = similarAd.querySelector('.popup__text--address'); // заполняет адрес
    if (element.offer.address === '') {
      adAddres.classList.add('hidden');
    }
    adAddres.textContent = element.offer.address;

    const adPrice = similarAd.querySelector('.popup__text--price'); //заполняет цену
    if (element.offer.price === '') {
      adPrice.classList.add('hidden');
    }
    adPrice.textContent = `${element.offer.price} ₽/ночь`;

    const adType = similarAd.querySelector('.popup__type'); // заполняет тип помещения
    if (element.offer.type === '') {
      adType.classList.add('hidden');
    }
    adType.textContent = getAdType(element.offer.type);

    const adRoom = similarAd.querySelector('.popup__text--capacity'); // заполняет комнаты
    if (element.offer.rooms === '' || element.offer.guests === '') {
      adRoom.classList.add('hidden');
    }
    adRoom.textContent = `${element.offer.rooms} комнат для ${element.offer.guests} гостей`;

    const adTime = similarAd.querySelector('.popup__text--time'); // заполняет время
    if (element.offer.checkin === '' || element.offer.checkout === '') {
      adTime.classList.add('hidden');
    }
    adTime.textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;

    const adFeaturesList = similarAd.querySelector('.popup__features'); //заполняет удобства
    const adFeatures = adFeaturesList.querySelectorAll('.popup__feature');
    const adFeaturesArray = Array.from(adFeatures);
    if (element.offer.features.length === 0) {
      adFeaturesList.classList.add('hidden');
    }
    fillWithFeatures(element.offer.features, adFeaturesArray, adFeaturesList);

    const adDescription = similarAd.querySelector('.popup__description'); // заполняет описание
    if (element.offer.description === '') {
      adDescription.classList.add('hidden');
    }
    adDescription.textContent = element.offer.description;

    const adPhotosContainer = similarAd.querySelector('.popup__photos'); // заполняет фото
    const adPhoto = adPhotosContainer.querySelector('.popup__photo');
    if (element.offer.photos.length === 0) {
      adPhotosContainer.classList.add('hidden');
    }
    fillWithPhotos(adPhoto, adPhotosContainer, element.offer.photos);

    const adAvatar = similarAd.querySelector('.popup__avatar'); //заполняет аватарку
    if (element.author.avatar === '') {
      adAvatar.classList.add('hidden');
    }
    adAvatar.src = element.author.avatar;

    adsList.push(similarAd);
  });
  return adsList;
};

export { fillSimilarAd };
