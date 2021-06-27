import { makeActiveState, adForm } from './form.js';
import { fillSimilarAd } from './advertisement.js';

const DEFAULT_LAT = 35.6895000;
const DEFAULT_LNG = 139.6917100;
const SCALE = 10;

const map = L.map('map-canvas')
  .on('load', () => {
    makeActiveState();
  })
  .setView({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  }, SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26,52],
});

const mainMarker = L.marker(
  {
    lat:DEFAULT_LAT,
    lng:DEFAULT_LNG,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
).addTo(map);

const defaultLatLng = mainMarker.getLatLng();

const adAddress = adForm.querySelector('#address'); //заполняет адресс в форме передвижением главной метки
adAddress.value = `${defaultLatLng.lat.toFixed(5)}, ${defaultLatLng.lng.toFixed(5)}`;
mainMarker.on('moveend', (evt) => {
  const address = evt.target.getLatLng();
  adAddress.value = `${address.lat.toFixed(5)}, ${address.lng.toFixed(5)}`;
});

const createMarker = (latitude, longitude, ad) => { //создает обычную метку
  const lat = latitude;
  const lng = longitude;

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
    .bindPopup(ad);
};


const similarAds = fillSimilarAd();
similarAds.forEach((ad) => {
  const similarAdChildren = ad.children;
  const adLat = similarAdChildren[2].textContent.slice(0, 8);
  const adLng = similarAdChildren[2].textContent.slice(10,19);
  createMarker(adLat, adLng, ad);
});
