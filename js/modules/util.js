const getRandomPositiveFloat = (first, second, digits = 1) => {

  const lower = Math.min(Math.abs(first), Math.abs(second));
  const upper = Math.max(Math.abs(first), Math.abs(second));

  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
};

const getRandomPositiveInteger = (first, second) => {

  const lower = Math.ceil(Math.min(Math.abs(first), Math.abs(second)));
  const upper = Math.floor(Math.max(Math.abs(first), Math.abs(second)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const fillWithFeatures = (featuresData, features, container) => {
  const resultFeaturesList = [];
  featuresData.forEach((feature) => {
    const foundFeature = features.find((item) => item.classList.contains(`popup__feature--${feature}`));
    if (foundFeature !== undefined) {
      resultFeaturesList.push(foundFeature);
    }
  });

  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }

  resultFeaturesList.forEach((element) => {
    container.appendChild(element);
  });
};

const fillWithPhotos = (photoTemplate, container, photoData) => {
  const photoQuantity = photoData.length;

  for (let counter = 0; counter < photoQuantity-1; counter++) {
    const clonedPhoto = photoTemplate.cloneNode(true);
    container.appendChild(clonedPhoto);
  }

  for (let counter = 0; counter < photoQuantity; counter++){
    container.children[counter].src = photoData[counter];
  }
};

export {getRandomPositiveFloat, getRandomPositiveInteger, fillWithFeatures, fillWithPhotos};
