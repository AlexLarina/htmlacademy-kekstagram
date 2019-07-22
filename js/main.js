import {createRandomFromRange} from './random';
import {createPicture, createPicturesArray, PICTURES_DATA} from './mocks';

const PICTURES_AMOUNT = 25;
const BIG_PIC_INDEX = 1;
const ESCAPE_CODE = 27;
const MAX_COMMENTS_SHOWN = 5;
const COMMENTS_AMOUNT = {
  MIN: 1,
  MAX: 6
};

const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
const picturesContainerElement = document.querySelector(`.pictures.container`);
const bigPictureElement = document.querySelector(`.big-picture`);


const uploadPictureFormElement = document.querySelector(`#upload-select-image`);
const uploadPictureInputElement = uploadPictureFormElement.querySelector(`#upload-file`);
const uploadPictureOverlayElement = uploadPictureFormElement.querySelector(`.img-upload__overlay`);

const uploadPictureElementCancelBtn = uploadPictureOverlayElement.querySelector(`#upload-cancel`);
const picturePreviewElement = uploadPictureOverlayElement.querySelector(`.img-upload__preview img`);

const effectLevelBarElement = uploadPictureOverlayElement.querySelector(`.img-upload__effect-level`);
const effectLevelPinElement = uploadPictureOverlayElement.querySelector(`.effect-level__pin`);

const effectsFieldsetElement = uploadPictureOverlayElement.querySelector(`.img-upload__effects`);

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

const uploadFormCancelHandler = () => {
  uploadPictureFormElement.reset();
  uploadPictureOverlayElement.classList.add(`hidden`);
};

const uploadFormOpenHandler = (evt) => {
  evt.preventDefault();
  uploadPictureOverlayElement.classList.remove(`hidden`);
};

const pictureDataArray = createPicturesArray(PICTURES_AMOUNT, PICTURES_DATA);
picturesContainerElement.appendChild(fillFragment(pictureContentFragment, pictureDataArray));

// bigPictureElement.classList.remove(`hidden`);

renderBigPicture(bigPictureElement, createPicture(BIG_PIC_INDEX, PICTURES_DATA));

uploadPictureInputElement.addEventListener(`change`, uploadFormOpenHandler);

uploadPictureElementCancelBtn.addEventListener(`click`, uploadFormCancelHandler);

document.addEventListener(`keydown`, (evt) => {
  if (evt.keyCode === ESCAPE_CODE && !uploadPictureOverlayElement.classList.contains(`hidden`)) {
    uploadFormCancelHandler();
  }
});

effectsFieldsetElement.addEventListener(`click`, (evt) => {
  let filter = evt.target.hasAttribute(`value`) ? evt.target.getAttribute(`value`) : null;
  filter === `none` ? effectLevelBarElement.classList.add(`visually-hidden`) : effectLevelBarElement.classList.remove(`visually-hidden`);
  picturePreviewElement.removeAttribute(`class`);
  picturePreviewElement.classList.add(`effects__preview--` + filter);
});
