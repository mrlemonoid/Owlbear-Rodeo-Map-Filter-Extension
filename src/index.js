import OBR from "@owlbear-rodeo/sdk";

const FILTER_STATE = {
  hue: 0,
  saturation: 100,
  brightness: 100,
  gamma: 100,
  chroma: 0,
};

let effectId = null;

function createOrUpdateEffect(targetItem) {
  if (!targetItem || !targetItem.image || !targetItem.position) {
    console.warn("Nem megfelelő targetItem!", targetItem);
    return;
  }

  const effectData = {
    hue: FILTER_STATE.hue,
    saturation: FILTER_STATE.saturation,
    brightness: FILTER_STATE.brightness,
    gamma: FILTER_STATE.gamma,
    chroma: FILTER_STATE.chroma,
  };

  const effectUrl = "https://map-filter-extension.vercel.app/effect.js";

  if (effectId) {
    // Ha már létezik az effekt, frissítjük
    OBR.scene.items.updateItems([effectId], (items) => {
      for (const item of items) {
        if (item.type === "EFFECT") {
          item.effect.data = effectData;
        }
      }
    });
  } else {
    // Új effekt létrehozása
    effectId = `effect-${Date.now()}`;
    OBR.scene.items.addItems([
      {
        id: effectId,
        type: "EFFECT",
        name: "Map Filter Effect",
        visible: true,
        locked: true,
        transform: {
          width: targetItem.image.width,
          height: targetItem.image.height,
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
        },
        scale: {
          x: 1,
          y: 1,
        },
        position: {
          x: targetItem.position.x,
          y: targetItem.position.y,
        },
        zIndex: targetItem.zIndex + 1,
        attachedTo: targetItem.id,
        effect: {
          url: effectUrl,
          data: effectData,
        },
      }
    ]);
  }
}

function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

const debouncedApplyFilters = debounce((targetItem) => {
  createOrUpdateEffect(targetItem);
}, 200);

function setupSliders(targetItem) {
  const sliders = ["hue", "saturation", "brightness", "gamma", "chroma"];
  sliders.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", () => {
        FILTER_STATE[id] = Number(el.value);
        debouncedApplyFilters(targetItem);
      });
    }
  });
}

OBR.onReady(async () => {
  console.log("OBR ready");

  let anchorId = null;
  try {
    const context = await OBR.popover.getContext();
    anchorId = context?.anchorElementId;
  } catch (e) {
    console.warn("Popover context nem elérhető. Csak context menüből működik.");
  }

  try {
    const items = await OBR.scene.items.getItems();
    console.log("Összes scene item:", items);

    const selected = items.find((item) => {
      if (anchorId) {
        return item.id === anchorId;
      }
      return item.type === "IMAGE";
    });

    if (selected) {
      document.getElementById("no-selection-msg").style.display = "none";
      setupSliders(selected);
      createOrUpdateEffect(selected);
    } else {
      console.warn("Nincs kiválasztott megfelelő térkép.");
      document.getElementById("no-selection-msg").style.display = "block";
    }
  } catch (e) {
    console.error("Hiba a scene itemek lekérésénél:", e);
    document.getElementById("no-selection-msg").style.display = "block";
  }

  // Context menü beállítása
  OBR.contextMenu.create({
    id: "map-filter.apply-filter",
    icons: [
      {
        icon: "/icon.svg",
        label: "Térkép szűrő",
      },
    ],
    onClick(context) {
      const selected = context.items.find((item) => item.type === "IMAGE");

      if (selected) {
        OBR.popover.open({
          id: "map-filter-ui",
          url: "/index.html",
          height: 400,
          width: 300,
          anchorElementId: selected.id,
        });
      }
    },
    filter: {
      every: [
        { key: "type", value: "IMAGE" },
      ],
    },
  });
});
