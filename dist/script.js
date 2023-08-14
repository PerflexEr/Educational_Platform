/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/difference.js":
/*!**************************************!*\
  !*** ./src/js/modules/difference.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Difference)
/* harmony export */ });
class Difference {
  constructor(officer, items) {
    try {
      this.officer = document.querySelector(officer);
      this.items = this.officer.querySelectorAll(items);
      this.counter = 0;
    } catch (error) {}
  }
  bindTriggers() {
    this.items[this.items.length - 1].addEventListener('click', () => {
      this.items[this.counter].style.display = "flex";
      this.items[this.counter].classList.add("fadeIn");
      if (this.counter !== this.items.length - 2) {
        this.counter++;
      } else {
        this.items[this.items.length - 1].remove();
      }
    });
  }
  hideItems() {
    this.items.forEach((item, i, arr) => {
      item.classList.add("animated", "fadeIn");
      if (i !== arr.length - 1) {
        item.style.display = "none";
      }
    });
  }
  init() {
    try {
      this.hideItems();
      this.bindTriggers();
    } catch (error) {}
  }
}

/***/ }),

/***/ "./src/js/modules/playVideo.js":
/*!*************************************!*\
  !*** ./src/js/modules/playVideo.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VideoPlayer)
/* harmony export */ });
class VideoPlayer {
  constructor(triggers, popup) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(popup);
    this.close = this.overlay.querySelector(".close");
  }
  bindTriggers() {
    this.btns.forEach(btn => {
      btn.addEventListener("click", () => {
        if (document.querySelector('iframe#frame')) {
          this.overlay.style.display = "flex";
        } else {
          const path = "dQw4w9WgXcQ";
          this.createPlayer(path);
        }
      });
    });
  }
  bindCloseBtn() {
    this.close.addEventListener('click', () => {
      this.overlay.style.display = "none";
      this.player.stopVideo();
    });
  }
  createPlayer(url) {
    this.player = new YT.Player("frame", {
      height: "100%",
      width: "100%",
      videoId: `${url}`,
      events: {
        onReady: event => {
          event.target.playVideo();
        }
      }
    });
    this.overlay.style.display = 'flex';
    console.log(this.player);
  }
  init() {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    this.bindTriggers();
    this.bindCloseBtn();
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider-main.js":
/*!**********************************************!*\
  !*** ./src/js/modules/slider/slider-main.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MainSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(btns) {
    super(btns);
  }
  showSlides(n) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    } else if (n < 1) {
      this.slideIndex = this.slides.length;
    }
    try {
      this.hanson = document.querySelector(".hanson");
      this.hanson.style.display = "none";
      if (this.slideIndex == 3) {
        setTimeout(() => {
          this.hanson.classList.add("animated", "slideInUp");
          this.hanson.style.display = "block";
          this.hanson.style.zIndex = "4";
        }, 3000);
      } else {
        this.hanson.classList.remove("slideInUp");
      }
    } catch (error) {}
    [...this.slides].forEach(slide => {
      slide.style.display = "none";
    });
    [...this.slides][this.slideIndex - 1].style.display = "block";
  }
  plusSlide(n) {
    this.showSlides(this.slideIndex += n);
  }
  render() {
    try {
      this.btns.forEach(item => {
        item.addEventListener("click", () => {
          this.plusSlide(1);
        });
        item.parentNode.previousElementSibling.addEventListener("click", e => {
          e.preventDefault();
          this.slideIndex = 1;
          this.showSlides(this.slideIndex);
        });
      });
    } catch (error) {}
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider-mini.js":
/*!**********************************************!*\
  !*** ./src/js/modules/slider/slider-mini.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MiniSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MiniSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(container, next, prev, activeClass, animate, autoPlay) {
    super(container, next, prev, activeClass, animate, autoPlay);
  }
  decorSlides() {
    if (!this.slides[0].closest('button')) {
      [...this.slides].forEach(slide => {
        slide.classList.remove(this.activeClass);
        if (this.animate) {
          slide.querySelector(".card__title").style.opacity = "0.4";
          slide.querySelector(".card__controls-arrow").style.opacity = "0";
        }
      });
      [...this.slides][0].classList.add(this.activeClass);
      if (this.animate) {
        this.slides[0].querySelector(".card__title").style.opacity = "1";
        this.slides[0].querySelector(".card__controls-arrow").style.opacity = "1";
      }
    }
  }
  nextSlide() {
    if (this.slides[1].tagName == "BUTTON" && this.slides[2].tagName) {
      this.container.appendChild(this.slides[0]);
      this.container.appendChild(this.slides[1]);
      this.container.appendChild(this.slides[2]);
      this.decorSlides();
    } else if (this.slides[1].tagName == "BUTTON") {
      this.container.appendChild(this.slides[0]);
      this.container.appendChild(this.slides[1]);
      this.decorSlides();
    } else {
      this.container.appendChild(this.slides[0]);
      this.decorSlides();
    }
  }
  bindTriggers() {
    this.next.addEventListener("click", () => {
      this.nextSlide();
    });
    this.prev.addEventListener("click", () => {
      for (let i = this.slides.length - 1; i > 0; i--) {
        if (this.slides[i].tagName !== "BUTTON") {
          let lastSlide = this.slides[i];
          this.container.insertBefore(lastSlide, this.slides[0]);
          this.decorSlides();
          break;
        }
      }
    });
  }
  init() {
    try {
      this.container.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      align-items: flex-start;
    `;
      this.decorSlides();
      this.bindTriggers();
      if (this.autoplay) {
        setInterval(() => {
          this.nextSlide();
        }, 5000);
      }
    } catch (error) {}
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider.js":
/*!*****************************************!*\
  !*** ./src/js/modules/slider/slider.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Slider)
/* harmony export */ });
class Slider {
  constructor() {
    let {
      container = null,
      btns = null,
      next = null,
      prev = null,
      activeClass = "",
      animate,
      autoplay
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.container = document.querySelector(container);
    try {
      this.slides = this.container.children;
    } catch (error) {}
    this.btns = document.querySelectorAll(btns);
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);
    this.activeClass = activeClass;
    this.animate = animate;
    this.autoplay = autoplay;
    this.slideIndex = 1;
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/slider/slider-main */ "./src/js/modules/slider/slider-main.js");
/* harmony import */ var _modules_playVideo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/playVideo */ "./src/js/modules/playVideo.js");
/* harmony import */ var _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider/slider-mini */ "./src/js/modules/slider/slider-mini.js");
/* harmony import */ var _modules_difference__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/difference */ "./src/js/modules/difference.js");




window.addEventListener('DOMContentLoaded', () => {
  const slider = new _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__["default"]({
    btns: ".next",
    container: ".page"
  });
  slider.render();
  const miniSlider1 = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: ".showup__content-slider",
    prev: ".showup__prev",
    next: ".showup__next",
    activeClass: "card-active",
    animate: true
  });
  miniSlider1.init();
  const miniSlider2 = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: ".modules__content-slider",
    prev: ".modules__info-btns .slick-prev",
    next: ".modules__info-btns .slick-next",
    activeClass: "card-active",
    autoplay: true
  });
  miniSlider2.init();
  const miniSlider3 = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: ".feed__slider",
    prev: ".feed__slider .slick-prev",
    next: ".feed__slider .slick-next",
    activeClass: "feed__item-active"
  });
  miniSlider3.init();
  new _modules_playVideo__WEBPACK_IMPORTED_MODULE_1__["default"](".showup .play", ".overlay").init();
  new _modules_difference__WEBPACK_IMPORTED_MODULE_3__["default"](".officerold", ".officer__card-item").init();
  new _modules_difference__WEBPACK_IMPORTED_MODULE_3__["default"](".officernew", ".officer__card-item").init();
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map