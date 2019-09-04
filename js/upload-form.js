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
import {uploadData} from './backend';

const UPLOAD_URL = `https://js.dump.academy/kekstagram.`;

const successUploadMsgTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const errorUploadMsgTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

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

const successUploadMsgRender = () => {
  const successUploadMsgElement = successUploadMsgTemplate.cloneNode(true);
  document.body.insertAdjacentElement(`afterbegin`, successUploadMsgElement);

  const successUploadMsgCloseBtnElement = successUploadMsgElement.querySelector(`.success__button`);
  successUploadMsgCloseBtnElement.addEventListener(`click`, () => {
    successUploadMsgElement.remove();
  });
};

const errorUploadMsgRender = () => {
  const errorUploadMsgElement = errorUploadMsgTemplate.cloneNode(true);
  document.body.insertAdjacentElement(`afterbegin`, errorUploadMsgElement);

  // @TO-DO хорошо бы повесить два разных обработчика на эти кнопки
  const errorUploadMsgRetryBtnElement = errorUploadMsgElement.querySelector(`.error__button--retry`);

  errorUploadMsgRetryBtnElement.addEventListener(`click`, () => {
    // @TO-DO
  });

  const errorUploadMsgResetBtnElement = errorUploadMsgElement.querySelector(`.error__button--reset`);
  errorUploadMsgResetBtnElement.addEventListener(`click`, (evt) => {
    uploadFormOpenHandler(evt);
    errorUploadMsgElement.remove();
  });
};

const sussessUploadDataHandler = () => {
  uploadFormCancelHandler();
  successUploadMsgRender();
  console.log(`Данные формы отправлены успешно`);
};

const errorUploadDataHandler = (status, text) => {
  uploadFormCancelHandler();
  errorUploadMsgRender();
  console.log('Something went wrong');
};

uploadPictureFormElement.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  const formData = new FormData(uploadPictureFormElement);
  const hashTags = formData.get(`hashtags`);
  validateHashTags(hashTags);
  uploadData(UPLOAD_URL, formData, sussessUploadDataHandler, errorUploadDataHandler);
});

effectLevelPinElement.addEventListener(`mousedown`, (evt) => {
  effectLevelHandler(evt, effectLevelLineElement, effectLevelPinElement, effectLevelDepthElement, picturePreviewElement);
});

uploadPictureElementCancelBtn.addEventListener(`click`, uploadFormCancelHandler);

export {uploadFormCancelHandler, uploadFormOpenHandler, hashTagsInputElement, descriptionTextAreaElement};
