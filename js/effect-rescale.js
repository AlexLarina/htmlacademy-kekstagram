const SCALE_PERCENT = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

const rescalePictureHandler = function (picture, input, direction) {
  let scale = parseInt(input.value, 10);

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
  input.value = `${scale}%`;
  picture.setAttribute(`style`, `transform: scale(${ scale / 100})`);
};

export {rescalePictureHandler};
