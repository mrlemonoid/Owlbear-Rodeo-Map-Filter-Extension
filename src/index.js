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

  // Get context only if the popover was opened with anchor
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

    const selected = items.find((item) => {
      if (anchorId) return item.id === anchorId;
      return item.type === "IMAGE" && item.layer === "MAP";
    });

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
