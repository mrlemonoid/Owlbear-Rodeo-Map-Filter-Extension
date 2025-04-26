import OBR from "@owlbear-rodeo/sdk";

const FILTER_STATE = {
  hue: 0,
  saturation: 100,
  brightness: 100,
};

let activeEffectId = null;
let targetItemId = null;

async function createOrUpdateEffect() {
  if (!targetItemId) return;

  // Ha van régi effekt, töröljük
  if (activeEffectId) {
    await OBR.scene.items.deleteItems([activeEffectId]);
  }

  // Új effekt létrehozása
  activeEffectId = `map-filter-effect-${Date.now()}`;

  await OBR.scene.items.addItems([
    {
      id: activeEffectId,
      type: "EFFECT",
      name: "Map Filter Effect",
      visible: true,
      locked: true,
      transform: { width: 1, height: 1 },
      zIndex: 100,
      effect: {
        url: "/effect.js",
        targetId: targetItemId,
        data: {
          hue: FILTER_STATE.hue,
          saturation: FILTER_STATE.saturation,
          brightness: FILTER_STATE.brightness,
        },
      },
    },
  ]);
}

function setupSliders() {
  ["hue", "saturation", "brightness"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", async () => {
        FILTER_STATE[id] = Number(el.value);
        await createOrUpdateEffect();
      });
    }
  });
}

OBR.onReady(async () => {
  const context = await OBR.popover.getContext();
  if (!context || !context.anchorElementId) {
    document.getElementById("no-selection-msg").style.display = "block";
    console.warn("Nincs kiválasztva térkép.");
    return;
  }

  targetItemId = context.anchorElementId;

  document.getElementById("no-selection-msg").style.display = "none";
  setupSliders();
  await createOrUpdateEffect();
});
