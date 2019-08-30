const MAX_COMMENTS_SHOWN = 5;
let SHOW_COMMENTS_START_INDEX = 0;

const bigPictureElementTemplate = document.querySelector(`.big-picture`);
const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

const removeChildrenNodes = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const createExtraCommentNodes = (comments) => {
  const container = document.createElement(`div`);
  container.innerHTML = comments;
  return container.children;
};

const fillFragment = (fragment, dataArray, callback) => {
  if (callback === null) {
    dataArray.forEach((item) => {
      fragment.appendChild(item);
    });
  } else {
    dataArray.forEach((item) => {
      fragment.appendChild(callback(item));
    });
  }
  return fragment;
};

const renderComments = (comments, start) => {
  // @TO-DO в вёрстке что-то нигде нет имени комментатора
  return comments.slice(start, start + MAX_COMMENTS_SHOWN).map((comment) =>
    `<li class="social__comment">
      <img
        class="social__picture" src="${comment.avatar}"
        alt="Аватар комментатора фотографии"
        width="35"
        height="35"
      >
      <p class="social__text">${comment.message}</p>
    </li>`
  ).join(``);
};

const isAllCommentsShown = (shown, all) => shown >= all ? true : false;
const hideLoadCommentsBtn = (button, shown, all) => {
  if (isAllCommentsShown(shown, all)) {
    button.classList.add(`hidden`);
  }
};

const loadCommentsHadler = (button, comments, counter, data) => {
  const extraCommentsFragment = document.createDocumentFragment();
  const extraCommentNodes = Array.from(createExtraCommentNodes(renderComments(data.comments, SHOW_COMMENTS_START_INDEX)));

  comments.appendChild(fillFragment(extraCommentsFragment, extraCommentNodes, null));
  SHOW_COMMENTS_START_INDEX += MAX_COMMENTS_SHOWN;
  hideLoadCommentsBtn(button, SHOW_COMMENTS_START_INDEX, data.comments.length);

  counter.innerHTML = `
  ${SHOW_COMMENTS_START_INDEX <= data.comments.length ? SHOW_COMMENTS_START_INDEX : data.comments.length}
  из <span class="comments-count">${data.comments.length}</span> комментариев
  `.trim();
};

const renderBigPicture = (element, data, commentsLimit) => {
  const loadMoreCommentsBtnElement = element.querySelector(`.social__comments-loader`);
  const commentsCountElement = element.querySelector(`.social__comment-count`);
  const commentsElement = element.querySelector(`.social__comments`);
  hideLoadCommentsBtn(loadMoreCommentsBtnElement, SHOW_COMMENTS_START_INDEX, data.comments.length);

  element.querySelector(`.big-picture__img img`).src = data.url;
  element.querySelector(`.likes-count`).textContent = data.likes;
  commentsCountElement.innerHTML = `
    ${data.comments.length <= commentsLimit ? data.comments.length : commentsLimit}
    из <span class="comments-count">${data.comments.length}</span> комментариев
    `.trim();
  element.querySelector(`.social__caption`).textContent = data.description;

  commentsElement.innerHTML = renderComments(data.comments, SHOW_COMMENTS_START_INDEX);
  SHOW_COMMENTS_START_INDEX += MAX_COMMENTS_SHOWN;

  const bigPictureCancelBtnElement = element.querySelector(`.big-picture__cancel`);
  bigPictureCancelBtnElement.addEventListener(`click`, () => {
    element.classList.add(`hidden`);
  });

  loadMoreCommentsBtnElement.addEventListener(`click`, () => {
    loadCommentsHadler(loadMoreCommentsBtnElement, commentsElement, commentsCountElement, data);
  });

  return element;
};

const bigPictureRenderHandler = (data) => {
  const bigPictureElement = bigPictureElementTemplate.cloneNode(true);
  // removeChildrenNodes(bigPictureElementTemplate);
  console.log(bigPictureElement);
  if (bigPictureElement.classList.contains(`hidden`)) {
    bigPictureElement.classList.remove(`hidden`);
    renderBigPicture(bigPictureElement, data, MAX_COMMENTS_SHOWN);
  } else {
    removeChildrenNodes(bigPictureElementTemplate);
  }
  bigPictureElement.classList.remove(`hidden`);
  renderBigPicture(bigPictureElement, data, MAX_COMMENTS_SHOWN);
};

const createPictureNode = (data) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector(`.picture__img`).src = data.url;
  pictureElement.querySelector(`.picture__likes`).textContent = data.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = data.comments.length;

  pictureElement.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    bigPictureRenderHandler(data);
  });

  return pictureElement;
};

export {fillFragment, renderBigPicture, createPictureNode};
