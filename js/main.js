import {createPicture, createPicturesArray, PICTURES_DATA} from './mocks';
import {fillFragment, renderBigPicture} from './pictures';
import {uploadFormCancelHandler, uploadFormOpenHandler} from './upload-form';

const PICTURES_AMOUNT = 25;
const BIG_PIC_INDEX = 1;
const ESCAPE_CODE = 27;
const MAX_COMMENTS_SHOWN = 5;

const picturesContainerElement = document.querySelector(`.pictures.container`);
const bigPictureElement = document.querySelector(`.big-picture`);

const uploadPictureFormElement = document.querySelector(`#upload-select-image`);
const uploadPictureInputElement = uploadPictureFormElement.querySelector(`#upload-file`);
const uploadPictureOverlayElement = uploadPictureFormElement.querySelector(`.img-upload__overlay`);

const pictureContentFragment = document.createDocumentFragment();

const pictureDataArray = createPicturesArray(PICTURES_AMOUNT, PICTURES_DATA);
picturesContainerElement.appendChild(fillFragment(pictureContentFragment, pictureDataArray));

// bigPictureElement.classList.remove(`hidden`);

renderBigPicture(bigPictureElement, createPicture(BIG_PIC_INDEX, PICTURES_DATA), MAX_COMMENTS_SHOWN);

uploadPictureInputElement.addEventListener(`change`, uploadFormOpenHandler);
document.addEventListener(`keydown`, (evt) => {
  if (evt.keyCode === ESCAPE_CODE && !uploadPictureOverlayElement.classList.contains(`hidden`)) {
    uploadFormCancelHandler();
  }
});

