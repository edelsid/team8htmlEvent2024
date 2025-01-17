import { 
  Header,
  Services, 
  About, 
  Projects, 
  Process,
  Testimonials, 
  Team,
  calculateTop,
} from "./src/js/index";

const root = document.querySelector(".projects");
const projects = new Projects(root);
projects.init(root);

let timer = null;

function calculations() {
  calculateTop();
  projects.reset();
}

function setCalc () {
  calculations();
  window.addEventListener("resize", () => debounce());
}

function debounce() {
  clearTimeout(timer);
  timer = setTimeout(() => { 
    calculations();
  }, 300);
}

setCalc();