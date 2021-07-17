import './modules/map.js';
import './modules/filter.js';
import {getData} from './modules/server-data.js';
import {fillSimilarAd} from './modules/advertisement.js';
import {setfilterSimilarAds} from './modules/filter.js';

const ADS_QUANTITY = 10;

getData((ads) => {
  fillSimilarAd(ads.slice(0, ADS_QUANTITY));
  setfilterSimilarAds(ads.slice(0, ADS_QUANTITY));
});

