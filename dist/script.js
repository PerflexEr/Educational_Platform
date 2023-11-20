/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/accordeon.js":
/*!*************************************!*\
  !*** ./src/js/modules/accordeon.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Accordeon)
/* harmony export */ });
class Accordeon {
  constructor(triggersSelector, itemToShow) {
    this.triggersSelector = document.querySelector(triggersSelector);
    this.itemToShow = document.querySelector(itemToShow);
    this.counter = 0;
  }
  init() {
    this.triggersSelector.addEventListener('click', () => {
      if (this.counter == 0) {
        this.itemToShow.style.display = "block";
        this.itemToShow.classList.add('animated', 'fadeIn');
        this.counter++;
      } else {
        this.itemToShow.classList.remove("fadeIn");
        this.itemToShow.classList.add("fadeOut");
        setTimeout(() => {
          this.itemToShow.style.display = "none";
          this.itemToShow.classList.remove("fadeOut");
        }, 200);
        this.counter--;
      }
    });
  }
}
;

/***/ }),

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

/***/ "./src/js/modules/download.js":
/*!************************************!*\
  !*** ./src/js/modules/download.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Download)
/* harmony export */ });
class Download {
  constructor(triggers) {
    this.btns = document.querySelectorAll(triggers);
    this.path = 'assets/img/mainbg.jpg';
  }
  downloadItem(path) {
    const element = document.createElement('a');
    element.setAttribute('href', path);
    element.setAttribute("download", 'bgpicture');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  init() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        this.downloadItem(this.path);
      });
    });
  }
}

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Forms)
/* harmony export */ });
class Forms {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll("input");
    this.message = {
      loading: "loading...",
      success: "thnk u : )",
      error: "smth went wrong"
    };
    this.path = "assets/question.php";
  }
  async postData(url, data) {
    let res = await fetch(url, {
      method: "POST",
      body: data
    });
    console.log("Получен ответ от сервера:", res);
    return await res.text();
  }
  initMask() {
    let setCursorPosition = (element, position) => {
      element.focus();
      if (element.setSelectionRange) {
        element.setSelectionRange(position, position);
      } else if (element.createTextRange) {
        let range = element.createTextRange();
        range.collapse(true);
        range.moveEnd("character", position);
        range.moveStart("character", position);
        range.select();
      }
    };
    function createMask(event) {
      let matrix = "+1 (___) ___-____",
        iterator = 0,
        def = matrix.replace(/\D/g, ""),
        value = this.value.replace(/\D/g, "");
      if (def.length >= value.length) {
        value = def;
      }
      this.value = matrix.replace(/./g, a => {
        return /[_\d]/.test(a) && iterator < value.length ? value.charAt(iterator++) : iterator >= value.length ? "" : a;
      });
      if (event.type === "blur") {
        if (this.value.length === 2) {
          this.value = "";
        }
      } else {
        setCursorPosition(this, this.value.length);
      }
    }
    let inputs = document.querySelectorAll('[name = "phone"]');
    inputs.forEach(input => {
      input.addEventListener("input", createMask);
      input.addEventListener("focus", createMask);
      input.addEventListener("blur", createMask);
    });
  }
  clearInuts() {
    this.inputs.forEach(input => {
      input.value = "";
    });
  }
  checkMailInputs() {
    const txtInputs = document.querySelectorAll('[type = "email"]');
    txtInputs.forEach(input => {
      input.addEventListener("input", e => {
        const inputValue = e.target.value;
        if (!inputValue.match(/^[а-яё0-9\s]+$/i)) {
          e.target.value = inputValue.replace(/[^a-z 0-9 @ \.]/gi, "");
        }
      });
    });
  }
  init() {
    this.initMask();
    this.checkMailInputs();
    this.forms.forEach(form => {
      form.addEventListener("submit", e => {
        e.preventDefault();
        let statusMessage = document.createElement("div");
        statusMessage.style.cssText = `
          margin-top: 15px;
          font-size: 18px;
          color: grey;
        `;
        form.appendChild(statusMessage);
        statusMessage.textContent = this.message.loading;
        const formData = new FormData(form);
        this.postData(this.path, formData).then(res => {
          console.log(res);
          statusMessage.textContent = this.message.success;
        }).catch(() => {
          statusMessage.textContent = this.message.error;
        }).finally(() => {
          this.clearInuts();
          setTimeout(() => {
            statusMessage.remove();
          }, 6000);
        });
      });
    });
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
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector(".close");
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }
  bindTriggers() {
    this.btns.forEach((btn, i) => {
      try {
        const blockedElem = btn.closest(".module__video-item").nextElementSibling;
        if (i % 2 == 0) {
          blockedElem.setAttribute("data-disabled", "true");
        }
      } catch (e) {}
      btn.addEventListener("click", () => {
        if (!btn.closest(".module__video-item") || btn.closest(".module__video-item").getAttribute("data-disabled") !== "true") {
          this.activeBtn = btn;
          if (document.querySelector("iframe#frame")) {
            this.overlay.style.display = "flex";
            if (this.path !== btn.getAttribute("data-url")) {
              this.path = "dQw4w9WgXcQ";
              this.player.loadVideoById({
                videoId: this.path
              });
            }
          } else {
            this.path = btn.getAttribute("data-url");
            this.createPlayer(this.path);
          }
        }
      });
    });
  }
  bindCloseBtn() {
    this.close.addEventListener("click", () => {
      this.overlay.style.display = "none";
      this.player.stopVideo();
    });
  }
  createPlayer() {
    this.player = new YT.Player("frame", {
      height: "100%",
      width: "100%",
      videoId: `dQw4w9WgXcQ`,
      events: {
        onStateChange: this.onPlayerStateChange
      }
    });
    this.overlay.style.display = "flex";
  }
  onPlayerStateChange(state) {
    try {
      const blockedElem = this.activeBtn.closest(".module__video-item").nextElementSibling;
      const playBtn = this.activeBtn.querySelector("svg").cloneNode(true);
      if (state.data === 0) {
        if (blockedElem.querySelector(".play__circle").classList.contains("closed")) {
          blockedElem.querySelector(".play__circle").classList.remove("closed");
          blockedElem.querySelector("svg").remove();
          blockedElem.querySelector(".play__circle").appendChild(playBtn);
          blockedElem.querySelector(".play__text").textContent = "play video";
          blockedElem.querySelector(".play__text").classList.remove("attention");
          blockedElem.style.opacity = 1;
          blockedElem.style.filter = "none";
          blockedElem.setAttribute("data-disabled", "false");
        }
      }
    } catch (e) {}
  }
  init() {
    if (this.btns.length > 0) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      this.bindTriggers();
      this.bindCloseBtn();
    }
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
    }
    if (n < 1) {
      this.slideIndex = this.slides.length;
    }
    try {
      this.hanson.style.opacity = "0";
      if (n == 3) {
        this.hanson.classList.add("animated");
        setTimeout(() => {
          this.hanson.style.opacity = "1";
          this.hanson.classList.add("slideInUp");
        }, 3000);
      } else {
        this.hanson.classList.remove("slideInUp");
      }
    } catch (e) {}
    [...this.slides].forEach(slide => {
      slide.style.display = "none";
    });
    [...this.slides][this.slideIndex - 1].style.display = "block";
  }
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }
  bindTriggers() {
    this.btns.forEach(item => {
      item.addEventListener("click", () => {
        this.plusSlides(1);
      });
      item.parentNode.previousElementSibling.addEventListener("click", e => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });
    document.querySelectorAll(".prevmodule").forEach(item => {
      item.addEventListener("click", e => {
        e.stopPropagation();
        e.preventDefault();
        this.plusSlides(-1);
      });
    });
    document.querySelectorAll(".nextmodule").forEach(item => {
      item.addEventListener("click", e => {
        e.stopPropagation();
        e.preventDefault();
        this.plusSlides(1);
      });
    });
  }
  render() {
    if (this.container) {
      try {
        this.hanson = document.querySelector(".hanson");
      } catch (e) {}
      this.showSlides(this.slideIndex);
      this.bindTriggers();
    }
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
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_accordeon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/accordeon */ "./src/js/modules/accordeon.js");
/* harmony import */ var _modules_download__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/download */ "./src/js/modules/download.js");







window.addEventListener('DOMContentLoaded', () => {
  const slider = new _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__["default"]({
    btns: ".next",
    container: ".page"
  });
  slider.render();
  const moduleSlider = new _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__["default"]({
    container: ".moduleapp",
    btns: ".next"
  });
  moduleSlider.render();
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
  new _modules_playVideo__WEBPACK_IMPORTED_MODULE_1__["default"](".module__video-item .play", ".overlay").init();
  new _modules_difference__WEBPACK_IMPORTED_MODULE_3__["default"](".officerold", ".officer__card-item").init();
  new _modules_difference__WEBPACK_IMPORTED_MODULE_3__["default"](".officernew", ".officer__card-item").init();
  new _modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"]('.form').init();
  new _modules_accordeon__WEBPACK_IMPORTED_MODULE_5__["default"](".module__info-show", ".msg").init();
  new _modules_download__WEBPACK_IMPORTED_MODULE_6__["default"](".download").init();
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map