import checkDOM from "./checkDom";

export default class About {
  constructor(container) {
    this.bindToDOM(container);
    this.sliders = [{
      id: 1,
      url: "/assets/img/about1.webp",
      title: "Our vision",
      characteristics: [
        "Integrity and ethics", 
        "Commitment to quality", 
        "Innovation and creativity"
      ],
    }, 
    {
      id: 2,
      url: "/assets/img/about2.webp",
      title: "Core Values",
      characteristics: [
        "Responsibility", 
        "Communication", 
        "Attention to detail"
      ],
    }, 
    {
      id: 3,
      url: "/assets/img/about3.webp",
      title: "Community Engagement",
      characteristics: [
        "Personal contact partners",
        "Community events", 
        "24 hour support",
        "Conference participation"
      ],
    }, 
    {
      id: 4,
      url: "/assets/img/about4.webp",
      title: "Our Reach",
      characteristics: [
        "Offices in 10 countries", 
        "Partners across the globe", 
      ],
    }, 
    {
      id: 5,
      url: "/assets/img/about5.webp",
      title: "Commitment to Quality",
      characteristics: [
        "Only the best materials", 
        "Experienced workers",
        "Cultivated reputation",
      ],
    }];
    this.activeSliders = container.querySelectorAll(".about__item");
    this.contents = [];
    this.active = 1;
  }

  bindToDOM(container) {
    checkDOM(container);
    this.arrows = container.querySelectorAll(".arrow");
  }

  init() {
    this.arrows.forEach((arrow) => {
      arrow.addEventListener("click", (e) => this.changeSlide(e.currentTarget));
    });
    for (let i = 0; i < this.activeSliders.length; i += 1) {
      this.contents.push(this.sliders[i]);
    };
    this.bindSliders();
  }

  bindSliders() {
    for (let i = 0; i < this.activeSliders.length; i += 1) {
      const starterSlider = this.sliderFormation(this.contents[i]);
      this.activeSliders[i].style.backgroundImage = `url(${this.contents[i].url})`;
      this.activeSliders[i].innerHTML = "";
      if (this.contents[i] === this.sliders[this.active]) {
        const characteristics = this.listFormation(this.contents[i]);
        starterSlider.appendChild(characteristics);
        setTimeout(() => {
          starterSlider.style.opacity = 1;
        }, 300);
      };
      this.activeSliders[i].appendChild(starterSlider);
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
    this.contents.shift();
    this.contents.push(this.sliders[this.active + 1] ||
      this.sliders[0]);
    this.bindSliders();
  }

  back() {
    this.active -= 1;
    if (this.active < 0) {
      this.active = this.sliders.length - 1;
    };
    this.contents.pop();
    this.contents.unshift(this.sliders[this.active - 1] ||
      this.sliders[this.sliders.length - 1]);
    this.bindSliders();
  }

  sliderFormation(obj) {
    const newSlider = document.createElement("div");
    newSlider.classList = "slider__content";
    newSlider.innerHTML = `<h3 class="title title-accent">${obj.title}</h3>`;
    return newSlider;
  }

  listFormation(content) {
    const newMsg = document.createElement("ul");
    newMsg.className = "slider__list";
    for (let i = 0; i < content.characteristics.length; i += 1) {
      const listItem = document.createElement("li");
      listItem.className = "subtitle subtitle-list";
      listItem.innerText = content.characteristics[i];
      newMsg.appendChild(listItem);
    };
    return newMsg;
  }
}

const root = document.querySelector(".about");
const about = new About(root);
about.init();