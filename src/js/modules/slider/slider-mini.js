import slider from "./slider";
export default class MiniSlider extends slider{
  constructor(container,next,prev){
    super(container, next, prev);
  }
  bindTriggers(){
    this.next.addEventListener('click' , () => {
      this.container.appendChild(this.slides[0])
    })
    this.prev.addEventListener("click", () => {
      let active = this.slides[this.slides.length] -1
      this.container.insertBefore(active,this.slides[0])
    });
  }
  init(){
    console.log(this.prev,this.next,this.container);
    this.container.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      align-items: flex-start;
    `
    this.bindTriggers()
  }
}