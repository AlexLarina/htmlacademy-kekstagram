const MAX_HASHRAGS_NUMBER = 5;
const MAX_HASHTAG_LENGTH = 20;

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

const tagsInputHandler = (evt, input) => {
  let hashTags = evt.target.value;
  let error = validateHashTags(hashTags);
  if (error.length !== 0) {
    input.setCustomValidity(error);
  }
};

export {validateHashTags, tagsInputHandler};
