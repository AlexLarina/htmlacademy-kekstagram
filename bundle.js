/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./random */ "./js/random.js");
/* harmony import */ var _mocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mocks */ "./js/mocks.js");


const PICTURES_AMOUNT = 25;
const BIG_PIC_INDEX = 1;
const MAX_COMMENTS_SHOWN = 5;
const COMMENTS_AMOUNT = {
  MIN: 1,
  MAX: 6
};
const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
const picturesContainerElement = document.querySelector(`.pictures.container`);
const bigPictureElement = document.querySelector(`.big-picture`);
const pictureContentFragment = document.createDocumentFragment();

const createPictureNode = data => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector(`.picture__img`).src = data.url;
  pictureElement.querySelector(`.picture__likes`).textContent = data.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = data.comments.length;
  return pictureElement;
};

const createComments = comments => {
  return comments.map(comment => `<li class="social__comment">
      <img
        class="social__picture" src="img/avatar-${Object(_random__WEBPACK_IMPORTED_MODULE_0__["createRandomFromRange"])(COMMENTS_AMOUNT.MIN, COMMENTS_AMOUNT.MAX)}.svg"
        alt="Аватар комментатора фотографии"
        width="35"
        height="35"
      >
      <p class="social__text">${comment}</p>
    </li>`).join(``);
};

const renderBigPicture = (element, data) => {
  element.querySelector(`.big-picture__img img`).src = data.url;
  element.querySelector(`.likes-count`).textContent = data.likes;
  element.querySelector(`.social__comment-count`).innerHTML = `
    ${data.comments.length <= MAX_COMMENTS_SHOWN ? data.comments.length : MAX_COMMENTS_SHOWN}
    из <span class="comments-count">${data.comments.length}</span> комментариев
    `.trim();
  element.querySelector(`.social__comments`).innerHTML = createComments(data.comments);
  element.querySelector(`.social__caption`).textContent = data.description;
  return element;
};

const fillFragment = (fragment, dataArray) => {
  dataArray.forEach(item => {
    fragment.appendChild(createPictureNode(item));
  });
  return fragment;
};

const pictureDataArray = Object(_mocks__WEBPACK_IMPORTED_MODULE_1__["createPicturesArray"])(PICTURES_AMOUNT, _mocks__WEBPACK_IMPORTED_MODULE_1__["PICTURES_DATA"]);
picturesContainerElement.appendChild(fillFragment(pictureContentFragment, pictureDataArray));
bigPictureElement.classList.remove(`hidden`);
renderBigPicture(bigPictureElement, Object(_mocks__WEBPACK_IMPORTED_MODULE_1__["createPicture"])(BIG_PIC_INDEX, _mocks__WEBPACK_IMPORTED_MODULE_1__["PICTURES_DATA"]));

/***/ }),

/***/ "./js/mocks.js":
/*!*********************!*\
  !*** ./js/mocks.js ***!
  \*********************/
/*! exports provided: PICTURES_DATA, createPicture, createPicturesArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PICTURES_DATA", function() { return PICTURES_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPicture", function() { return createPicture; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPicturesArray", function() { return createPicturesArray; });
/* harmony import */ var _random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./random */ "./js/random.js");

const PICTURES_DATA = {
  comments: [`Всё отлично!`, `В целом всё неплохо. Но не всё.`, `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`, `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`, `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`, `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`],
  description: [`Тестим новую камеру!`, `Затусили с друзьями на море`, `Как же круто тут кормят`, `Отдыхаем...`, `Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......`, `Вот это тачка!`],
  likes: {
    MIN: 15,
    MAX: 200
  }
};

const createPicture = (index, data) => {
  return {
    url: `photos/${index}.jpg`,
    likes: Object(_random__WEBPACK_IMPORTED_MODULE_0__["createRandomFromRange"])(data.likes.MIN, data.likes.MAX),
    comments: Object(_random__WEBPACK_IMPORTED_MODULE_0__["chooseRandomArrayItems"])(data.comments, Object(_random__WEBPACK_IMPORTED_MODULE_0__["createRandomFromRange"])(0, data.comments.length - 1)),
    description: Object(_random__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(data.description)
  };
};

const createPicturesArray = (limit, data) => {
  return [...new Array(limit).keys()].map(key => createPicture(key + 1, data));
};



/***/ }),

/***/ "./js/random.js":
/*!**********************!*\
  !*** ./js/random.js ***!
  \**********************/
/*! exports provided: createRandomFromRange, getRandomArrayItem, chooseRandomArrayItems */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRandomFromRange", function() { return createRandomFromRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomArrayItem", function() { return getRandomArrayItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chooseRandomArrayItems", function() { return chooseRandomArrayItems; });
const createRandomFromRange = (min, max) => Math.round(Math.random() * (max - min) + min);

const getRandomArrayItem = array => array[createRandomFromRange(0, array.length - 1)];

const chooseRandomArrayItems = (array, size) => array.sort(() => Math.random() - 0.5).slice(0, size);



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map