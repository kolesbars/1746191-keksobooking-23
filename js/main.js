import './modules/map.js';
import {getData} from './modules/server-data.js';
import {fillSimilarAd} from './modules/advertisement.js';

getData((adss) => {
  fillSimilarAd(adss);
});
