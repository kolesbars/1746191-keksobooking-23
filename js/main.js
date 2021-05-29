const getRandomInteger = (from, to) => {
  if (from >= 0 && to > from) {
    return Math.floor(Math.random() * (to + 1 - from) + from);
    // Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  }
  return 'Некорректный диапазон';
}

getRandomInteger(1,10);

const getRandomFloat = (from, to, point) => {
  if (from >= 0 && to > from) {
    return (Math.random() * (to - from) + from).toFixed(point);
    /* Источники: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random;
    https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed */
  }
  return 'Некорректный диапазон';
}

getRandomFloat(1,10,3);
