function getRandomPositiveFloat (first, second, digits = 1) {

  const lower = Math.min(Math.abs(first), Math.abs(second));
  const upper = Math.max(Math.abs(first), Math.abs(second));

  const result = Math.random() * (upper - lower) + lower;


  return result.toFixed(digits);
}

function getRandomPositiveInteger (first, second) {

  const lower = Math.ceil(Math.min(Math.abs(first), Math.abs(second)));
  const upper = Math.floor(Math.max(Math.abs(first), Math.abs(second)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

const TITLES = [
  'вариант', 'вариант получше' ,'лучший вариант' ,'топ за свои деньги' ,'лучше многих' ,'такого вы нигде не найдете',
];
const AD_TYPES = [
  'palace', 'flat', 'house', 'bungalow', 'hotel',
];
const CHECKIN_TIME = [
  '12:00', '13:00', '14:00',
];
const CHECKOUT_TIME = [
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
const avatarNumbers = [0];

const createAd = () => {

  let plug = getRandomPositiveInteger(1, 10);
  while (avatarNumbers.some((value) => value === plug)) {
    plug = getRandomPositiveInteger(1, 10);
  }
  avatarNumbers.push(plug);
  const lat = getRandomPositiveFloat (35.65, 35.7, 5);
  const lng = getRandomPositiveFloat (139.7, 139.8, 5);
  return {
    author: {
      avatar: `img/avatars/user0${  plug  }.png`, // как я понял, ошибка:  не 8 а 10 должно быть
    },
    location: {
      lat: lat,
      lng: lng,
    },
    offer: {
      title: TITLES[getRandomPositiveInteger(0, TITLES.length-1)],
      address: `${lat  }, ${  lng}`, // не совсем понял из ТЗ, что тут должно быть
      price: getRandomPositiveInteger(1, 100000),
      type: AD_TYPES[getRandomPositiveInteger(0, AD_TYPES.length-1)],
      rooms: getRandomPositiveInteger(1, 10),
      guests: getRandomPositiveInteger(1, 100),
      checkin: CHECKIN_TIME[getRandomPositiveInteger(0, CHECKIN_TIME.length-1)],
      checkout: CHECKOUT_TIME[getRandomPositiveInteger(0, CHECKOUT_TIME.length-1)],
      features: FEATURES.slice(0, getRandomPositiveInteger(0, FEATURES.length)),
      description: DESCRIPTIONS[getRandomPositiveInteger(0, DESCRIPTIONS.length-1)],
      photos: PHOTOS.slice(0, getRandomPositiveInteger(0, PHOTOS.length)),
    },

  };};

const ads = new Array(10).fill(null).map(() => createAd());

console.log(ads);
