function checkDOM (container) {
  if (!(container instanceof HTMLElement)) {
    throw new Error("container is not HTMLElement");
  }
}

export default checkDOM;