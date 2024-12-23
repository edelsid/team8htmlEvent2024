import checkDOM from "./checkDom";

export default class About {
  constructor(container) {
    this.bindToDOM(container);
    this.sliders = [{
      id: 1,
      url: "/assets/img/about1.webp",
      title: "Our vision",
    }, 
    {
      id: 2,
      url: "/assets/img/about2.webp",
      title: "Core Values",
    }, 
    {
      id: 3,
      url: "/assets/img/about3.webp",
      title: "Community Engagement",
    }, 
    {
      id: 4,
      url: "/assets/img/about4.webp",
      title: "Our Reach",
    }, 
    {
      id: 5,
      url: "/assets/img/about5.webp",
      title: "Commitment to Quality",
    }];
    this.activeSliders = [];
    this.active = 1;
  }

  bindToDOM(container) {
    checkDOM(container);
    this.sliderArea = container.querySelector(".about__sliders");
    this.arrows = container.querySelectorAll(".arrow");
  }

  init() {
    this.bindSliders();
    this.arrows.forEach((arrow) => {
      arrow.addEventListener("click", (e) => this.changeSlide(e.currentTarget));
    });
    this.activeSliders = this.sliderArea.getElementsByTagName('li');
  }

  bindSliders() {
    for (let i = 0; i < 3; i += 1) {
      const starterSlider = this.sliderFormation(this.sliders[i]);
      this.sliderArea.appendChild(starterSlider);
    };
  }

  changeSlide(target) {
    if (!target.id) return;
    if (target.id === "forward") {
      this.forward();
      return;
    };
    this.back();
  }

  forward() {
    this.active += 1;
    if (this.active > this.sliders.length - 1) {
      this.active = 0;
    };
    const newSlider = this.sliderFormation(this.sliders[this.active + 1] ||
      this.sliders[0]);
    this.sliderArea.removeChild(this.activeSliders[0]);
    this.sliderArea.appendChild(newSlider);
  }

  back() {
    this.active -= 1;
    if (this.active < 0) {
      this.active = this.sliders.length - 1;
    };
    const newSlider = this.sliderFormation(this.sliders[this.active - 1] ||
      this.sliders[this.sliders.length - 1]);
    this.sliderArea.removeChild(this.activeSliders[this.activeSliders.length - 1]);
    this.sliderArea.insertBefore(newSlider, this.sliderArea.firstElementChild);
  }

  sliderFormation(obj) {
    const newSlider = document.createElement("li");
    newSlider.classList = "about__item";
    newSlider.id = `about-${obj.id}`;
    newSlider.style.backgroundImage = `url(${obj.url})`;
    newSlider.innerHTML = `
    <div class="slider__content">
      <h3 class="title title-accent">${obj.title}</h3>
    </div>
    `;
    return newSlider;
  }

  listFormation() {
    const newMsg = document.createElement("ul");
    newMsg.className = "slider__list";
    newMsg.innerHTML = `
    <li class="subtitle subtitle-list">
      Integrity and ethics
    </li>
    <li class="subtitle subtitle-list">
      Commitment to quality
    </li>
    <li class="subtitle subtitle-list">
      Innovation and creativity
    </li>`;
    return newMsg;
  }
}

const root = document.querySelector(".about");
const about = new About(root);
about.init();