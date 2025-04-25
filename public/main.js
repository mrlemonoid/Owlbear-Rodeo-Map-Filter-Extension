import OBR from "@owlbear-rodeo/sdk";

const FILTER_STATE = {
  hue: 0,
  saturation: 100,
  brightness: 100,
};

let effectId = null;

const noSelectionMsg = document.getElementById("no-selection-msg");

function createEffect() {
  effectId = `map-filter-effect-${Math.floor(Math.random() * 1000000)}`;

  OBR.scene.items.addItems([
    {
      id: effectId,
      type: "EFFECT",
      name: "Map Filter Effect",
      visible: true,
      locked: true,
      transform: { width: 1, height: 1 },
      zIndex: 100,
      effect: {
        url: "/effect.js",
        data: {
          hue: FILTER_STATE.hue,
          saturation: FILTER_STATE.saturation,
          brightness: FILTER_STATE.brightness,
        },
      },
    },
  ]);
}

function updateEffect() {
  if (!effectId) return;

  OBR.scene.items.updateItems([effectId], (items) => {
    for (const item of items) {
      if (item.type === "EFFECT") {
        item.effect.data = {
          hue: FILTER_STATE.hue,
          saturation: FILTER_STATE.saturation,
          brightness: FILTER_STATE.brightness,
        };
      }
    }
  });
}

function setupSliders() {
  const sliders = ["hue", "saturation", "brightness"];
  sliders.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", () => {
        FILTER_STATE[id] = Number(el.value);
        updateEffect();
      });
    }
  });
}

OBR.onReady(async () => {
  console.log("OBR ready");

  noSelectionMsg.style.display = "none";
  setupSliders();
  createEffect();

  // Context menü gomb újra aktiválása
  OBR.contextMenu.create({
    id: "map-filter.apply-filter",
    icons: [
      {
        icon: "/icon.svg",
        label: "Térkép szűrő",
      },
    ],
    onClick(context) {
      const selected = context.items.find(
        (item) => item.type === "IMAGE" && item.layer === "MAP"
      );

      if (selected) {
        OBR.popover.open({
          id: `map-filter-ui-${selected.id}`,
          url: "/index.html",
          height: 400,
          width: 300,
          anchorElementId: selected.id,
        });
      }
    },
    filter: {
      every: [
        { key: "layer", value: "MAP" },
        { key: "type", value: "IMAGE" },
      ],
    },
  });
});
