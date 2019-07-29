const chooseFilterHandler = (evt, picture, levelBar) => {
  let filter = evt.target.hasAttribute(`value`) ? evt.target.getAttribute(`value`) : null;
  if (filter === `none`) {
    levelBar.classList.add(`visually-hidden`);
  } else {
    levelBar.classList.remove(`visually-hidden`);
  }
  picture.removeAttribute(`class`);
  picture.classList.add(`effects__preview--` + filter);
};


const changeFilterIntensity = (picture, filter, intensity) => {
  switch (filter) {
    case `none`:
      return;
    case `chrome`:
      picture.setAttribute(`style`, `filter: grayscale(${intensity / 100})`);
      break;
    case `sepia`:
      picture.setAttribute(`style`, `filter: sepia(${intensity / 100})`);
      break;
    case `marvin`:
      picture.setAttribute(`style`, `filter: invert(${intensity})`);
      break;
    case `phobos`:
      picture.setAttribute(`style`, `filter: blur(${intensity * 3 / 100}px);`);
      break;
    case `heat`:
      picture.setAttribute(`style`, `filter: brightness(${intensity * (3 - 1) / 100})`);
      break;
  }
};

const resetFilters = (picture, pin, depth) => {
  picture.removeAttribute(`style`);
  pin.setAttribute(`style`, `left:100%;`);
  depth.setAttribute(`style`, `width: 100%;`);
};

const effectLevelHandler = (evt, line, pin, depth, picture) => {
  evt.preventDefault();
  const lineWidth = line.offsetWidth;
  const pinLeftOffset = pin.offsetLeft;
  let startCoordX = evt.clientX;

  const mouseMoveHandler = (moveEvt) => {
    moveEvt.preventDefault();

    let shift = moveEvt.clientX - startCoordX;
    let pinLeftProperty = (pinLeftOffset + shift) * 100 / lineWidth;
    pinLeftProperty = (pinLeftProperty < 0) ? 0 : pinLeftProperty;
    pinLeftProperty = (pinLeftProperty > 100) ? 100 : pinLeftProperty;

    pin.style.left = pinLeftProperty + `%`;
    depth.style.width = pinLeftProperty + `%`;

    let filterClass = picture.classList.item(0).split(`--`)[1];
    changeFilterIntensity(picture, filterClass, pinLeftProperty);
  };

  const mouseUpHandler = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, mouseMoveHandler);
    document.removeEventListener(`mouseup`, mouseUpHandler);
  };

  document.addEventListener(`mousemove`, mouseMoveHandler);
  document.addEventListener(`mouseup`, mouseUpHandler);
};

export {effectLevelHandler, resetFilters, chooseFilterHandler};
