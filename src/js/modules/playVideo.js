export default class VideoPlayer {
  constructor(triggers, popup) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(popup);
    this.close = this.overlay.querySelector(".close");
  }

  bindTriggers(){
    this.btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if(document.querySelector('iframe#frame')){
          this.overlay.style.display = "flex";
        }else{
          const path = "dQw4w9WgXcQ";
          this.createPlayer(path);
        }
      });
    });
  }

  bindCloseBtn(){
    this.close.addEventListener('click' , () => {
      this.overlay.style.display = "none";
      this.player.stopVideo()
    })
  }

  createPlayer(url) {
    this.player = new YT.Player("frame", {
      height: "100%",
      width: "100%",
      videoId: `${url}`,
      events: {
        onReady: (event) => {
          event.target.playVideo(); 
        },
      },
    });
    this.overlay.style.display = 'flex'
    console.log(this.player);
  }

  init() {
    if(this.btns.length !== 0){
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";

      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      this.bindTriggers();
      this.bindCloseBtn();
    }
  }
}
