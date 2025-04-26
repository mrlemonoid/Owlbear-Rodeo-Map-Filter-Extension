export function onEffect(frame, data) {
  const ctx = frame.context;
  const imageData = ctx.getImageData(0, 0, frame.width, frame.height);
  const pixels = imageData.data;

  const hue = (data?.hue ?? 0) / 360;
  const saturation = (data?.saturation ?? 100) / 100;
  const brightness = (data?.brightness ?? 100) / 100;

  for (let i = 0; i < pixels.length; i += 4) {
    let r = pixels[i];
    let g = pixels[i + 1];
    let b = pixels[i + 2];

    // RGB -> HSL
    let [h, s, l] = rgbToHsl(r, g, b);

    h = (h + hue) % 1;
    s = clamp(s * saturation, 0, 1);
    l = clamp(l * brightness, 0, 1);

    // HSL -> RGB
    [r, g, b] = hslToRgb(h, s, l);

    pixels[i] = r;
    pixels[i + 1] = g;
    pixels[i + 2] = b;
  }

  ctx.putImageData(imageData, 0, 0);
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
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
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - t) * 6 * (2/3 - t);
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [r * 255, g * 255, b * 255];
}

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}
