export function onEffect(frame, data) {
  const ctx = frame.context;
  const width = frame.width;
  const height = frame.height;

  // Képadatok kiolvasása
  const imageData = ctx.getImageData(0, 0, width, height);
  const pixels = imageData.data;

  // Alapértelmezett értékek
  const hueShift = data.hue || 0;
  const saturation = (data.saturation || 100) / 100;
  const brightness = (data.brightness || 100) / 100;

  for (let i = 0; i < pixels.length; i += 4) {
    let r = pixels[i];
    let g = pixels[i + 1];
    let b = pixels[i + 2];

    // RGB -> HSL konvertálás
    let [h, s, l] = rgbToHsl(r, g, b);

    // Színmódosítás
    h = (h + hueShift / 360) % 1;
    s = Math.min(Math.max(s * saturation, 0), 1);
    l = Math.min(Math.max(l * brightness, 0), 1);

    // Vissza HSL -> RGB
    [r, g, b] = hslToRgb(h, s, l);

    pixels[i] = r;
    pixels[i + 1] = g;
    pixels[i + 2] = b;
  }

  // Módosított képadatok visszaírása
  ctx.putImageData(imageData, 0, 0);
}

// Segédfüggvény: RGB -> HSL
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // szürke
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, l];
}

// Segédfüggvény: HSL -> RGB
function hslToRgb(h, s, l) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // szürke
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
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
}
