import MainSlider from "./modules/slider/slider-main";
import VideoPlayer from "./modules/playVideo";
import MiniSlider from "./modules/slider/slider-mini";

window.addEventListener('DOMContentLoaded' , () => {
  const slider = new MainSlider({ btns: ".next", container: ".page" });
  slider.render();

  const miniSlider1 = new MiniSlider({
    container: ".showup__content-slider",
    prev: ".showup__prev",
    next: ".showup__next",
    activeClass: "card-active",
    animate: true,
  });
  miniSlider1.init()

  const miniSlider2 = new MiniSlider({
    container: ".modules__content-slider",
    prev: ".modules__info-btns .slick-prev",
    next: ".modules__info-btns .slick-next",
    activeClass: "card-active",
  });
  miniSlider2.init();

  const miniSlider3 = new MiniSlider({
    container: ".feed__slider",
    prev: ".feed__slider .slick-prev",
    next: ".feed__slider .slick-next",
    activeClass: "feed__item-active",
  });
  miniSlider3.init();

  const videoPlayer = new VideoPlayer('.showup .play' , '.overlay')
  videoPlayer.init()

})