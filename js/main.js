import {
  fillFragment,
  createPictureNode
} from './pictures';
import {
  uploadFormCancelHandler,
  uploadFormOpenHandler,
  hashTagsInputElement,
  descriptionTextAreaElement
} from './upload-form';

import {loadData} from './backend';

const ESCAPE_CODE = 27;

const picturesContainerElement = document.querySelector(`.pictures.container`);

const uploadPictureFormElement = document.querySelector(`#upload-select-image`);
const uploadPictureInputElement = uploadPictureFormElement.querySelector(`#upload-file`);
const uploadPictureOverlayElement = uploadPictureFormElement.querySelector(`.img-upload__overlay`);

const pictureContentFragment = document.createDocumentFragment();

const sussessLoad = (dataArray) => {
  picturesContainerElement.appendChild(fillFragment(pictureContentFragment, dataArray, createPictureNode));
};

const errorLoad = () => {};

loadData(`https://js.dump.academy/kekstagram/data`, sussessLoad, errorLoad);

uploadPictureInputElement.addEventListener(`change`, uploadFormOpenHandler);
document.addEventListener(`keydown`, (evt) => {
  if (evt.keyCode === ESCAPE_CODE && !uploadPictureOverlayElement.classList.contains(`hidden`) &&
      document.activeElement !== hashTagsInputElement && document.activeElement !== descriptionTextAreaElement) {
    uploadFormCancelHandler();
  }
});

