import OBR from "@owlbear-rodeo/sdk";

const FILTER_NAMESPACE = "map-filter-extension";

const FILTER_DEFAULTS = {
  hue: 0,
  saturation: 100,
  brightness: 100,
  gamma: 100,
  chroma: 0,
};

function applyCSSVariables({ hue, saturation, brightness, gamma, chroma }) {
  document.body.style.setProperty("--filter-hue", hue);
  document.body.style.setProperty("--filter-saturation", `${saturation}%`);
  document.body.style.setProperty("--filter-brightness", `${brightness}%`);
  document.body.style.setProperty("--filter-gamma", gamma / 100);
  document.body.style.setProperty("--filter-chroma", chroma / 100);
}

function updateFromMetadata(metadata) {
  const filterData = metadata?.[FILTER_NAMESPACE] || FILTER_DEFAULTS;
  applyCSSVariables(filterData);

  const sliders = ["hue", "saturation", "brightness", "gamma", "chroma"];
  for (const key of sliders) {
    const el = document.getElementById(key);
    if (el) el.value = filterData[key] ?? FILTER_DEFAULTS[key];
  }
}

function setupSliders(itemId) {
  const sliders = ["hue", "saturation", "brightness", "gamma", "chroma"];
  for (const key of sliders) {
    const el = document.getElementById(key);
    if (!el) continue;
    el.addEventListener("input", () => {
      const newValue = Number(el.value);
      OBR.scene.items.updateItems([itemId], (items) => {
        for (const item of items) {
          const current = item.metadata?.[FILTER_NAMESPACE] || FILTER_DEFAULTS;
          item.metadata[FILTER_NAMESPACE] = {
            ...current,
            [key]: newValue,
          };
        }
      });
    });
  }
}

OBR.onReady(async () => {
  console.log("[Owlbear Map Filter] Extension loaded");

  try {
    const ctx = await OBR.popover.getWindowContext();
    if (!ctx || !ctx.anchorElementId) {
      console.warn("Popover was not opened from a map image, exiting.");
      return;
    }

    const items = await OBR.scene.items.getItems();
    const selected = items.find((item) => item.id === ctx.anchorElementId);

    if (!selected) {
      console.warn("No matching image item found for context.");
      return;
    }

    updateFromMetadata(selected.metadata);
    setupSliders(selected.id);

    // Listen for changes
    OBR.scene.items.onChange(async (items) => {
      const updated = items.find((item) => item.id === selected.id);
      if (updated) updateFromMetadata(updated.metadata);
    });
  } catch (e) {
    console.error("Hiba a getWindowContext() vagy getItems() közben:", e);
  }
});
