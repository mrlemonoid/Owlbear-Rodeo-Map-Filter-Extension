// main.js
import OBR from "@owlbear-rodeo/sdk";

const FILTER_STATE = {
  hue: 0,
  saturation: 100,
  brightness: 100,
  gamma: 100,
  chroma: 0,
};

const noSelectionMsg = document.getElementById("no-selection-msg");

function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

const debouncedApplyFilters = debounce((itemId) => {
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

  // 1. Context gomb regisztrálás minden IMAGE típusú elemre
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
      every: [{ key: "type", value: "IMAGE" }],
    },
  });

  // 2. Ha Popoverként nyitották meg, setup sliders
  const context = await OBR.popover.getContext();
  if (!context?.anchorElementId) {
    console.warn("Nem popoverből nyitották meg.");
    return;
  }

  try {
    const items = await OBR.scene.items.getItems();
    const selected = items.find(
      (item) => item.id === context.anchorElementId && item.type === "IMAGE"
    );

    if (selected) {
      noSelectionMsg.style.display = "none";
      setupSliders(selected.id);
    } else {
      noSelectionMsg.style.display = "block";
    }
  } catch (e) {
    console.error("Hiba a getItems() közben:", e);
    noSelectionMsg.style.display = "block";
  }
});
