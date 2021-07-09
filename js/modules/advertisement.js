import { fillWithFeatures, fillWithPhotos} from './util.js';
import {map} from './map.js';

const templateFragment = document.querySelector('#card').content;
const template = templateFragment.querySelector('.popup');
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
const fillSimilarAd = (similarAds) => { //заполняет данными карточку похожего объявления
  const adsList = [];
  similarAds.forEach((element) => {
    const similarAd = template.cloneNode(true);
    const adTitle = similarAd.querySelector('.popup__title');
    adTitle.textContent = element.offer.title; // заполняет заголовок

    const adAddres = similarAd.querySelector('.popup__text--address'); // заполняет адрес
    adAddres.textContent = element.offer.address;

    const adPrice = similarAd.querySelector('.popup__text--price'); //заполняет цену
    adPrice.textContent = `${element.offer.price} ₽/ночь`;

    const adType = similarAd.querySelector('.popup__type'); // заполняет тип помещения
    adType.textContent = getAdType(element.offer.type);

    const adRoom = similarAd.querySelector('.popup__text--capacity'); // заполняет комнаты
    adRoom.textContent = `${element.offer.rooms} комнат для ${element.offer.guests} гостей`;

    const adTime = similarAd.querySelector('.popup__text--time'); // заполняет время
    adTime.textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;

    const adFeaturesList = similarAd.querySelector('.popup__features'); //заполняет удобства
    const adFeatures = adFeaturesList.querySelectorAll('.popup__feature');
    const adFeaturesArray = Array.from(adFeatures);
    if (element.offer.features === undefined) {
      adFeaturesList.classList.add('hidden');
    } else {
      fillWithFeatures(element.offer.features, adFeaturesArray, adFeaturesList);
    }
    const adDescription = similarAd.querySelector('.popup__description'); // заполняет описание
    adDescription.textContent = element.offer.description;

    const adPhotosContainer = similarAd.querySelector('.popup__photos'); // заполняет фото
    const adPhoto = adPhotosContainer.querySelector('.popup__photo');
    if (element.offer.photos === undefined) {
      adPhotosContainer.classList.add('hidden');
    } else {
      fillWithPhotos(adPhoto, adPhotosContainer, element.offer.photos);
    }
    const adAvatar = similarAd.querySelector('.popup__avatar'); //заполняет аватарку
    adAvatar.src = element.author.avatar;

    if (element.offer.title === undefined) {
      adTitle.classList.add('hidden');
    }
    if (element.offer.address === undefined) {
      adAddres.classList.add('hidden');
    }
    if (element.offer.price === undefined) {
      adPrice.classList.add('hidden');
    }
    if (element.offer.type === undefined) {
      adType.classList.add('hidden');
    }
    if (element.offer.rooms === undefined || typeof element.offer.guests === undefined) {
      adRoom.classList.add('hidden');
    }
    if (element.offer.checkin === undefined || typeof element.offer.checkout === undefined) {
      adTime.classList.add('hidden');
    }
    if (element.offer.description === undefined) {
      adDescription.classList.add('hidden');
    }
    if (element.author.avatar === undefined) {
      adAvatar.classList.add('hidden');
    }

    const lat = element.location.lat;
    const lng = element.location.lng;

    const icon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const normalMarker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );
    normalMarker
      .addTo(map)
      .bindPopup(similarAd);

    adsList.push(similarAd);
  });
  return adsList;
};

export {fillSimilarAd};
