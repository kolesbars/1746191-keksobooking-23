function getRandomInteger (from, to) {
  if (from >= 0) {
    if (to <= from) {
      return 'Некорректный диапазон';
    }
    return Math.floor(Math.random() * (to + 1 - from) + from);
    // Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  }
  return 'Диапазон должен быть положительным';
};

getRandomInteger(1,10);

function getRandomFloat (from, to, point) {
  if (from >= 0) {
    if (to <= from) {
      return 'Некорректный диапазон';
    }
    let result =  Math.random() * (to - from) + from;
    // Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    return result.toFixed(point);
    // Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
  }
  return 'Диапазон должен быть положительным';
};

getRandomFloat(1,10,3);
