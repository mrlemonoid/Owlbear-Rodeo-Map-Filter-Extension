import OBR from "https://unpkg.com/@owlbear-rodeo/sdk@1.4.3"

const filters = {
  hue: 0,
  saturation: 1,
  brightness: 1,
  gamma: 1,
  colorKey: "#00ff00"
};

function getFilterString() {
  return `hue-rotate(${filters.hue}deg) saturate(${filters.saturation}) brightness(${filters.brightness})`;
}

function updateMapFilters() {
  OBR.scene.items.getItems().then(items => {
    for (const item of items) {
      if (item.type === "IMAGE" && item.layer === "MAP") {
        OBR.scene.items.updateItems([{
          id: item.id,
          metadata: {
            "map-filter": {
              filter: getFilterString()
            }
          }
        }]);
      }
    }
  });
}

["hue", "saturation", "brightness", "gamma"].forEach(id => {
  document.getElementById(id).addEventListener("input", e => {
    filters[id] = parseFloat(e.target.value);
    updateMapFilters();
  });
});

document.getElementById("colorKey").addEventListener("input", e => {
  filters.colorKey = e.target.value;
  // Chroma key logika később kerül beépítésre
});

OBR.onReady(() => {
  console.log("Map Filter extension ready.");
  updateMapFilters();
});