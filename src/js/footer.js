//debounce?
function calculateTop () {
  const footerForm = document.querySelector(".footer__subscription");
  const elHeight = footerForm.offsetHeight;
  footerForm.style.top = `-${elHeight / 2}px`;
}

function footerResize () {
  calculateTop();
  window.addEventListener("resize", () => calculateTop());
}

export default footerResize;
