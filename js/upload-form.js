const uploadPictureFormElement = document.querySelector(`#upload-select-image`);
const uploadPictureOverlayElement = uploadPictureFormElement.querySelector(`.img-upload__overlay`);

const uploadPictureElementCancelBtn = uploadPictureOverlayElement.querySelector(`#upload-cancel`);
const effectsFieldsetElement = uploadPictureOverlayElement.querySelector(`.img-upload__effects`);
const picturePreviewElement = uploadPictureOverlayElement.querySelector(`.img-upload__preview img`);

const effectLevelBarElement = uploadPictureOverlayElement.querySelector(`.img-upload__effect-level`);
const effectLevelPinElement = uploadPictureOverlayElement.querySelector(`.effect-level__pin`);

const uploadFormCancelHandler = () => {
  uploadPictureFormElement.reset();
  uploadPictureOverlayElement.classList.add(`hidden`);
};

const uploadFormOpenHandler = (evt) => {
  evt.preventDefault();
  uploadPictureOverlayElement.classList.remove(`hidden`);
};

effectsFieldsetElement.addEventListener(`click`, (evt) => {
  let filter = evt.target.hasAttribute(`value`) ? evt.target.getAttribute(`value`) : null;
  filter === `none` ? effectLevelBarElement.classList.add(`visually-hidden`) : effectLevelBarElement.classList.remove(`visually-hidden`);
  picturePreviewElement.removeAttribute(`class`);
  picturePreviewElement.classList.add(`effects__preview--` + filter);
});

uploadPictureElementCancelBtn.addEventListener(`click`, uploadFormCancelHandler);

export {uploadFormCancelHandler, uploadFormOpenHandler};
