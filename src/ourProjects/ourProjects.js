export default class Cards_projects {
  constructor(container) {
    this.bindToDOM(container);
    this.active = 1;
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("container is not HTMLElement");
    }
    this.container = container;
    this.slides = Array.from(this.container.querySelectorAll(".picture"));
    this.arrows = this.container.querySelectorAll(".arrow");
  }

  init() {
    this.arrows.forEach((arrow) => {
      arrow.addEventListener("click", (e) => this.changeSlide(e.currentTarget));
    });
    this.chooseSlide(this.slides[this.active]);
  }

  chooseSlide(target) {
    this.closeAll();
    const childEl = this.addFormation();
    target.appendChild(childEl);
    setTimeout(() => {
      childEl.style.opacity = "1";
    }, 300);
  }

  changeSlide(target) {
    if(target.id === "forward") {
      this.active+=1;
      if (this.active > this.slides.length-1) this.active = 0;
    } else {
      this.active-=1;
      if (this.active < 0) this.active = this.slides.length-1;
    }
    this.chooseSlide(this.slides[this.active]);
  }

  closeAll() {
    this.slides.forEach((slide) => {
      slide.innerHTML = "";
    });
  }

  addFormation() {
    const newMsg = document.createElement('div');
    newMsg.className = 'picture--wrapper';
    newMsg.innerHTML = `
    <div class="picture--marker">+</div>
    <div class="header--wrapper">
      <p class="block-text text-with-base">Contraction</p>
      <h2 class="picture-description--header header-with-base">
        Skyline Tower Renovation
      </h2>
    </div>`;

    return newMsg;
  }
}

const root = document.querySelector(".projects");
const slider = new Cards_projects(root);
slider.init();