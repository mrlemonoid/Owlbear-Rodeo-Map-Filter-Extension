import OBR from "@owlbear-rodeo/sdk";

const FILTER_STATE = {
  hue: 0,
  saturation: 100,
  brightness: 100,
  gamma: 100,
  chroma: 0,
};

let effectId = null;

const noSelectionMsg = document.getElementById("no-selection-msg");

function createOrUpdateEffect(targetItem) {
  if (!targetItem) return;

  const effectData = {
    hue: FILTER_STATE.hue,
    saturation: FILTER_STATE.saturation,
    brightness: FILTER_STATE.brightness,
    gamma: FILTER_STATE.gamma,
    chroma: FILTER_STATE.chroma,
  };

  if (effectId) {
    OBR.scene.items.updateItems([effectId], (items) => {
      for (const item of items) {
        if (item.type === "EFFECT") {
          item.effect.data = effectData;
        }
      }
    });
  } else {
    effectId = `effect-${Date.now()}`;
    OBR.scene.items.addItems([{
      id: effectId,
      type: "EFFECT",
      name: "Map Filter Effect",
      visible: true,
      locked: true,
      transform: { width: targetItem.transform.width, height: targetItem.transform.height },
      zIndex: targetItem.zIndex + 1,
      attachedTo: targetItem.id,
      effect: {
        url: "/effect.js",
        data: effectData
      }
    }]);
  }
}

function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

const debouncedApply = debounce((item) => {
  createOrUpdateEffect(item);
}, 200);

function setupSliders(targetItem) {
  const sliders = ["hue", "saturation", "brightness", "gamma", "chroma"];
  sliders.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", () => {
        FILTER_STATE[id] = Number(el.value);
        debouncedApply(targetItem);
      });
    }
  });
}

OBR.onReady(async () => {
  console.log("OBR ready");

  let anchorId = null;
  try {
    const context = await OBR.popover.getContext?.();
    anchorId = context?.anchorElementId;
  } catch (e) {
    console.warn("Popover context not available.");
  }

  try {
    const items = await OBR.scene.items.getItems();
    console.log("Összes scene item:", items);

    const selected = items.find((item) =>
      anchorId ? item.id === anchorId : (item.type === "IMAGE" && item.layer === "MAP")
    );

    if (selected) {
      noSelectionMsg.style.display = "none";
      setupSliders(selected);
      createOrUpdateEffect(selected);
    } else {
      noSelectionMsg.style.display = "block";
    }
  } catch (e) {
    console.error("Hiba a getItems() közben:", e);
    noSelectionMsg.style.display = "block";
  }
});
