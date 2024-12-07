function changeRatio() {
  const x = window.screen.width;
  const k = 750 + (600 - x) / 30;
  document.documentElement.style.setProperty('--image-ratio', `${k / x}`);
};

export const resizeWatcher = function () {
  window.addEventListener('resize', changeRatio);
  changeRatio();
};
