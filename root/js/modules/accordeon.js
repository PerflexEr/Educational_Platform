export default class Accordeon {
  constructor(triggersSelector,itemToShow) {
    this.triggersSelector = document.querySelector(triggersSelector);
    this.itemToShow = document.querySelector(itemToShow)
    this.counter = 0
  }

  init(){
    this.triggersSelector.addEventListener('click' , () => {
      if(this.counter == 0){
        this.itemToShow.style.display = "block";
        this.itemToShow.classList.add('animated' , 'fadeIn')
        this.counter++
      }else{
        this.itemToShow.classList.remove("fadeIn");
        this.itemToShow.classList.add("fadeOut");
        setTimeout(() => {
          this.itemToShow.style.display = "none";
          this.itemToShow.classList.remove("fadeOut");
        }, 200);
        this.counter--;
      }
    })
  }
  
};


