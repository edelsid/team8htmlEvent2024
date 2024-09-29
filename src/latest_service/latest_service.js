export default class Slider_latest {
  constructor(container) {
    this.bindToDOM(container);
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("container is not HTMLElement");
    }
    this.container = container;
    this.slides = Array.from(this.container.querySelectorAll(".picture"));
  }

  init() {

    this.container.addEventListener("click", (e) => this.chooseSlide(e.target));
  }

  chooseSlide(target) {
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

  addFormation() {
    const newMsg = document.createElement('div');
    newMsg.className = 'picture-message--wrapper';
    newMsg.innerHTML = `
    <div class="picture-icon--wrapper">
      <img class="picture-icon" src="./assets/png/Icon.png" alt="icon of a tall building">
    </div>
    <div class="picture-header--wrapper">
      <h4 class="picture-description--header">Building Contraction</h4>
      <p class="block-text">
        This involves various stages like planning, design.
      </p>
    </div>`;

    return newMsg;
  }
}

const root = document.querySelector(".latest--pictures");
const slider = new Slider_latest(root);
slider.init();