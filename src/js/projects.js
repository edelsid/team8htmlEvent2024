import checkDOM from "./checkDom";
import data from "../assets/projectsSliders.json" with { type: "json" };

export default class Projects {
  constructor(container) {
  this.bindToDOM(container);
  this.active = 1;
  this.count = 0;
  this.msgCount = 1;
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
      this.sliderArea.appendChild(newSlider);
    };
    this.width = this.sliderArea.children[0].getBoundingClientRect().width;
    this.setContent(data[this.msgCount]);
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
    if (this.active > this.sliderArea.children.length - 3) {
      const newSlider = this.sliderArea.children[this.count].cloneNode();
      this.sliderArea.appendChild(newSlider);
      this.count += 1;
    }
    this.active += 1;
    this.msgCount +=1;
    if (this.msgCount > data.length - 1) {
      this.msgCount = 0;
    }
    this.sliderArea.style.left = `calc((${position} - ${this.width}px) - 25px)`;
    this.setContent(data[this.msgCount]);
  }

  back(position) {
    if (this.active !== 1) {
      this.active -= 1;
      this.msgCount -= 1;
      if (this.msgCount < 0) {
        this.msgCount = data.length - 1;
      }
      this.sliderArea.style.left = `calc((${position} + ${this.width}px) + 25px)`;
      if (this.active < this.sliderArea.children.length - 5) {
        this.sliderArea.removeChild(this.sliderArea.lastElementChild);
        this.count -= 1;
      }
    };
    this.setContent(data[this.msgCount]);
  }

  addContent(data) {
    const newMsg = document.createElement('div');
    newMsg.className = "slider__content";
    newMsg.innerHTML = `
    <p class="subtitle subtitle-accent bg bg-subtitle">${data.subtitle}</p>
    <h3 class="title title-accent bg bg-title">${data.title}</h3>
    <div class="btn-slider__wrapper">
      <a class="btn-slider">+</a>
    </div>`;

    return newMsg;
  }
}

const root = document.querySelector(".projects");
const projects = new Projects(root);
projects.init(root);