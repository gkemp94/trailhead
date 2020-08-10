window.addEventListener('load', async () => {
  const wrapperEl = document.getElementById('footer-metrics');
  const widgetEl = document.createElement('div');
  widgetEl.classList.add('muted', 'footer-metrics');
  if (!window.performance) {
    return;
  }
  const { loadEventStart, navigationStart } = window.performance.timing;

  const dt = Math.round((loadEventStart - navigationStart)/10)/100;  
  const carbon = await getCO2Estimation(window.location.href);
  if (!carbon) {
    widgetEl.innerHTML = `This page loaded in <strong>${dt} seconds</strong>`;
  } else {
    widgetEl.innerHTML = `This page loaded in <strong>${dt} seconds</strong> emitted just <strong>${carbon}g of CO<sup>2</sup></strong>`;
  }
  wrapperEl.append(widgetEl);
});

const getCO2Estimation = (url) => {
  return window.localStorage.getItem(`wt_c__${url}`) || fetch(`https://api.websitecarbon.com/b?url=${url}`)
    .then(res => res.json())
    .then(({ c }) => {
      window.localStorage.setItem(`wt_c__${url}`, c);
      return c;
    });
}
