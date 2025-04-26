import OBR from "@owlbear-rodeo/sdk";

const FILTER_STATE = {
  hue: 0,
  saturation: 100,
  brightness: 100,
  gamma: 100,
  chroma: 0,
};

function createOrUpdateEffect(targetItem) {
  const effectId = `map-filter-effect-${targetItem.id}`;
  const effectData = {
    hue: FILTER_STATE.hue,
    saturation: FILTER_STATE.saturation,
    brightness: FILTER_STATE.brightness,
    gamma: FILTER_STATE.gamma,
    chroma: FILTER_STATE.chroma,
  };

  OBR.scene.items.getItems().then((items) => {
    const existing = items.find((i) => i.id === effectId);

    if (existing) {
      OBR.scene.items.updateItems([effectId], (items) => {
        for (const item of items) {
          if (item.type === "EFFECT") {
            item.effect.data = effectData;
          }
        }
      });
    } else {
      if (
        targetItem.image &&
        typeof targetItem.image.width === "number" &&
        typeof targetItem.image.height === "number" &&
        typeof targetItem.zIndex === "number" &&
        targetItem.position
      ) {
        OBR.scene.items.addItems([
          {
            id: effectId,
            type: "EFFECT",
            attachedTo: targetItem.id,
            visible: true,
            locked: true,
            name: "Map Filter Effect",
            zIndex: targetItem.zIndex + 1,
            transform: {
              width: targetItem.image.width,
              height: targetItem.image.height,
            },
            position: {
              x: targetItem.position.x,
              y: targetItem.position.y,
            },
            effect: {
              url: "/effect.js",
              data: effectData,
            },
          },
        ]);
      } else {
        console.warn("Nem megfelelő targetItem az effekt létrehozásához:", targetItem);
      }
    }
  });
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const debouncedEffectUpdate = debounce(createOrUpdateEffect, 100);

function setupSliders(targetItem) {
  const sliders = ["hue", "saturation", "brightness", "gamma", "chroma"];
  sliders.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", () => {
        FILTER_STATE[id] = Number(el.value);
        debouncedEffectUpdate(targetItem);
      });
    }
  });
}

OBR.onReady(async () => {
  console.log("OBR ready");

  try {
    const items = await OBR.scene.items.getItems();
    console.log("Összes scene item:", items);

    const selected = items.find((item) => item.type === "IMAGE" && item.layer === "MAP");

    if (selected) {
      document.getElementById("no-selection-msg").style.display = "none";
      setupSliders(selected);
      createOrUpdateEffect(selected);
    } else {
      document.getElementById("no-selection-msg").style.display = "block";
    }
  } catch (e) {
    console.error("Hiba a getItems() közben:", e);
    document.getElementById("no-selection-msg").style.display = "block";
  }

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
