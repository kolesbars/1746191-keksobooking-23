import {getRandomPositiveFloat, getRandomPositiveInteger} from './util.js';

const TITLES = [
  'вариант', 'вариант получше' ,'лучший вариант' ,'топ за свои деньги' ,'лучше многих' ,'такого вы нигде не найдете',
];
const AD_TYPES = [
  'palace', 'flat', 'house', 'bungalow', 'hotel',
];
const TIMES = [
  '12:00', '13:00', '14:00',
];
const FEATURES = [
  'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const DESCRIPTIONS = [
  'Апарт-отель Stare Miasto находится в самом центре Старого города Кракова, всего в 120 метрах от Рыночной площади. К услугам гостей просторные современные апартаменты с бесплатным Wi-Fi.',
  'Комплекс апартаментов Bona Romantic SPA расположен в 1,5 км от торгового центра Galeria Krakowska. К услугам гостей бар, сад и номера с кондиционером, балконом и бесплатным Wi-Fi.',
  'Комплекс Feniks Fragola расположен в Кракове, в 30 метрах от Суконных рядов. К услугам гостей апартаменты с бесплатным Wi-Fi и кондиционером. До главной Рыночной площади — 10 метров.',
  'Апартаменты расположены в 400 м от центрального железнодорожного вокзала Кракова и торгового центра Galeria Krakowska.',
  'Апарт-отель Browar Lubicz Residence расположен в Кракове, Малопольском воеводстве, в 1,5 км от Мариацкого костела.',
  'К услугам гостей апарт-отеля Vanilla стильные, элегантные апартаменты с бесплатным Wi-Fi и проводным доступом в интернет. В числе стандартных удобств — телевизор со светодиодной подсветкой.',
];
const LAT_MIN_VALUE = 35.65;
const LAT_MAX_VALUE = 35.7;
const LNG_MIN_VALUE = 139.7;
const LNG_MAX_VALUE = 139.8;
const ADVERTISEMENTS_NUMBER =10;

const avatarNumbers = [0];
const getAvatarNumber = () => { // решил вынести отдельно, чтобы не засорять лишним createAd
  let avatarNumber = getRandomPositiveInteger(1, 10);
  while (avatarNumbers.some((value) => value === avatarNumber)) {
    avatarNumber = getRandomPositiveInteger(1, 10);
  }
  avatarNumbers.push(avatarNumber);
  if (avatarNumber < 10) {
    avatarNumber = `0${avatarNumber.toString()}`;
  }
  return avatarNumber;
};

const createAd = () => {
  const lat = getRandomPositiveFloat (LAT_MIN_VALUE, LAT_MAX_VALUE, 5);
  const lng = getRandomPositiveFloat (LNG_MIN_VALUE, LNG_MAX_VALUE, 5);
  return {
    author: {
      avatar: `img/avatars/user${getAvatarNumber()}.png`,
    },
    location: {
      lat: lat,
      lng: lng,
    },
    offer: {
      title: TITLES[getRandomPositiveInteger(0, TITLES.length-1)],
      address: `${lat}, ${lng}`,
      price: getRandomPositiveInteger(1, 100000),
      type: AD_TYPES[getRandomPositiveInteger(0, AD_TYPES.length-1)],
      rooms: getRandomPositiveInteger(1, 10),
      guests: getRandomPositiveInteger(1, 100),
      checkin: TIMES[getRandomPositiveInteger(0, TIMES.length-1)],
      checkout: TIMES[getRandomPositiveInteger(0, TIMES.length-1)],
      features: FEATURES.slice(0, getRandomPositiveInteger(0, FEATURES.length)),
      description: DESCRIPTIONS[getRandomPositiveInteger(0, DESCRIPTIONS.length-1)],
      photos: PHOTOS.slice(0, getRandomPositiveInteger(0, PHOTOS.length)),
    },
  };
};

const ads = new Array(ADVERTISEMENTS_NUMBER).fill(null).map(() => createAd());

export {ads};
