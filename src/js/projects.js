import checkDOM from "./utils/checkDom";
import data from "../assets/projectsSliders.json" with { type: "json" };

export default class Projects {
  constructor(container) {
  this.bindToDOM(container);
  this.active = 1;
  this.count = 0;
  }

  bindToDOM(container) {
    checkDOM(container);
    this.sliderArea = container.querySelector(".projects__sliders");
  }

  init(container) {
    const arrows = container.querySelectorAll(".arrow");
    arrows.forEach((arrow) => {
      arrow.addEventListener("click", (e) => this.changeSlide(e.currentTarget));
    });
    this.bindSliders();
  }

  bindSliders() {
    for (let i = 0; i < data.length; i += 1) {
      const newSlider = this.createSlider(data[i]);
      const sliderContent = this.addContent(data[i]);
      newSlider.appendChild(sliderContent);
      this.sliderArea.appendChild(newSlider);
    };
  }

  createSlider(data) {
    const newSlider = document.createElement("li");
    newSlider.className = "projects__item";
    newSlider.style.backgroundImage = `url(${data.url})`;
    return newSlider;
  }

  setContent(data) {
    const childEl = this.addContent(data);
    this.sliderArea.children[this.active].appendChild(childEl);
  }

  changeSlide(target) {
    if (!target.id) return;
    this.sliderArea.children[this.active].classList.remove("active");
    const position = getComputedStyle(this.sliderArea).left;
    if (target.id === "forward") {
      this.forward(position);
    } else {
      this.back(position);
    };
    this.setActive();
  }

  forward(position) {
    if (this.active > this.sliderArea.children.length - 3) {
      const newSlider = this.sliderArea.children[this.count].cloneNode(true);
      this.sliderArea.appendChild(newSlider);
      this.count += 1;
    }
    this.active += 1;
    this.sliderArea.style.left = `calc((${position} - ${this.width}px) - ${this.gap}px)`;
  }

  back(position) {
    if (this.active !== 1) {
      this.active -= 1;
      this.sliderArea.style.left = `calc((${position} + ${this.width}px) + ${this.gap}px)`;
      if (this.active < this.sliderArea.children.length - 5) {
        this.sliderArea.removeChild(this.sliderArea.lastElementChild);
        this.count -= 1;
      }
    };
  }

  addContent(data) {
    const newMsg = document.createElement('div');
    newMsg.className = "slider__content";
    newMsg.innerHTML = `
    <p class="subtitle subtitle_accent bg bg_subtitle">${data.subtitle}</p>
    <h3 class="title title_accent bg bg_title">${data.title}</h3>
    <div class="btn_slider__wrapper">
      <a class="btn_slider">+</a>
    </div>`;

    return newMsg;
  }

  setActive() {
    this.sliderArea.children[this.active].classList.add("active");
  }

  reset() {
    this.width = this.sliderArea.children[0].getBoundingClientRect().width;
    this.sliderArea.children[this.active].classList.remove("active");
    this.active = 1;
    if (window.innerWidth < 480) {
      this.gap = 0;
      this.sliderArea.style.left = `-${this.width}px`;
    } else {
      this.sliderArea.style.left = `0px`;
      this.gap = 25;
    }
    this.setActive();
  }
}
