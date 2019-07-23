import {createRandomFromRange} from './random';

const COMMENTS_AMOUNT = {
  MIN: 1,
  MAX: 6
};

const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

const createPictureNode = (data) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector(`.picture__img`).src = data.url;
  pictureElement.querySelector(`.picture__likes`).textContent = data.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = data.comments.length;

  return pictureElement;
};

const fillFragment = (fragment, dataArray) => {
  dataArray.forEach((item) => {
    fragment.appendChild(createPictureNode(item));
  });

  return fragment;
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

const renderBigPicture = (element, data, commentsLimit) => {
  element.querySelector(`.big-picture__img img`).src = data.url;
  element.querySelector(`.likes-count`).textContent = data.likes;
  element.querySelector(`.social__comment-count`).innerHTML = `
    ${data.comments.length <= commentsLimit ? data.comments.length : commentsLimit}
    из <span class="comments-count">${data.comments.length}</span> комментариев
    `.trim();
  element.querySelector(`.social__comments`).innerHTML = createComments(data.comments);
  element.querySelector(`.social__caption`).textContent = data.description;

  return element;
};

export {fillFragment, renderBigPicture};
