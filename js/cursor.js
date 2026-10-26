/* Native cursors preserve normal mouse and keyboard behavior. */
(() => {
  document.body.classList.remove('has-refined-cursor');
  ['cursor', 'cursorDot', 'cursorTrail'].forEach(id => {
    const element = document.getElementById(id);
    if (element) element.hidden = true;
  });
})();
