import {
  rescalePictureHandler
} from './effect-rescale';
import {
  validateHashTags,
  tagsInputHandler
} from './validation';
import {
  effectLevelHandler,
  resetFilters,
  chooseFilterHandler
} from './effect-filter';

const uploadPictureFormElement = document.querySelector(`#upload-select-image`);
const uploadPictureOverlayElement = uploadPictureFormElement.querySelector(`.img-upload__overlay`);

const uploadPictureElementCancelBtn = uploadPictureOverlayElement.querySelector(`#upload-cancel`);
const effectsFieldsetElement = uploadPictureOverlayElement.querySelector(`.img-upload__effects`);
const picturePreviewElement = uploadPictureOverlayElement.querySelector(`.img-upload__preview img`);

const hashTagsInputElement = uploadPictureFormElement.querySelector(`.text__hashtags`);
const descriptionTextAreaElement = uploadPictureFormElement.querySelector(`.text__description`);

const effectLevelBarElement = uploadPictureOverlayElement.querySelector(`.img-upload__effect-level`);

const effectLevelPinElement = uploadPictureOverlayElement.querySelector(`.effect-level__pin`);
const effectLevelLineElement = uploadPictureOverlayElement.querySelector(`.effect-level__line`);
const effectLevelDepthElement = uploadPictureOverlayElement.querySelector(`.effect-level__depth`);

const scaleDecreaseButtonElement = uploadPictureOverlayElement.querySelector(`.scale__control--smaller`);
const scaleIncreaseButtonElement = uploadPictureOverlayElement.querySelector(`.scale__control--bigger`);
const scaleInputElement = uploadPictureOverlayElement.querySelector(`.scale__control--value`);

const uploadFormCancelHandler = () => {
  uploadPictureFormElement.reset();
  uploadPictureOverlayElement.classList.add(`hidden`);
};

const uploadFormOpenHandler = (evt) => {
  evt.preventDefault();
  uploadPictureOverlayElement.classList.remove(`hidden`);
};

scaleDecreaseButtonElement.addEventListener(`click`, () => {
  rescalePictureHandler(picturePreviewElement, scaleInputElement, `decrease`);
});

scaleIncreaseButtonElement.addEventListener(`click`, () => {
  rescalePictureHandler(picturePreviewElement, scaleInputElement, `increase`);
});

effectsFieldsetElement.addEventListener(`click`, (evt) => {
  resetFilters(picturePreviewElement, effectLevelPinElement, effectLevelDepthElement);
  chooseFilterHandler(evt, picturePreviewElement, effectLevelBarElement);
});

hashTagsInputElement.addEventListener(`change`, (evt) => {
  tagsInputHandler(evt, hashTagsInputElement);
});

uploadPictureFormElement.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  const formData = new FormData(uploadPictureFormElement);
  const hashTags = formData.get(`hashtags`);
  validateHashTags(hashTags);
});

effectLevelPinElement.addEventListener(`mousedown`, (evt) => {
  effectLevelHandler(evt, effectLevelLineElement, effectLevelPinElement, effectLevelDepthElement, picturePreviewElement);
});

uploadPictureElementCancelBtn.addEventListener(`click`, uploadFormCancelHandler);

export {uploadFormCancelHandler, uploadFormOpenHandler, hashTagsInputElement, descriptionTextAreaElement};
