export default class Cards_about {
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
    this.chooseSlide(this.slides[this.active].firstElementChild);
  }

  chooseSlide(target) {
    this.closeAll();
    target.classList.add("active");
    const childEl = this.addFormation();
    target.insertAdjacentElement('afterbegin', childEl);
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
    this.chooseSlide(this.slides[this.active].firstElementChild);
  }

  closeAll() {
    this.slides.forEach((slide) => {
      slide.firstElementChild.classList.remove("active");
      const forDeletion = slide.querySelector(".block-text");
      if (forDeletion) {
        slide.firstElementChild.removeChild(forDeletion);
      }
    });
  }

  addFormation() {
    const newMsg = document.createElement("ul");
    newMsg.className = "list picture-description--list block-text";
    newMsg.innerHTML = `
    <li class="picture-description--characteristic">
      Integrity and ethics
    </li>
    <li class="picture-description--characteristic">
      Commitment to quality
    </li>
    <li class="picture-description--characteristic">
      Innovation and creativity
    </li>`;

    return newMsg;
  }
}

const root = document.querySelector(".about");
const slider = new Cards_about(root);
slider.init();