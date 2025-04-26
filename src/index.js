import OBR from "@owlbear-rodeo/sdk";

const FILTER_STATE = {
  hue: 0,
  saturation: 100,
  brightness: 100,
};

function createEffect(targetId) {
  const effectItem = {
    id: `effect-${Date.now()}`,
    type: "EFFECT",
    visible: true,
    locked: true,
    zIndex: 100000,
    transform: {
      width: 1,
      height: 1,
    },
    effect: {
      url: `${window.location.origin}/effect.js`,
      data: {
        hue: FILTER_STATE.hue,
        saturation: FILTER_STATE.saturation,
        brightness: FILTER_STATE.brightness,
      },
    },
    attachedTo: {
      id: targetId,
      type: "ATTACHMENT",
    },
  };

  OBR.scene.items.addItems([effectItem]).catch((error) => {
    console.error("Effect létrehozás hiba:", error);
  });
}

function setupUI(targetId) {
  const sliders = ["hue", "saturation", "brightness"];
  sliders.forEach((key) => {
    const el = document.getElementById(key);
    el.addEventListener("input", () => {
      FILTER_STATE[key] = Number(el.value);
      createEffect(targetId); // Minden változásnál új effekt (tesztelésre)
    });
  });
}

OBR.onReady(async () => {
  const context = await OBR.popover.getContext();
  if (!context?.anchorElementId) {
    console.warn("Nem popoverből lett megnyitva – kilépés.");
    return;
  }

  setupUI(context.anchorElementId);
});
