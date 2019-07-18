import {createRandomFromRange} from './random';
import {createPicture, createPicturesArray, PICTURES_DATA} from './mocks';

const PICTURES_AMOUNT = 25;
const BIG_PIC_INDEX = 1;
const MAX_COMMENTS_SHOWN = 5;
const COMMENTS_AMOUNT = {
  MIN: 1,
  MAX: 6
};

const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
const picturesContainerElement = document.querySelector(`.pictures.container`);
const bigPictureElement = document.querySelector(`.big-picture`);

const pictureContentFragment = document.createDocumentFragment();

const createPictureNode = (data) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector(`.picture__img`).src = data.url;
  pictureElement.querySelector(`.picture__likes`).textContent = data.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = data.comments.length;

  return pictureElement;
};

const createComments = (comments) => {
  return comments.map((comment) =>
    `<li class="social__comment">
      <img
        class="social__picture" src="img/avatar-${createRandomFromRange(COMMENTS_AMOUNT.MIN, COMMENTS_AMOUNT.MAX)}.svg"
        alt="Аватар комментатора фотографии"
        width="35"
        height="35"
      >
      <p class="social__text">${comment}</p>
    </li>`
  ).join(``);
};

const renderBigPicture = (element, data) => {
  element.querySelector(`.big-picture__img img`).src = data.url;
  element.querySelector(`.likes-count`).textContent = data.likes;
  element.querySelector(`.social__comment-count`).innerHTML = `
    ${data.comments.length <= MAX_COMMENTS_SHOWN ? data.comments.length : MAX_COMMENTS_SHOWN}
    из <span class="comments-count">${data.comments.length}</span> комментариев
    `.trim();
  element.querySelector(`.social__comments`).innerHTML = createComments(data.comments);
  element.querySelector(`.social__caption`).textContent = data.description;

  return element;
};

const fillFragment = (fragment, dataArray) => {
  dataArray.forEach((item) => {
    fragment.appendChild(createPictureNode(item));
  });

  return fragment;
};

const pictureDataArray = createPicturesArray(PICTURES_AMOUNT, PICTURES_DATA);
picturesContainerElement.appendChild(fillFragment(pictureContentFragment, pictureDataArray));

bigPictureElement.classList.remove(`hidden`);

renderBigPicture(bigPictureElement, createPicture(BIG_PIC_INDEX, PICTURES_DATA));

