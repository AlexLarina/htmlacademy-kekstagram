const createRandomFromRange = (min, max) => Math.round(Math.random() * (max - min) + min);
const getRandomArrayItem = (array) => array[createRandomFromRange(0, array.length - 1)];
const chooseRandomArrayItems = (array, size) => (
  array
      .sort(() => Math.random() - 0.5)
      .slice(0, size)
);

export {createRandomFromRange, getRandomArrayItem, chooseRandomArrayItems};

