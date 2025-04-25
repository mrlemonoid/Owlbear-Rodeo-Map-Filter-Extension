import OBR from "@owlbear-rodeo/sdk";

const FILTER_STATE = {
  hue: 0,
  saturation: 100,
  brightness: 100,
  gamma: 100,
  chroma: 0,
};

const noSelectionMsg = document.getElementById("no-selection-msg");

function applyFilters(itemId) {
  const { hue, saturation, brightness, gamma, chroma } = FILTER_STATE;
  OBR.scene.items.updateItems([itemId], (items) => {
    for (const item of items) {
      item.metadata = {
        ...item.metadata,
        "map-filter-extension": {
          hue,
          saturation,
          brightness,
          gamma,
          chroma,
        },
      };
    }
  });
}

function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

const debouncedApplyFilters = debounce((itemId) => {
  applyFilters(itemId);
}, 200);

function setupSliders(itemId) {
  const sliders = ["hue", "saturation", "brightness", "gamma", "chroma"];
  sliders.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", () => {
        FILTER_STATE[id] = Number(el.value);
        debouncedApplyFilters(itemId);
      });
    }
  });
}

OBR.onReady(async () => {
  console.log("OBR ready");

  // 🎯 Csak akkor próbáljuk használni, ha tényleg popoverből fut
  if (OBR.popover?.getContext) {
    try {
      const context = await OBR.popover.getContext();

      if (!context?.anchorElementId) {
        console.warn("Nem popoverből nyitották meg vagy nincs kijelölt elem.");
        return;
      }

      const items = await OBR.scene.items.getItems();
      const selected = items.find(item => item.id === context.anchorElementId);

      if (selected) {
        noSelectionMsg.style.display = "none";
        setupSliders(selected.id);
      } else {
        console.warn("A kiválasztott item nem található.");
        noSelectionMsg.style.display = "block";
      }

    } catch (e) {
      console.warn("Nem popover környezetben fut: ", e);
    }
  }

  // 🔧 Context menü regisztrálása globálisan, ez mindig lefuthat
  OBR.contextMenu.create({
    id: "map-filter.apply-filter",
    icons: [
      {
        icon: "/icon.svg",
        label: "Térkép szűrő",
      },
    ],
    onClick(context) {
      const selected = context.items.find((item) =>
        item.type === "IMAGE"
      );

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
