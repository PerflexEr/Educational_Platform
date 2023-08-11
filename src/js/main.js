import Slider from "./modules/slider";
import VideoPlayer from "./modules/playVideo";


window.addEventListener('DOMContentLoaded' , () => {
  const mainSlider = new Slider('.page' , '.next')
  mainSlider.render()
  const videoPlayer = new VideoPlayer('.showup .play' , '.overlay')
  videoPlayer.init()
})