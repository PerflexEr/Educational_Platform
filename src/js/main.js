import Slider from "./modules/slider";
import VideoPlayer from "./modules/playVideo";
import MiniSlider from "./modules/slider/slider-mini";

window.addEventListener('DOMContentLoaded' , () => {
  const mainSlider = new Slider('.page' , '.next')
  mainSlider.render()

  const miniSlider1 = new MiniSlider({
    container: ".showup__content-slider",
    prev: ".showup__prev",
    next: ".showup__next",
  });
  miniSlider1.init()

  const miniSlider2 = new MiniSlider({
    container: ".modules__content-slider",
    prev: ".modules__info-btns .slick-prev",
    next: ".modules__info-btns .slick-next",
  });
  miniSlider2.init();

  const miniSlider3 = new MiniSlider({
    container: ".feed__slider",
    prev: ".feed__slider .slick-prev",
    next: ".feed__slider .slick-prev",
  });
  miniSlider3.init();

  const videoPlayer = new VideoPlayer('.showup .play' , '.overlay')
  videoPlayer.init()

})