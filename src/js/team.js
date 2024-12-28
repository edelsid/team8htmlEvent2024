import checkDOM from "./checkDom";
import data from "../assets/team.json" with { type: "json" };

export default class Team {
  constructor(container) {
    this.bindToDOM(container);
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
    });
    this.nameArea.addEventListener("click", (e) => this.changeTab(e.target));
  }

  setName(data) {
    const newName = document.createElement("li");
    newName.className = "names__item";
    newName.id = data.id;
    newName.innerHTML = `
    <p class="names__name">${data.name}</p>
    <p class="names__role">${data.role}</p>`;
    return newName;
  }

  changeTab(target) {
    for (let i = 0; i < this.nameArea.children.length; i += 1) {
      this.nameArea.children[i].classList.remove("active");
    };
    const parent = target.parentElement;
    parent.classList.add("active");
    this.photo.src = data[parent.id - 1].img;
  }
}

const root = document.querySelector(".team");
const team = new Team(root);
team.init();