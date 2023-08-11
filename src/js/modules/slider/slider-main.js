import Slider from "./slider";

export default class MainSlider extends Slider {
  constructor(container, btns) {
    super(container, btns);
    this.btns = btns;
  }
  showSlides(n) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    } else if (n < 1) {
      this.slideIndex = this.slides.length;
    }
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

    [...this.slides].forEach((slide) => {
      slide.style.display = "none";
    });

    this.slides[this.slideIndex - 1].style.display = "block";
  }

  plusSlide(n) {
    this.showSlides((this.slideIndex += n));
  }

  render() {
    this.btns.forEach((item) => {
      console.log(item); // Добавьте эту строку для проверки
      item.addEventListener("click", () => {
        this.plusSlide(1);
      });

      item.parentNode.previousElementSibling.addEventListener("click", (e) => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });
  }
}