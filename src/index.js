import OBR from "@owlbear-rodeo/sdk";

const FILTER_STATE = {
  hue: 0,
  saturation: 100,
  brightness: 100,
  gamma: 100,
  chroma: 0,
};

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
        "map-filter-extension": { hue, saturation, brightness, gamma, chroma },
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

  try {
    const context = await OBR.popover.getContext();
    if (!context?.anchorElementId) {
      console.warn("Nem popoverből lett megnyitva – kilépés.");
      return;
    }

    const items = await OBR.scene.items.getItems();
    console.log("Összes scene item:", items);

    const selected = items.find(
      (item) => item.id === context.anchorElementId && item.type === "IMAGE"
    );

    if (selected) {
      document.getElementById("no-selection-msg").style.display = "none";
      setupSliders(selected.id);
    } else {
      document.getElementById("no-selection-msg").style.display = "block";
      console.warn("A kiválasztott item nem IMAGE típusú.");
    }
  } catch (e) {
    console.error("Hiba a getItems() közben:", e);
    document.getElementById("no-selection-msg").style.display = "block";
  }
});
