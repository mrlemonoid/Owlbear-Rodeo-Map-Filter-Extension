// script.js
const filters = {
  hue: 0,
  saturation: 1,
  brightness: 1,
  gamma: 1,
  colorKey: '#00ff00'
};

const updateFilter = () => {
  const style = `hue-rotate(${filters.hue}deg) saturate(${filters.saturation}) brightness(${filters.brightness})`;
  const maps = document.querySelectorAll('img[src*="map"], canvas');
  maps.forEach(el => {
    el.style.filter = style;
  });
};

['hue', 'saturation', 'brightness', 'gamma'].forEach(id => {
  document.getElementById(id).addEventListener('input', e => {
    filters[id] = parseFloat(e.target.value);
    updateFilter();
  });
});

// Color key not applied directly here, needs WebGL or canvas processing
// Placeholder for future use

document.getElementById('colorKey').addEventListener('input', e => {
  filters.colorKey = e.target.value;
  // ToDo: chroma key filtering with canvas or WebGL
});