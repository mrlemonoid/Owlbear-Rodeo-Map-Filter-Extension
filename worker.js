self.onmessage = function(e) {
  const { data, width, height, params } = e.data;
  const pixels = new Uint8ClampedArray(data);
  
  const chroma = hexToRgb(params.chroma);
  
  for (let i = 0; i < pixels.length; i += 4) {
    let r = pixels[i];
    let g = pixels[i+1];
    let b = pixels[i+2];
    
    // Apply hue/saturation
    let [h, s, l] = rgbToHsl(r, g, b);
    h = (h * 360 + params.hue) % 360 / 360;
    s *= params.saturation;
    [r, g, b] = hslToRgb(h, s, l);
    
    // Apply gamma
    r = 255 * Math.pow(r/255, 1/params.gamma);
    g = 255 * Math.pow(g/255, 1/params.gamma);
    b = 255 * Math.pow(b/255, 1/params.gamma);
    
    // Chroma key
    if (colorDistance(r, g, b, chroma.r, chroma.g, chroma.b) < params.threshold) {
      pixels[i+3] = 0;
    }
    
    pixels[i] = r;
    pixels[i+1] = g;
    pixels[i+2] = b;
  }
  
  self.postMessage({ processed: pixels.buffer }, [pixels.buffer]);
};

// Helper functions (same as your original implementations)
function hexToRgb(hex) { /* ... */ }
function colorDistance(r1,g1,b1,r2,g2,b2) { /* ... */ }
function rgbToHsl(r,g,b) { /* ... */ }
function hslToRgb(h,s,l) { /* ... */ }