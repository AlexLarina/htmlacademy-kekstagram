import {createRandomFromRange, chooseRandomArrayItems, getRandomArrayItem} from './random';

const PICTURES_DATA = {
  comments: [
    `Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
  ],
  description: [
    `Тестим новую камеру!`,
    `Затусили с друзьями на море`,
    `Как же круто тут кормят`,
    `Отдыхаем...`,
    `Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......`,
    `Вот это тачка!`
  ],
  likes: {
    MIN: 15,
    MAX: 200
  }
};

const createPicture = (index, data) => {
  return {
    url: `photos/${index}.jpg`,
    likes: createRandomFromRange(data.likes.MIN, data.likes.MAX),
    comments: chooseRandomArrayItems(data.comments, createRandomFromRange(0, data.comments.length - 1)),
    description: getRandomArrayItem(data.description)
  };
};

const createPicturesArray = (limit, data) => {
  return [...(new Array(limit)).keys()].map((key) => createPicture(key + 1, data));
};

export {PICTURES_DATA, createPicture, createPicturesArray};
