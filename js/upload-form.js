const MAX_HASHRAGS_NUMBER = 5;
const MAX_HASHTAG_LENGTH = 20;

const SCALE_PERCENT = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

const uploadPictureFormElement = document.querySelector(`#upload-select-image`);
const uploadPictureOverlayElement = uploadPictureFormElement.querySelector(`.img-upload__overlay`);

const uploadPictureElementCancelBtn = uploadPictureOverlayElement.querySelector(`#upload-cancel`);
const effectsFieldsetElement = uploadPictureOverlayElement.querySelector(`.img-upload__effects`);
const picturePreviewElement = uploadPictureOverlayElement.querySelector(`.img-upload__preview img`);

const hashTagsInputElement = uploadPictureFormElement.querySelector(`.text__hashtags`);
const descriptionTextAreaElement = uploadPictureFormElement.querySelector(`.text__description`);

const effectLevelBarElement = uploadPictureOverlayElement.querySelector(`.img-upload__effect-level`);
const effectLevelPinElement = uploadPictureOverlayElement.querySelector(`.effect-level__pin`);

const scaleDecreaseButtonElement = uploadPictureOverlayElement.querySelector(`.scale__control--smaller`);
const scaleIncreaseButtonElement = uploadPictureOverlayElement.querySelector(`.scale__control--bigger`);
const scaleInputElement = uploadPictureOverlayElement.querySelector(`.scale__control--value`);

const rescalePictureHandler = function (direction) {
  let scale = parseInt(scaleInputElement.value, 10);

  switch (true) {
    case (direction === `decrease`):
      scale = (scale <= SCALE_PERCENT.MIN) ? SCALE_PERCENT.MIN : scale - SCALE_PERCENT.STEP;
      break;
    case (direction === `increase`):
      scale = (scale >= SCALE_PERCENT.MAX) ? SCALE_PERCENT.MAX : scale + SCALE_PERCENT.STEP;
      break;
    default:
      break;
  }
  scaleInputElement.value = `${scale}%`;
  picturePreviewElement.setAttribute(`style`, `transform: scale(${ scale / 100})`);
};

scaleDecreaseButtonElement.addEventListener(`click`, () => {
  rescalePictureHandler(`decrease`);
});

scaleIncreaseButtonElement.addEventListener(`click`, () => {
  rescalePictureHandler(`increase`);
});

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

const validateHashTags = (tagsString) => {
  const tagsArray = tagsString.trim().split(` `).map((tag) => tag.toLowerCase());

  let errorMessage = checkTagsAmount(tagsArray, MAX_HASHRAGS_NUMBER);
  errorMessage += tagsArray.every(isBeganWithLatticeSymbol) ? `` : `Каждый тэг должен начинаться с символа #\n `;
  errorMessage += tagsArray.every(isTagEmpty) ? `` : `Тэг не может быть пустым.\n `;
  errorMessage += tagsArray.every(isSpaceBetweenTags) ? `` : `Тэги должны разделяться пробелами!\n `;
  errorMessage += tagsArray.every(isTagTooLong) ? `Длина тэга не должна превышать ${MAX_HASHTAG_LENGTH}` : ``;
  errorMessage += checkUniqueTags(tagsArray);

  return errorMessage;
};

const isBeganWithLatticeSymbol = (tag) => tag[0] === `#`;
const isTagEmpty = (tag) => (tag.length > 1);
const isTagTooLong = (tag) => tag.length >= MAX_HASHTAG_LENGTH;

// @TO-DO rewrite method
const isSpaceBetweenTags = (tag) => tag.indexOf(`#`, 1) === -1;

const checkTagsAmount = (tags, maxAmount) => (tags.length <= maxAmount) ? `` : `Тегов не должно быть больше ${maxAmount}.\n`;

// @TO-DO rewrite to something more elegant
const checkUniqueTags = (tags) => {
  let error = ``;
  tags.filter((tag, index) => {
    error = tags.indexOf(tag) === index ? `` : `Тэги должны быть уникальными.\n`;
  });

  return error;
};

hashTagsInputElement.addEventListener(`change`, (evt) => {
  let hashTags = evt.target.value;
  let error = validateHashTags(hashTags);
  if (error.length !== 0) {
    hashTagsInputElement.setCustomValidity(error);
  }
});

uploadPictureFormElement.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  const formData = new FormData(uploadPictureFormElement);
  const hashTags = formData.get(`hashtags`);
  validateHashTags(hashTags);
});

export {uploadFormCancelHandler, uploadFormOpenHandler, hashTagsInputElement, descriptionTextAreaElement};
