import checkDOM from "./utils/checkDom";
import setActive from "./utils/setActive";
import data from "../assets/testimonials.json" with { type: "json" };

export default class Testimonials {
  constructor(container) {
    this.bindToDOM(container);
    this.active = 1;
  }

  bindToDOM(container) {
    checkDOM(container);
    this.photoArea = container.querySelector(".testimonials__people");
    this.textArea = container.querySelector(".quote");
    this.authorArea = container.querySelector(".quote__person");
  }

  init() {
    data.forEach((item) => {
      const newPhoto = this.setPhoto(item);
      if (Number(newPhoto.id) === this.active) {
        newPhoto.classList.add("active");
      };
      this.photoArea.appendChild(newPhoto);
      newPhoto.addEventListener("click", (e) => this.changeText(e.target));
    });
    this.setText(data[0]);
    this.photoArea.style.setProperty("--position", `${this.active * 25}%`);
  }

  setPhoto(data) {
    const newPhoto = document.createElement("li");
    newPhoto.className = "people__item";
    newPhoto.id = data.id;
    newPhoto.innerHTML = `<img class="people__portrait" src=${data.img}>`;
    return newPhoto;
  }

  changeText(target) {
    const parent = target.parentElement;
    if (Number(this.active) === Number(parent.id)) return;
    const arr = this.photoArea.children;
    setActive(arr, arr[parent.id - 1], false);
    this.active = parent.id;
    this.photoArea.style.setProperty("--position", `${this.active * 25}%`);
    this.setText(data[parent.id - 1]);
  }

  setText(data) {
    this.textArea.innerText = data.text;
    this.authorArea.innerHTML = `
    <p class="quote__name">${data.name}</p>
    <p class="quote__status">${data.role}</p>`;
  }
}

const root = document.querySelector(".testimonials");
const testimonials = new Testimonials(root);
testimonials.init();