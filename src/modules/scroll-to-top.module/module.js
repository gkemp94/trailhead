window.addEventListener('load', () => {
  const el = document.getElementById('scrollUp');
  el.hidden = window.pageYOffset < document.documentElement.clientHeight;
  window.addEventListener('scroll', () => {
    el.hidden = window.pageYOffset < document.documentElement.clientHeight;
  });
})
