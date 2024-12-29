import checkDOM from "./utils/checkDom";
import setActive from "./utils/setActive";
import data from "../assets/tabs.json" with { type: "json" };

export default class Process {
  constructor(container) {
    this.bindToDOM(container);
    this.active = 1;
  }

  bindToDOM(container) {
    checkDOM(container);
    this.container = container;
    this.modal = this.container.querySelector(".modal");
    this.previewScreen = this.container.querySelector(".video__player");
    this.tabArea = this.container.querySelector(".process__tabs");
    this.video = this.container.querySelector(".modal__video");
  }

  init() {
    const playBtn = this.container.querySelector(".btn-play");
    playBtn.addEventListener("click", (e) => this.openModal());
    const closeBtn = this.container.querySelector(".modal__close");
    closeBtn.addEventListener("click", (e) => this.closeModal());

    data.forEach((item) => {
      const newTab = this.setTab(item);
      const btn = newTab.firstElementChild;
      if (Number(btn.id) === this.active) {
        btn.classList.add("active");
        this.previewScreen.src = data[this.active - 1].img;
      }
      this.tabArea.appendChild(newTab);
    });
    
    this.tabArea.addEventListener("click", (e) => this.changeTab(e.target));
  }

  setTab(data) {
    const newTab = document.createElement("li");
    newTab.className = "process__item";
    newTab.innerHTML = `
    <button class="btn btn-switch" type="button" id="${data.id}">
      0${data.id}. ${data.title}
    </button>`;
    return newTab;
  }

  changeTab(target) {
    if (Number(this.active) === Number(target.id)) return;
    // for (let i = 0; i < this.tabArea.children.length; i += 1) {
    //   const child = this.tabArea.children[i].firstElementChild;
    //   child.classList.remove("active");
    // };
    // target.classList.add("active");
    setActive(this.tabArea.children, target, true);
    this.previewScreen.src = data[target.id - 1].img;
    this.active = target.id;
  }

  openModal() {
    this.video.src = data[this.active - 1].url;
    this.modal.showModal();
  }

  closeModal() {
    this.modal.close();
    this.video.src = "";
  }
}

const root = document.querySelector(".process");
const process = new Process(root);
process.init();
