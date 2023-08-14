import slider from "./slider";
export default class MiniSlider extends slider {
  constructor(container, next, prev, activeClass, animate, autoPlay) {
    super(container, next, prev, activeClass, animate, autoPlay);
  }

  decorSlides() {
    [...this.slides].forEach((slide) => {
      slide.classList.remove(this.activeClass);
      if (this.animate) {
        slide.querySelector(".card__title").style.opacity = "0.4";
        slide.querySelector(".card__controls-arrow").style.opacity ="0";
      }
    });

    [...this.slides][0].classList.add(this.activeClass);

    if (this.animate) {
      this.slides[0].querySelector(".card__title").style.opacity = "1";
      this.slides[0].querySelector(".card__controls-arrow").style.opacity = "1";
    }
  }

  bindTriggers() {
    this.next.addEventListener("click", () => {
      this.container.appendChild(this.slides[0]);
      this.decorSlides();
    });
    this.prev.addEventListener("click", () => {
      let lastSlide = this.slides[this.slides.length - 1];
      this.container.insertBefore(lastSlide, this.slides[0]);
      this.decorSlides();
    });
  }

  init() {
    this.container.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      align-items: flex-start;
    `;
    this.decorSlides();
    this.bindTriggers();
  }
}