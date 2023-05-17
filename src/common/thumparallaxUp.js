const thumparallaxUp = () => {
  let imageUp = document.getElementsByClassName("thumparallax");
  if (imageUp) {
    new simpleParallax(imageUp, {
      delay: 1,
      scale: 1.1,
    });
  }
};

export default thumparallaxUp;
