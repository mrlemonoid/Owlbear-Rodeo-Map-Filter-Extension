import OBR from "@owlbear-rodeo/sdk";

const FILTER_STATE = {
  hue: 0,
  saturation: 100,
  brightness: 100,
  gamma: 100,
  chroma: 0,
};

const noSelectionMsg = document.getElementById("no-selection-msg");

function applyFilters(item) {
  if (!item || !item.id) return;

  const { hue, saturation, brightness, gamma, chroma } = FILTER_STATE;

  OBR.scene.items.updateItems([{
    id: item.id,
    metadata: {
      "map-filter-extension": {
        hue,
        saturation,
        brightness,
        gamma,
        chroma,
      },
    },
  }]).catch(e => {
    console.error("Nem sikerült frissíteni az itemet:", e);
  });
}

function setupSliders(item) {
  const sliders = ["hue", "saturation", "brightness", "gamma", "chroma"];
  sliders.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", () => {
        FILTER_STATE[id] = Number(el.value);
        applyFilters(item);
      });
    }
  });
}

OBR.onReady(async () => {
  console.log("OBR ready");

  try {
    const items = await OBR.scene.items.getItems();
    console.log("Összes scene item:", items);

    if (mapItem) {
      console.log("Kiválasztott map:", mapItem);
      noSelectionMsg.style.display = "none";
      setupSliders(mapItem);
    } else {
      console.warn("Nincs megfelelő Map típusú item");
      noSelectionMsg.style.display = "block";
    }
  } catch (e) {
    console.error("Hiba a getItems() közben:", e);
    noSelectionMsg.style.display = "block";
  }
});
