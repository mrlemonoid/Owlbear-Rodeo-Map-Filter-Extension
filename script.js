// script.js

let originalImage = new Image();
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const hueInput = document.getElementById('hue');
const saturationInput = document.getElementById('saturation');
const gammaInput = document.getElementById('gamma');
const chromaInput = document.getElementById('chromaColor');
const applyBtn = document.getElementById('applyFilters');

// Példaképként egy térképet töltünk be – később cserélhető Owlbear assetre
originalImage.src = 'https://upload.wikimedia.org/wikipedia/commons/3/37/D%26D_map_example.jpg';
originalImage.crossOrigin = 'anonymous';
originalImage.onload = () => {
  canvas.width = originalImage.width;
  canvas.height = originalImage.height;
  ctx.drawImage(originalImage, 0, 0);
};

function applyFilters() {
  ctx.drawImage(originalImage, 0, 0);
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imageData.data;

  const hue = parseInt(hueInput.value);
  const saturation = parseInt(saturationInput.value) / 100;
  const gamma = parseFloat(gammaInput.value);

  const chroma = hexToRgb(chromaInput.value);
  const chromaThreshold = 60; // állítható küszöb

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];

    // HSL színezés és telítettség
    let [h, s, l] = rgbToHsl(r, g, b);
    h = (h * 360 + hue) % 360 / 360;
    s *= saturation;
    [r, g, b] = hslToRgb(h, s, l);

    // Gamma korrekció
    r = 255 * Math.pow(r / 255, 1 / gamma);
    g = 255 * Math.pow(g / 255, 1 / gamma);
    b = 255 * Math.pow(b / 255, 1 / gamma);

    // Chroma key
    if (colorDistance(r, g, b, chroma.r, chroma.g, chroma.b) < chromaThreshold) {
      data[i + 3] = 0; // alpha 0 = átlátszó
    }

    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
  }

  ctx.putImageData(imageData, 0, 0);
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

function colorDistance(r1, g1, b1, r2, g2, b2) {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h, s, l];
}

function hslToRgb(h, s, l) {
  let r, g, b;
  if (s === 0) {
    r = g = b = l * 255;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = 255 * hue2rgb(p, q, h + 1 / 3);
    g = 255 * hue2rgb(p, q, h);
    b = 255 * hue2rgb(p, q, h - 1 / 3);
  }
  return [r, g, b];
}

applyBtn.addEventListener('click', applyFilters);
