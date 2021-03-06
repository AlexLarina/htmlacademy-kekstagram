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

import {
  loadData
} from './backend';

import {
  showFilters,
  popularPicturesFiltrate,
  newPicturesFiltrate,
  discussedPicturesFiltrate,
  activateFilter
} from './filters';

import debounce from './debounce';
import uploadPreview from './upload-preview';

const ESCAPE_CODE = 27;
const NEW_AMOUNT = 11;

const picturesContainerElement = document.querySelector(`.pictures.container`);

const filtersContainerElement = document.querySelector(`.img-filters`);
const popularPicturesFilterElement = filtersContainerElement.querySelector(`#filter-popular`);
const newPicturesFilterElement = filtersContainerElement.querySelector(`#filter-new`);
const discussedPicturesFilterElement = filtersContainerElement.querySelector(`#filter-discussed`);

const uploadPictureFormElement = document.querySelector(`#upload-select-image`);
const uploadPictureInputElement = uploadPictureFormElement.querySelector(`#upload-file`);
const uploadPictureOverlayElement = uploadPictureFormElement.querySelector(`.img-upload__overlay`);

const pictureContentFragment = document.createDocumentFragment();

const removePictureNodes = (parentNode) => {
  const pictureNodesArray = parentNode.querySelectorAll(`a.picture`);
  pictureNodesArray.forEach((pictureNode) => {
    parentNode.removeChild(pictureNode);
  });
};

const renderPictures = (data) => {
  picturesContainerElement.appendChild(fillFragment(pictureContentFragment, data, createPictureNode));
};

const filtrateHandler = (filterElement, filtrate, dataArray, size = null) => {
  activateFilter(filterElement);
  removePictureNodes(picturesContainerElement);
  const filteredArray = filtrate(dataArray, size);
  renderPictures(filteredArray);
  debounce(renderPictures);
}

const sussessLoad = (dataArray) => {
  renderPictures(dataArray);
  showFilters(filtersContainerElement);

  popularPicturesFilterElement.addEventListener(`click`, () => {
    filtrateHandler(popularPicturesFilterElement, popularPicturesFiltrate, dataArray);
  });

  newPicturesFilterElement.addEventListener(`click`, () => {
    filtrateHandler(newPicturesFilterElement, newPicturesFiltrate, dataArray, NEW_AMOUNT)
  });

  discussedPicturesFilterElement.addEventListener(`click`, () => {
    filtrateHandler(discussedPicturesFilterElement, discussedPicturesFiltrate, dataArray);
  });
};

const errorLoad = () => {};

loadData(`https://js.dump.academy/kekstagram/data`, sussessLoad, errorLoad);

uploadPictureInputElement.addEventListener(`change`, (evt) => {
  uploadPreview(uploadPictureInputElement);
});

document.addEventListener(`keydown`, (evt) => {
  if (evt.keyCode === ESCAPE_CODE && !uploadPictureOverlayElement.classList.contains(`hidden`) &&
      document.activeElement !== hashTagsInputElement && document.activeElement !== descriptionTextAreaElement) {
    uploadFormCancelHandler();
  }
});

