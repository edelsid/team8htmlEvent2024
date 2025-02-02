import checkDOM from "./utils/checkDom";
import setActive from "./utils/setActive";
import data from "../assets/team.json" with { type: "json" };

export default class Team {
  constructor(container) {
    this.bindToDOM(container);
    this.active = 1;
  }

  bindToDOM(container) {
    checkDOM(container);
    this.nameArea = container.querySelector(".team__names");
    this.photo = container.querySelector(".team__photo");
  }

  init() {
    data.forEach((item) => {
      const newTab = this.setName(item);
      if (Number(newTab.id) === 1) {
        newTab.classList.add("active");
      };
      this.nameArea.appendChild(newTab);
      newTab.addEventListener("click", (e) => this.changeTab(e.target));
    });
    const source = this.photo.getElementsByTagName("source")[0];
    const image = this.photo.getElementsByTagName("img")[0];
    source.srcset = data[0].img;
    image.src = data[0].img2;
  }

  setName(data) {
    const newName = document.createElement("li");
    newName.className = "names__item";
    newName.id = data.id;
    const inner = `
    <p class="names__name">${data.name}</p>
    <p class="names__role">${data.role}</p>`;
    newName.insertAdjacentHTML("afterbegin", inner);
    return newName;
  }

  changeTab(target) {
    const parent = target.parentElement;
    if (Number(this.active) === Number(parent.id)) return;
    setActive(this.nameArea.children, parent, false);
    this.active = parent.id;
    const source = this.photo.getElementsByTagName("source")[0];
    const image = this.photo.getElementsByTagName("img")[0];
    source.srcset = data[this.active - 1].img;
    image.src = data[this.active - 1].img2;
  }
}

const root = document.querySelector(".team");
const team = new Team(root);
team.init();