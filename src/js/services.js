export default class Services {
  constructor(container) {
    this.bindToDOM(container);
    this.currentSlide = 0;
    this.count = null;
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("container is not HTMLElement");
    }
    this.container = container;
    this.slides = Array.from(this.container.querySelectorAll(".services__item"));
  }

  init() {
    this.container.addEventListener("click", (e) => this.onClick(e.target));
    this.chooseSlide(this.slides[0]);
    this.setCount();
  }

  chooseSlide(target) {
    this.currentSlide = this.slides.indexOf(target);
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
    }, 5000);
  }

  setCount() {
    this.count = setInterval(() => {
      this.currentSlide += 1;
      if (this.currentSlide > this.slides.length - 1) {
        this.currentSlide = 0;
      };
      this.chooseSlide(this.slides[this.currentSlide]);
    }, 3000);
  }

  addFormation() {
    const newMsg = document.createElement('div');
    newMsg.className = 'service__wrapper';
    newMsg.innerHTML = `
    <div class="service__icon">
      <img src="./assets/png/Icon.png" alt="icon of a tall building">
    </div>
    <div class="service__headers">
      <h4 class="title">Building Contraction</h4>
      <p class="subtitle subtitle-standart">
        This involves various stages like planning, design.
      </p>
    </div>`;

    return newMsg;
  }
}

const root = document.querySelector(".services__sliders");
const services = new Services(root);
services.init();