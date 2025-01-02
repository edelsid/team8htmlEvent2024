import { 
  Services, 
  About, 
  Projects, 
  Process,
  Testimonials, 
  Team,
  calculateTop,
} from "./src/js/index";

//debounce
function calculations () {
  calculateTop();
}

function setCalc () {
  calculations();
  window.addEventListener("resize", () => calculations());
}

setCalc();