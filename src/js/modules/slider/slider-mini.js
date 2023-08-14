import slider from "./slider";
export default class MiniSlider extends slider {
  constructor(container, next, prev, activeClass, animate, autoPlay) {
    super(container, next, prev, activeClass, animate, autoPlay);
  }

  decorSlides() {
    if(!this.slides[0].closest('button')){
      [...this.slides].forEach((slide) => {
        slide.classList.remove(this.activeClass);
        if (this.animate) {
          slide.querySelector(".card__title").style.opacity = "0.4";
          slide.querySelector(".card__controls-arrow").style.opacity = "0";
        }
      });

      [...this.slides][0].classList.add(this.activeClass);

      if (this.animate) {
        this.slides[0].querySelector(".card__title").style.opacity = "1";
        this.slides[0].querySelector(".card__controls-arrow").style.opacity =
          "1";
      }
    } 
  }
  nextSlide(){
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
      this.nextSlide()
    });
    this.prev.addEventListener("click", () => {
      for (let i = this.slides.length - 1; i > 0 ; i--) {
        if(this.slides[i].tagName !== "BUTTON"){
          let lastSlide = this.slides[i];
          this.container.insertBefore(lastSlide, this.slides[0]);
          this.decorSlides();
          break
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