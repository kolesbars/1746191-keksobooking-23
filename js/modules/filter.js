import {fillSimilarAd} from './advertisement.js';
import {markerGroup} from './map.js';
import {getData} from './server-data.js';

const TIMEOUT_DELAY = 1000;
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const FILTER_DEFAULT_VALUE = 'any';
const ADS_QUANTITY = 10;

const filterForm = document.querySelector('.map__filters');
const typesSelect = filterForm.querySelector('#housing-type');
const roomsSelect = filterForm.querySelector('#housing-rooms');
const guestsSelect = filterForm.querySelector('#housing-guests');
const priceSelect = filterForm.querySelector('#housing-price');

const filterByRooms = (item) => {
  if (roomsSelect.value === FILTER_DEFAULT_VALUE) {
    return true;
  }
  return +roomsSelect.value === item.offer.rooms;
};
const filterByGuests = (item) => {
  if (guestsSelect.value === FILTER_DEFAULT_VALUE) {
    return true;
  }
  return +guestsSelect.value === item.offer.guests;
};
const filterByTypes = (item) => {
  if (typesSelect.value === FILTER_DEFAULT_VALUE)  {
    return true;
  }
  return typesSelect.value === item.offer.type;
};

const filterByPrice = (item) => {
  if (item.offer.price <= LOW_PRICE && priceSelect.value === 'low') {
    return true;
  }
  if (item.offer.price >= HIGH_PRICE && priceSelect.value === 'high') {
    return true;
  }
  if (item.offer.price >= LOW_PRICE && item.offer.price <= HIGH_PRICE && priceSelect.value === 'middle') {
    return true;
  }
  if(priceSelect.value === FILTER_DEFAULT_VALUE) {
    return true;
  }
};

const filterByFeatures = (item) => {
  const features = filterForm.querySelectorAll('.map__checkbox:checked');
  const filteredFeatures = Array.from(features);

  return filteredFeatures.every((checkedFeature) => {
    if (item.offer.features) {
      return item.offer.features.includes(checkedFeature.value);
    }
  });
};

const setFilterSimilarAds = (ads) => {
  filterForm.addEventListener('change', () => {
    markerGroup.clearLayers();
    const filteredAd = ads.filter((ad) => filterByRooms(ad) && filterByGuests(ad) && filterByTypes(ad) && filterByPrice(ad) && filterByFeatures(ad));
    setTimeout(() => fillSimilarAd(filteredAd), TIMEOUT_DELAY);
  });
};

const resetFilterForm = () => {
  filterForm.reset();
  getData((ads) => {
    fillSimilarAd(ads.slice(0, ADS_QUANTITY));
  });
};

export {setFilterSimilarAds, resetFilterForm, ADS_QUANTITY};
