import checkDOM from "./utils/checkDom";
import data from "../assets/aboutSliders.json" with { type: "json" };

export default class About {
  constructor(container) {
    this.bindToDOM(container);
    this.sliders = container.querySelectorAll(".about__item");
    this.contents = [];
    this.active = 1;
  }

  bindToDOM(container) {
    checkDOM(container);
    const arrows = container.querySelectorAll(".arrow");
    arrows.forEach((arrow) => {
      arrow.addEventListener("click", (e) => this.changeSlide(e.currentTarget));
    });
  }

  init() {
    for (let i = 0; i < this.sliders.length; i += 1) {
      this.contents.push(data[i]);
    };
    this.bindSliders();
  }

  bindSliders() {
    for (let i = 0; i < this.sliders.length; i += 1) {
      const starterSlider = this.sliderFormation(this.contents[i]);
      const slider = this.sliders[i];
      slider.style.backgroundImage = `url(${this.contents[i].url})`;
      slider.appendChild(starterSlider);
    };
  }

  changeSlide(target) {
    if (!target.id) return;
    this.clearAll();
    if (target.id === "forward") {
      this.forward();
      return;
    };
    this.back();
  }

  forward() {
    this.active += 1;
    if (this.active > data.length - 1) {
      this.active = 0;
    };
    this.contents.shift();
    this.contents.push(data[this.active + 1] || data[0]);
    this.bindSliders();
  }

  back() {
    this.active -= 1;
    if (this.active < 0) {
      this.active = data.length - 1;
    };
    this.contents.pop();
    this.contents.unshift(data[this.active - 1] || data[data.length - 1]);
    this.bindSliders();
  }

  sliderFormation(obj) {
    const newSlider = document.createElement("div");
    newSlider.classList = "about-slider";
    newSlider.innerHTML = `<h3 class="title title-accent">${obj.title}</h3>`;
    const list = this.listFormation(obj);
    newSlider.appendChild(list);
    return newSlider;
  }

  listFormation(content) {
    const newMsg = document.createElement("ul");
    newMsg.className = "about-slider__list";
    for (let i = 0; i < content.characteristics.length; i += 1) {
      const listItem = document.createElement("li");
      listItem.className = "subtitle subtitle-list";
      listItem.innerText = content.characteristics[i];
      newMsg.appendChild(listItem);
    };
    return newMsg;
  }

  clearAll() {
    const sliderArr = Array.from(this.sliders);
    sliderArr.forEach((item) => {
      item.innerHTML = "";
    })
  }
}

const root = document.querySelector(".about");
const about = new About(root);
about.init();
