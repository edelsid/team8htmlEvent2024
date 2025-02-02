import checkDOM from "./utils/checkDom";

export default class Services {
  constructor(container) {
    this.bindToDOM(container);
    this.active = 0;
    this.count = null;
  }

  bindToDOM(container) {
    checkDOM(container);
    this.container = container;
    this.slides = Array.from(this.container.querySelectorAll(".services__item"));
  }

  init() {
    this.container.addEventListener("click", (e) => this.onClick(e.target));
    this.chooseSlide(this.slides[0]);
    this.setCount();
  }

  chooseSlide(target) {
    this.active = this.slides.indexOf(target);
    if (target.classList.contains("active") ||
    target.closest(".active")) return;
    this.closeAll();
    target.classList.add("active");
    const childEl = this.addFormation();
    target.appendChild(childEl);
    setTimeout(() => {
      childEl.style.opacity = 1;
    }, 300);
  }

  closeAll() {
    this.slides.forEach((slide) => {
      slide.classList.remove("active");
      slide.innerHTML = "";
    });
  }

  onClick(target) {
    this.chooseSlide(target);
    clearInterval(this.count);
    setTimeout(() => {
      this.setCount();
    }, 3000);
  }

  setCount() {
    this.count = setInterval(() => {
      this.active += 1;
      if (this.active > this.slides.length - 1) {
        this.active = 0;
      };
      this.chooseSlide(this.slides[this.active]);
    }, 3000);
  }

  addFormation() {
    const newMsg = document.createElement('div');
    newMsg.className = 'service__wrapper';
    const inner = `
    <div class="service__icon">
      <picture>
        <source srcSet="img/Icon.webp" type='image/webp'/>
        <img 
        src="img/Icon.png" 
        alt="icon of a tall building"/>
      </picture>
    </div>
    <div class="service__headers">
      <h4 class="title">Building Contraction</h4>
      <p class="subtitle subtitle_standart">
        This involves various stages like planning, design.
      </p>
    </div>`
    newMsg.insertAdjacentHTML("afterbegin", inner);
    return newMsg;
  }
}

const root = document.querySelector(".services__sliders");
const services = new Services(root);
services.init();