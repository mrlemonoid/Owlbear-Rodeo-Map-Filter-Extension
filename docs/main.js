
// Owlbear Rodeo Image Filter Extension - main.js

const hueSlider = document.getElementById('hue');
const saturationSlider = document.getElementById('saturation');
const brightnessSlider = document.getElementById('brightness');
const gammaSlider = document.getElementById('gamma');
const chromaSlider = document.getElementById('chroma');
const controlsDiv = document.getElementById('controls');
const noSelectionMsg = document.getElementById('no-selection-msg');

let currentTargetId = null;
let currentEffectId = null;

const filterShader = `
uniform shader scene;
uniform mat3 modelView;
uniform float hue;
uniform float saturation;
uniform float brightness;
uniform float gamma;
uniform vec3 keyColor;
uniform float keyThreshold;

half4 main(float2 coord) {
    vec2 uv = (vec3(coord, 1) * modelView).xy;
    half4 baseColor = scene.eval(uv);
    half3 col = baseColor.rgb;
    half alpha = baseColor.a;

    half alphaFactor = 1.0;
    if (keyThreshold > 0.0) {
      float dist = distance(col, keyColor);
      float soft = keyThreshold * 0.2;
      alphaFactor = 1.0 - smoothstep(max(0.0, keyThreshold - soft), keyThreshold + soft, dist);
    }

    col *= brightness;
    col = pow(col, vec3(1.0 / max(0.001, gamma)));
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(lum), col, saturation);
    float angle = 3.1415926 * hue / 180.0;
    float cosA = cos(angle);
    float sinA = sin(angle);
    vec3 k = normalize(vec3(1.0, 1.0, 1.0));
    col = col * cosA + cross(k, col) * sinA + k * dot(k, col) * (1.0 - cosA);

    return half4(col * alphaFactor, alpha * alphaFactor);
}
`;

async function ensureEffectFor(itemId) {
  const existingEffects = await OBR.scene.local.getItems((item) =>
    item.type === 'EFFECT' && item.attachedTo === itemId && item.layer === 'POST_PROCESS'
  );
  let effect;
  if (existingEffects.length > 0) {
    effect = existingEffects[0];
  } else {
    effect = {
      attachedTo: itemId,
      layer: 'POST_PROCESS',
      effectType: 'ATTACHMENT',
      sksl: filterShader,
      uniforms: [
        { name: 'hue', value: 0.0 },
        { name: 'saturation', value: 1.0 },
        { name: 'brightness', value: 1.0 },
        { name: 'gamma', value: 1.0 },
        { name: 'keyColor', value: { x: 0.0, y: 1.0, z: 0.0 } },
        { name: 'keyThreshold', value: 0.0 }
      ],
      locked: true,
      disableHit: true,
      type: 'EFFECT'
    };
    await OBR.scene.local.addItems([effect]);
    const added = await OBR.scene.local.getItems((item) =>
      item.type === 'EFFECT' && item.attachedTo === itemId && item.layer === 'POST_PROCESS'
    );
    if (added.length > 0) {
      effect = added[0];
    }
  }
  currentTargetId = itemId;
  currentEffectId = effect.id;
}

async function checkSelection() {
  const selection = await OBR.player.getSelection();
  if (!selection || selection.length === 0) {
    currentTargetId = null;
    noSelectionMsg.style.display = 'block';
    controlsDiv.style.display = 'none';
    return;
  }

  const items = await OBR.scene.items.getItems(selection);
  const item = items[0];
  if (item.type !== 'IMAGE' || item.layer !== 'MAP') {
    currentTargetId = null;
    currentEffectId = null;
    noSelectionMsg.textContent = 'A kijelölt elem nem "Map" típusú kép. Válassz ki egy térképet.';
    noSelectionMsg.style.display = 'block';
    controlsDiv.style.display = 'none';
    return;
  }

  if (item.id === currentTargetId && currentEffectId) {
    return;
  }

  await ensureEffectFor(item.id);
  noSelectionMsg.style.display = 'none';
  controlsDiv.style.display = 'block';
}

async function updateUniforms() {
  if (!currentEffectId) return;

  const hueVal = parseFloat(hueSlider.value);
  const saturationVal = parseFloat(saturationSlider.value) / 100.0;
  const brightnessVal = parseFloat(brightnessSlider.value) / 100.0;
  const gammaVal = parseFloat(gammaSlider.value) / 100.0;
  const chromaVal = parseFloat(chromaSlider.value) / 100.0;

  await OBR.scene.local.updateItems(
    (item) => item.id === currentEffectId,
    (items) => {
      const effect = items[0];
      for (let u of effect.uniforms) {
        switch (u.name) {
          case 'hue':
            u.value = hueVal;
            break;
          case 'saturation':
            u.value = saturationVal;
            break;
          case 'brightness':
            u.value = brightnessVal;
            break;
          case 'gamma':
            u.value = gammaVal;
            break;
          case 'keyThreshold':
            u.value = chromaVal;
            break;
        }
      }
    }
  );
}

hueSlider.addEventListener('input', updateUniforms);
saturationSlider.addEventListener('input', updateUniforms);
brightnessSlider.addEventListener('input', updateUniforms);
gammaSlider.addEventListener('input', updateUniforms);
chromaSlider.addEventListener('input', updateUniforms);

OBR.onReady(() => {
  checkSelection();
  setInterval(checkSelection, 1000);
});
