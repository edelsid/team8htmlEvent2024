import checkDOM from "./utils/checkDom";

export default class Header {
  constructor() {
    this.isOpen = false;
  }

  bindToDOM(container) {
    checkDOM(container);
    this.burgerMenu = container.querySelector(".header__burger");
    const anchors = Array.from(container.querySelectorAll(".anchors__item"));
    const burgerBtn = container.querySelector(".menu__burger");
    const burgerCloseBtn = container.querySelector(".burger__close");
    burgerBtn.addEventListener("click", () => this.open());
    burgerCloseBtn.addEventListener("click", () => this.close());
    anchors.forEach((item) => 
      item.addEventListener("click", () => this.close())
    );
  }

  open() {
    this.burgerMenu.style.right = 0;
    this.isOpen = !this.isOpen;
  }

  close() {
    if (!this.isOpen) return;
    this.burgerMenu.style.right = `-500px`;
    this.isOpen = !this.isOpen;
  }
}

const root = document.querySelector(".header");
const header = new Header();
header.bindToDOM(root);