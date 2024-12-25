import checkDOM from "./checkDom";
import data from "../assets/projectsSliders.json" with { type: "json" };

export default class Projects {
  constructor(container) {
  this.bindToDOM(container);
  this.active = 1;
  }

  bindToDOM(container) {
    checkDOM(container);
    this.sliderArea = container.querySelector(".projects__sliders");
    this.arrows = container.querySelectorAll(".arrow");
  }

  init() {
    this.arrows.forEach((arrow) => {
      arrow.addEventListener("click", (e) => this.changeSlide(e.currentTarget));
    });
    this.bindSliders();
  }

  bindSliders() {
    for (let i = 0; i < data.length; i += 1) {
      const newSlider = this.createSlider(data[i]);
      this.sliderArea.appendChild(newSlider);
    };
    this.setContent();
    this.width = this.sliderArea.children[0].getBoundingClientRect().width;
  }

  createSlider(data) {
    const newSlider = document.createElement("li");
    newSlider.className = "projects__item";
    newSlider.style.backgroundImage = `url(${data.url})`;
    return newSlider;
  }

  setContent() {
    const childEl = this.addContent();
    this.sliderArea.children[this.active].appendChild(childEl);
    setTimeout(() => {
      childEl.style.opacity = 1;
    }, 300);
  }

  changeSlide(target) {
    if (!target.id) return;
    this.sliderArea.children[this.active].innerHTML = "";
    const position = getComputedStyle(this.sliderArea).left;
    if (target.id === "forward") {
      this.forward(position);
      return;
    };
    this.back(position);
  }

  forward(position) {
    const newSlider = this.sliderArea.children[this.active - 1].cloneNode();
    this.active += 1;
    this.sliderArea.appendChild(newSlider);
    this.sliderArea.style.left = `calc((${position} - ${this.width}px) - 25px)`;
    this.setContent();
  }

  back(position) {
    if (this.active !== 1) {
      this.active -= 1;
      this.sliderArea.style.left = `calc((${position} + ${this.width}px) + 25px)`;
    };
    this.setContent();
  }

  addContent() {
    const newMsg = document.createElement('div');
    newMsg.className = "slider__content";
    newMsg.innerHTML = `
    <p class="subtitle subtitle-accent bg bg-subtitle">Contraction</p>
    <h3 class="title title-accent bg bg-title">Skyline Tower Renovation</h3>
    <div class="btn-slider__wrapper">
      <a class="btn-slider">+</a>
    </div>`;

    return newMsg;
  }
}

const root = document.querySelector(".projects");
const projects = new Projects(root);
projects.init();