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

//debounce
function calculations () {
  calculateTop();
  projects.reset();
}

function setCalc () {
  calculations();
  window.addEventListener("resize", () => calculations());
}

setCalc();