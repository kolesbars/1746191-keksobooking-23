import './modules/map.js';
import './modules/filter.js';
import {getData} from './modules/server-data.js';
import {fillSimilarAd} from './modules/advertisement.js';
import {setfilterSimilarAds, ADS_QUANTITY} from './modules/filter.js';
import './modules/images.js';

getData((ads) => {
  fillSimilarAd(ads.slice(0, ADS_QUANTITY));
  setfilterSimilarAds(ads.slice(0, ADS_QUANTITY));
});

