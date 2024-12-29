function setActive (arr, target, isChildNeeded) {
  for (let i = 0; i < arr.length; i += 1) {
    let element = arr[i];
    if (isChildNeeded) {
      element = arr[i].firstElementChild;
    }
    element.classList.remove("active");
  };
  target.classList.add("active");
};

export default setActive;
